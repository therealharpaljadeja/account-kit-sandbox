import PaymasterConfiguration from "./PaymasterConfiguration";
import AlchemyProviderConfiguration from "./AlchemyProviderConfiguration";
import SignerConfiguration from "./SignerConfiguration";
import { useContext } from "react";
import { AlchemyProviderContext } from "@/context/AlchemyProviderProvider";
import PaymasterSwitch from "./PaymasterSwitch";

export default function Configuration() {
    const { isPaymasterRequired } = useContext(AlchemyProviderContext);

    return (
        <div className="w-full h-full col-span-2 p-6 border-r-2 border-gray-200 flex space-y-4 flex-col">
            <div className="flex items-center justify-between">
                <h1 className="text-black font-semibold text-xl">
                    Account Kit Sandbox
                </h1>
                <div className="flex space-x-2">
                    <h4 className="text-black font-semibold">Paymaster</h4>
                    <PaymasterSwitch />
                </div>
            </div>
            <AlchemyProviderConfiguration />
            <SignerConfiguration />
            {isPaymasterRequired && <PaymasterConfiguration />}
        </div>
    );
}
