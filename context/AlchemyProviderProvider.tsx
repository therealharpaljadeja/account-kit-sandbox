import useAlchemyProvider from "@/hooks/useAlchemyProvider";
import { LightSmartContractAccount } from "@alchemy/aa-accounts";
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { SmartAccountSigner } from "@alchemy/aa-core";
import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useEffect,
} from "react";
import { HttpTransport } from "viem";
import { ConfigurationContext } from "./ConfigurationProvider";

type AlchemyProviderContextValue = {
    provider?: AlchemyProvider;
    rpcUrl?: string;
    isPaymasterRequired: boolean;
    policyId?: string;
    setProvider: Dispatch<SetStateAction<AlchemyProvider | undefined>>;
    setRpcUrl: Dispatch<SetStateAction<string>>;
    setIsPaymasterRequired: Dispatch<SetStateAction<boolean>>;
    setPolicyId: Dispatch<SetStateAction<string>>;
    connectSignerToProvider?: (signer: SmartAccountSigner<any>) =>
        | (AlchemyProvider & {
              account: LightSmartContractAccount<HttpTransport>;
          })
        | undefined;
    disconnectSignerFromProvider?: () =>
        | (AlchemyProvider & {
              account: undefined;
          })
        | undefined;
};

const defaultUnset: any = undefined;

export const AlchemyProviderContext =
    createContext<AlchemyProviderContextValue>({
        provider: defaultUnset,
        rpcUrl: defaultUnset,
        isPaymasterRequired: false,
        policyId: defaultUnset,
        setProvider: defaultUnset,
        setRpcUrl: defaultUnset,
        setPolicyId: defaultUnset,
        setIsPaymasterRequired: defaultUnset,
        connectSignerToProvider: defaultUnset,
        disconnectSignerFromProvider: defaultUnset,
    });

export default function AlchemyProviderProvider({
    children,
}: {
    children: ReactNode;
}) {
    const {
        provider,
        rpcUrl,
        policyId,
        isPaymasterRequired,
        setProvider,
        setRpcUrl,
        setIsPaymasterRequired,
        setPolicyId,
        connectSignerToProvider,
        disconnectSignerFromProvider,
    } = useAlchemyProvider();

    const { setIsAlchemyProviderConfigurationAvailable } =
        useContext(ConfigurationContext);

    useEffect(() => {
        if (rpcUrl) {
            if (isPaymasterRequired) {
                if (policyId) setIsAlchemyProviderConfigurationAvailable(true);
                else setIsAlchemyProviderConfigurationAvailable(false);
            } else {
                setIsAlchemyProviderConfigurationAvailable(true);
            }
        } else setIsAlchemyProviderConfigurationAvailable(false);
    }, [rpcUrl, isPaymasterRequired, policyId]);

    return (
        <AlchemyProviderContext.Provider
            value={{
                provider,
                rpcUrl,
                isPaymasterRequired,
                policyId,
                setIsPaymasterRequired,
                setProvider,
                setPolicyId,
                setRpcUrl,
                connectSignerToProvider,
                disconnectSignerFromProvider,
            }}
        >
            {children}
        </AlchemyProviderContext.Provider>
    );
}
