import { Dispatch, ReactNode, SetStateAction, useContext } from "react";
import { ConfigurationContext, defaultUnset } from "./ConfigurationProvider";
import MagicProvider from "./MagicProvider";
import { createContext } from "react";
import { Address } from "viem";
import { WagmiProvider } from "./WagmiProvider";
import { SmartAccountSigner } from "@alchemy/aa-core";

type SignerProviderValue = {
    signer?: SmartAccountSigner;
    apiKey?: string;
    login?: () => {};
    logout?: () => {};
    isLoggedIn?: boolean;
    scaAddress?: Address;
    username?: string;
    setApiKey?: Dispatch<SetStateAction<string>> | undefined;
};

export const SignerContext = createContext<SignerProviderValue>({
    signer: defaultUnset,
    setApiKey: defaultUnset,
    apiKey: defaultUnset,
    login: () => {
        return 0;
    },
    logout: () => {
        return 0;
    },
    isLoggedIn: false,
    scaAddress: "0x",
});

export default function SelectedSignerProvider({
    children,
}: {
    children: ReactNode;
}) {
    const { signerType } = useContext(ConfigurationContext);

    switch (signerType.name) {
        case "Magic":
            return <MagicProvider>{children}</MagicProvider>;
        default:
            return <WagmiProvider>{children}</WagmiProvider>;
    }
}
