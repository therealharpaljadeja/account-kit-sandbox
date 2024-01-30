import "@rainbow-me/rainbowkit/styles.css";

import {
    getDefaultWallets,
    RainbowKitProvider as RBProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, useAccount, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { ReactNode, useContext, useEffect } from "react";
import { AlchemyProviderContext } from "./AlchemyProviderProvider";
import { ConfigurationContext } from "./ConfigurationProvider";
import useWagmiSigner from "@/hooks/useWagmiSigner";
import { SignerContext } from "./SelectedSignerProvider";

const { chains, publicClient } = configureChains([sepolia], [publicProvider()]);

const { connectors } = getDefaultWallets({
    appName: "Account Kit Sandbox",
    chains,
    projectId: "baec492aebde55ada2a913855004e7bd",
});

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
});

export function WagmiProvider({ children }: { children: ReactNode }) {
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider>{children}</RainbowKitProvider>
        </WagmiConfig>
    );
}

export default function RainbowKitProvider({
    children,
}: {
    children: ReactNode;
}) {
    const { provider, connectSignerToProvider, disconnectSignerFromProvider } =
        useContext(AlchemyProviderContext);

    const { setIsSignerConfigurationAvailable } =
        useContext(ConfigurationContext);

    const { isConnected } = useAccount();

    const wagmiSigner = useWagmiSigner({
        provider,
        connectSignerToProvider,
        disconnectSignerFromProvider,
    });

    useEffect(() => {
        setIsSignerConfigurationAvailable(isConnected);
    }, [isConnected]);

    return (
        <RBProvider chains={chains}>
            <SignerContext.Provider
                value={{
                    signer: wagmiSigner.signer,
                    isLoggedIn: wagmiSigner.isLoggedIn,
                    login: wagmiSigner.login,
                    logout: wagmiSigner.login,
                    scaAddress: wagmiSigner.scaAddress,
                }}
            >
                {children}
            </SignerContext.Provider>
        </RBProvider>
    );
}
