import { Switch } from "@headlessui/react";
import { Dispatch, SetStateAction, useState } from "react";

export default function UISwitcher({
    setShowCustomTxUI,
    showCustomTxUI,
}: {
    setShowCustomTxUI: Dispatch<SetStateAction<boolean>>;
    showCustomTxUI: boolean;
}) {
    return (
        <div className="flex justify-center space-x-2">
            <h4 className="text-black">Mint Token</h4>
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
            <h4 className="text-black">Custom Tx</h4>
        </div>
    );
}
