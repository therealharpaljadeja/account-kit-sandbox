import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="shortcut icon" href="/logos/tx-logo.png" />
                <meta
                    property="og:image"
                    content="https://i.ibb.co/NC46Hsc/Screenshot-2024-02-03-at-12-16-44-AM.png"
                />
                <meta property="og:title" content="Account Kit Sandbox" />
                <meta
                    property="og:description"
                    content="A tool is to easily experience smart accounts built using Account Kit!"
                />
                <meta
                    property="og:url"
                    content="https://account-kit-sandbox.vercel.app/"
                />
                <title>Account Kit Sandbox</title>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
