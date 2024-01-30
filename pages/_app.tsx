import AlchemyProviderProvider from "@/context/AlchemyProviderProvider";
import ConfigurationProvider from "@/context/ConfigurationProvider";
import SelectedSignerProvider from "@/context/SelectedSignerProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ConfigurationProvider>
            <AlchemyProviderProvider>
                <SelectedSignerProvider>
                    <Component {...pageProps} />
                    <Toaster position="top-center" />
                </SelectedSignerProvider>
            </AlchemyProviderProvider>
        </ConfigurationProvider>
    );
}
