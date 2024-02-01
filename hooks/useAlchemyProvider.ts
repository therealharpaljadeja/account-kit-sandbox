import {
    LightSmartContractAccount,
    getDefaultLightAccountFactoryAddress,
} from "@alchemy/aa-accounts";
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import {
    SmartAccountSigner,
    getDefaultEntryPointAddress,
} from "@alchemy/aa-core";
import { useCallback, useEffect, useState } from "react";

import { sepolia } from "viem/chains";

const chain = sepolia;

export default function useAlchemyProvider() {
    const [provider, setProvider] = useState<AlchemyProvider>();
    const [rpcUrl, setRpcUrl] = useState<string>("");
    const [isPaymasterRequired, setIsPaymasterRequired] =
        useState<boolean>(false);
    const [policyId, setPolicyId] = useState<string>("");

    const connectSignerToProvider = useCallback(
        (signer: SmartAccountSigner) => {
            if (provider) {
                try {
                    const connectedProvider = provider.connect((rpcClient) => {
                        return new LightSmartContractAccount({
                            rpcClient,
                            owner: signer,
                            factoryAddress:
                                getDefaultLightAccountFactoryAddress(chain),
                            entryPointAddress:
                                getDefaultEntryPointAddress(chain),
                            chain: rpcClient.chain,
                        });
                    });
                    setProvider(connectedProvider);
                    return connectedProvider;
                } catch (error) {
                    console.log(error);
                }
            }
        },
        [provider]
    );

    const disconnectSignerFromProvider = useCallback(() => {
        if (provider) {
            const disconnectedProvider = provider.disconnect();

            setProvider(disconnectedProvider);
            return disconnectedProvider;
        }
    }, [provider]);

    useEffect(() => {
        if (rpcUrl) {
            setProvider(
                new AlchemyProvider({
                    chain,
                    rpcUrl,
                })
            );
        } else {
            setProvider(undefined);
        }
    }, [rpcUrl]);

    useEffect(() => {
        if (isPaymasterRequired) {
            if (policyId) {
                if (provider) {
                    let providerWithGasManager = provider.withAlchemyGasManager(
                        {
                            policyId,
                        }
                    );
                    setProvider(providerWithGasManager);
                }
            }
        } else {
            if (provider) {
                console.log("Paymaster disconnected");

                // Disconnect paymaster from provider
                provider.withPaymasterMiddleware({
                    dummyPaymasterDataMiddleware: async (struct) => {
                        return { paymasterAndData: "0x" };
                    },
                    paymasterDataMiddleware: async (struct) => {
                        return { paymasterAndData: "0x" };
                    },
                });

                setProvider(provider);
            }
            setPolicyId("");
        }
    }, [isPaymasterRequired, policyId]);

    return {
        provider,
        rpcUrl,
        policyId,
        isPaymasterRequired,
        setProvider,
        setRpcUrl,
        setPolicyId,
        setIsPaymasterRequired,
        connectSignerToProvider,
        disconnectSignerFromProvider,
    };
}
