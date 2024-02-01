import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useEffect,
    useState,
} from "react";

export const defaultUnset: any = undefined;

type Signer = {
    name: string;
    image: string;
    disabled?: boolean;
};

type ConfigurationContextValue = {
    isAllConfigurationAvailable: boolean;
    setIsAlchemyProviderConfigurationAvailable: Dispatch<
        SetStateAction<boolean>
    >;
    setIsSignerConfigurationAvailable: Dispatch<SetStateAction<boolean>>;
    signerType: Signer;
    setSignerType: Dispatch<SetStateAction<Signer>>;
};

export const SignerType = [
    { name: "Magic", image: "magic.svg" },
    { name: "Injected (using RainbowKit)", image: "rainbow.svg" },
    { name: "Web3Auth", image: "web3auth.svg", disabled: true },
];

export const ConfigurationContext = createContext<ConfigurationContextValue>({
    isAllConfigurationAvailable: false,
    setIsAlchemyProviderConfigurationAvailable: () => {},
    setIsSignerConfigurationAvailable: () => {},
    signerType: SignerType[0],
    setSignerType: defaultUnset,
});

export default function ConfigurationProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [isAllConfigurationAvailable, setIsAllConfigurationAvailable] =
        useState<boolean>(false);

    const [
        isAlchemyProviderConfigurationAvailable,
        setIsAlchemyProviderConfigurationAvailable,
    ] = useState<boolean>(false);

    const [isSignerConfigurationAvailable, setIsSignerConfigurationAvailable] =
        useState<boolean>(false);

    const [signerType, setSignerType] = useState<{
        name: string;
        image: string;
    }>(SignerType[0]);

    useEffect(() => {
        setIsAllConfigurationAvailable(
            isAlchemyProviderConfigurationAvailable &&
                isSignerConfigurationAvailable
        );
    }, [
        isAlchemyProviderConfigurationAvailable,
        isSignerConfigurationAvailable,
    ]);

    return (
        <ConfigurationContext.Provider
            value={{
                isAllConfigurationAvailable,
                setIsAlchemyProviderConfigurationAvailable,
                setIsSignerConfigurationAvailable,
                signerType,
                setSignerType,
            }}
        >
            {children}
        </ConfigurationContext.Provider>
    );
}
