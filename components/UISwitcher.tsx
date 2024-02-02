import { Switch } from "@headlessui/react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export default function UISwitcher({
    setShowCustomTxUI,
    showCustomTxUI,
}: {
    setShowCustomTxUI: Dispatch<SetStateAction<boolean>>;
    showCustomTxUI: boolean;
}) {
    return (
        <div className="flex justify-center space-x-2">
            <div className="flex space-x-2 items-center">
                <Link
                    href="https://github.com/therealharpaljadeja/account-kit-sandbox/blob/main/components/MintTokenUI.tsx"
                    target="_blank"
                >
                    <h4 className="text-black underline">Mint Token</h4>
                </Link>
            </div>
            <Switch
                checked={showCustomTxUI}
                onChange={setShowCustomTxUI}
                className={`${
                    showCustomTxUI ? "bg-brand2" : "bg-brand1"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
            >
                <span className="sr-only">Enable notifications</span>
                <span
                    className={`${
                        showCustomTxUI ? "translate-x-6" : "translate-x-1"
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
            </Switch>
            <div className="flex items-center space-x-2">
                <Link
                    href="https://github.com/therealharpaljadeja/account-kit-sandbox/blob/main/components/CustomTxUI.tsx"
                    target="_blank"
                >
                    <h4 className="text-black underline">Custom Tx</h4>
                </Link>
            </div>
        </div>
    );
}
