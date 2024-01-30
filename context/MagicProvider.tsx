import useMagicSigner from "@/hooks/useMagicSigner";
import { AlchemyProviderContext } from "./AlchemyProviderProvider";
import { ReactNode, useContext, useEffect } from "react";
import { ConfigurationContext } from "./ConfigurationProvider";
import { SignerContext } from "./SelectedSignerProvider";

export default function MagicProvider({ children }: { children: ReactNode }) {
    const { provider, connectSignerToProvider, disconnectSignerFromProvider } =
        useContext(AlchemyProviderContext);

    const { setIsSignerConfigurationAvailable } =
        useContext(ConfigurationContext);

    const magicSigner = useMagicSigner({
        provider,
        connectSignerToProvider,
        disconnectSignerFromProvider,
    });

    useEffect(() => {
        if (magicSigner) {
            if (magicSigner.signer && magicSigner.apiKey)
                setIsSignerConfigurationAvailable(true);
            else setIsSignerConfigurationAvailable(false);
        } else {
            setIsSignerConfigurationAvailable(false);
        }
    }, [magicSigner]);

    return (
        <SignerContext.Provider
            value={{
                signer: magicSigner?.signer,
                apiKey: magicSigner?.apiKey,
                login: magicSigner?.login,
                logout: magicSigner?.logout,
                isLoggedIn: magicSigner?.isLoggedIn,
                scaAddress: magicSigner?.scaAddress,
                username: magicSigner?.username,
                setApiKey: magicSigner?.setApiKey,
            }}
        >
            {children}
        </SignerContext.Provider>
    );
}
