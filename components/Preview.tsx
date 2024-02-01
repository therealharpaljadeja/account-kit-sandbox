import { useContext, useEffect, useState } from "react";
import MintTokenUI from "./MintTokenUI";
import UISwitcher from "./UISwitcher";
import CustomTxUI from "./CustomTxUI";
import SmartAccountDetailsUI from "./SmartAccountDetailsUI";
import Link from "next/link";
import { ConfigurationContext } from "@/context/ConfigurationProvider";

export default function Preview() {
    const [showCustomTxUI, setShowCustomTxUI] = useState(false);
    const [userOpHash, setUserOpHash] = useState("");

    const { isAllConfigurationAvailable } = useContext(ConfigurationContext);

    // Timeout to remove userOpHash from the UI
    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (userOpHash) {
            timeoutId = setTimeout(() => {
                setUserOpHash("");
            }, 6000);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [userOpHash]);

    return (
        <div className="w-full h-full flex items-center p-6 justify-center">
            {isAllConfigurationAvailable ? (
                <div className="flex w-full h-full flex-col space-y-4">
                    <div className="bg-[#1B1B1F] flex flex-col space-y-8 h-full w-full rounded-lg overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,.25)] p-4">
                        {showCustomTxUI ? (
                            <CustomTxUI setUserOpHash={setUserOpHash} />
                        ) : (
                            <MintTokenUI setUserOpHash={setUserOpHash} />
                        )}
                        {userOpHash && (
                            <Link
                                href={`https://jiffyscan.xyz/userOpHash/${userOpHash}?network=sepolia`}
                                target="_blank"
                                className="self-center"
                            >
                                <h3 className="underline text-white">
                                    View on JiffyScan
                                </h3>
                            </Link>
                        )}
                        <SmartAccountDetailsUI />
                    </div>
                    <UISwitcher
                        setShowCustomTxUI={setShowCustomTxUI}
                        showCustomTxUI={showCustomTxUI}
                    />
                </div>
            ) : (
                <div className="flex w-full items-center justify-center h-full">
                    <h2 className="text-black text-2xl">
                        Not Configured Properly!
                    </h2>
                </div>
            )}
        </div>
    );
}
