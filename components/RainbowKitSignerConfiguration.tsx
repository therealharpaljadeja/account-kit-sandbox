import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export default function RainbowKitSignerConfiguration() {
    return (
        <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
                <h3 className="text-black text-sm">RainbowKit Signer</h3>
                <Link
                    href="https://github.com/therealharpaljadeja/account-kit-sandbox/blob/main/hooks/useWagmiSigner.ts"
                    target="_blank"
                >
                    <h3 className="underline text-black text-sm">
                        (Code Here)
                    </h3>
                </Link>
            </div>
            <div className="w-full">
                <ConnectButton />
            </div>
        </div>
    );
}
