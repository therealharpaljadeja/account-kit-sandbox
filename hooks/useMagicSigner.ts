"use client";

import { LightSmartContractAccount } from "@alchemy/aa-accounts";
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { SmartAccountSigner } from "@alchemy/aa-core";
import { MagicSigner } from "@alchemy/aa-signers/magic";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Address, HttpTransport } from "viem";

export type SignerHookProps = {
    provider: AlchemyProvider | undefined;
    connectSignerToProvider:
        | ((signer: SmartAccountSigner<any>) =>
              | (AlchemyProvider & {
                    account: LightSmartContractAccount<HttpTransport>;
                })
              | undefined)
        | undefined;
    disconnectSignerFromProvider:
        | (() =>
              | (AlchemyProvider & {
                    account: undefined;
                })
              | undefined)
        | undefined;
};

export default function useMagicSigner({
    provider,
    connectSignerToProvider,
    disconnectSignerFromProvider,
}: SignerHookProps) {
    const [signer, setSigner] = useState<MagicSigner>();
    const [apiKey, setApiKey] = useState<string>("");
    const [ownerAddress, setOwnerAddress] = useState<Address>();
    const [scaAddress, setScaAddress] = useState<Address>();
    const [username, setUsername] = useState<string>();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    if (typeof window === "undefined") {
        return null;
    }

    useEffect(() => {
        if (apiKey) {
            const signer = new MagicSigner({ apiKey });
            setSigner(signer);
        }
    }, [apiKey]);

    useEffect(() => {
        async function setInitialState() {
            if (signer) {
                // MagicSigner authenticate needs to be called here again so that the private variable signer gets intialized
                const { inner: magic } = signer;
                toast.promise(
                    magic.user.isLoggedIn().then(async (isLoggedIn) => {
                        if (!isLoggedIn) return;

                        await signer.authenticate({
                            authenticate: async () => {
                                await signer.inner.wallet.connectWithUI();
                            },
                        });

                        const metadata = await magic.user.getInfo();
                        if (!metadata.publicAddress || !metadata.email) {
                            throw new Error("Magic Login failed");
                        }

                        if (provider) {
                            if (connectSignerToProvider) {
                                connectSignerToProvider(signer);
                                setScaAddress(await provider.getAddress());
                                setIsLoggedIn(isLoggedIn);
                                setUsername(metadata.email);
                                setOwnerAddress(
                                    metadata.publicAddress as Address
                                );
                            }
                        }
                    }),
                    {
                        loading: "Checking if already logged in...",
                        error: "Something went wrong",
                        success: "Done checking...",
                    }
                );
            }
        }

        setInitialState();
    }, [provider, signer]);

    const login = useCallback(async () => {
        if (signer) {
            try {
                await signer.authenticate({
                    authenticate: async () => {
                        await signer.inner.wallet.connectWithUI();
                    },
                });
            } catch (error) {
                console.log(error);
                return;
            }

            const { inner: magic } = signer;

            const metadata = await magic.user.getInfo();
            if (!metadata.publicAddress || !metadata.email) {
                throw new Error("Magic login failed");
            }

            if (provider) {
                if (connectSignerToProvider) connectSignerToProvider(signer);

                setIsLoggedIn(true);
                setOwnerAddress(metadata.publicAddress as Address);
                setUsername(metadata.email);
                setScaAddress(await provider.getAddress());
            }
        }
    }, [provider, signer]);

    const logout = useCallback(async () => {
        if (signer) {
            const { inner: magic } = signer;
            if (!magic.user) {
                throw new Error("User is not signed in");
            }

            if (!(await magic.user.logout())) {
                throw new Error("Logout failed");
            }

            if (disconnectSignerFromProvider) disconnectSignerFromProvider();
            setIsLoggedIn(false);
            setUsername(undefined);
            setScaAddress(undefined);
            setOwnerAddress(undefined);
        }
    }, [provider, signer]);

    return {
        signer,
        apiKey,
        setApiKey,
        login,
        logout,
        ownerAddress,
        scaAddress,
        username,
        isLoggedIn,
    };
}
