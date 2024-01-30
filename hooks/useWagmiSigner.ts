import { useCallback, useEffect, useState } from "react";
import { SignerHookProps } from "./useMagicSigner";
import { Address, useAccount, useWalletClient } from "wagmi";
import { SmartAccountSigner, WalletClientSigner } from "@alchemy/aa-core";
import { WalletClient } from "viem";

export default function useWagmiSigner({
    provider,
    connectSignerToProvider,
    disconnectSignerFromProvider,
}: SignerHookProps) {
    const { data: walletClient } = useWalletClient();

    const { address: ownerAddress } = useAccount();
    const [signer, setSigner] = useState<SmartAccountSigner>();
    const [scaAddress, setScaAddress] = useState<Address>();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        if (walletClient) {
            setSigner(
                new WalletClientSigner(walletClient as WalletClient, "json-rpc")
            );
        }
    }, [walletClient]);

    useEffect(() => {
        async function setInitialState() {
            if (signer && provider) {
                if (connectSignerToProvider) {
                    connectSignerToProvider(signer);
                    setScaAddress(await provider.getAddress());
                    setIsLoggedIn(isLoggedIn);
                }
            }
        }

        setInitialState();
    }, [provider, signer]);

    const login = useCallback(async () => {
        if (signer) {
            if (provider) {
                if (connectSignerToProvider) connectSignerToProvider(signer);
                setIsLoggedIn(true);
                setScaAddress(await provider.getAddress());
            }
        }
    }, [provider, signer]);

    const logout = useCallback(async () => {
        if (signer) {
            if (disconnectSignerFromProvider) disconnectSignerFromProvider();
            setIsLoggedIn(false);
            setScaAddress(undefined);
        }
    }, [provider, signer]);

    return {
        signer,
        login,
        logout,
        ownerAddress,
        scaAddress,
        isLoggedIn,
    };
}
