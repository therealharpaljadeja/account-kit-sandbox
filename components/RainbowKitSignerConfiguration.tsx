import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function RainbowKitSignerConfiguration() {
    return (
        <div className="flex flex-col space-y-2">
            <h3 className="text-black text-sm">RainbowKit Signer</h3>
            <div className="w-full">
                <ConnectButton />
                <div className="mt-2.5"></div>
            </div>
        </div>
    );
}
