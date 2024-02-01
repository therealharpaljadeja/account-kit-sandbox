import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: (theme) => ({
                "brand-gradient":
                    "linear-gradient(to bottom right, #FF904A, #FE56B9)",
            }),
            colors: {
                brand1: "#FF904A",
                brand2: "#FE56B9",
                brand2Disabled: "#731c65",
                "brand2-100": "#ffbbe3",
            },
            fontFamily: {
                PlayFair: ["PlayFair Display"],
            },
        },
    },
    plugins: [require("@headlessui/tailwindcss")({ prefix: "ui" })],
};
export default config;
