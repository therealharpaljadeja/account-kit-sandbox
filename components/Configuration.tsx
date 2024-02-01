import PaymasterConfiguration from "./PaymasterConfiguration";
import AlchemyProviderConfiguration from "./AlchemyProviderConfiguration";
import SignerConfiguration from "./SignerConfiguration";
import { useContext } from "react";
import { Switch } from "@headlessui/react";
import { AlchemyProviderContext } from "@/context/AlchemyProviderProvider";

export default function Configuration() {
    const { isPaymasterRequired, setIsPaymasterRequired } = useContext(
        AlchemyProviderContext
    );

    return (
        <div className="w-full h-full col-span-2 p-6 border-r-2 border-gray-200 flex space-y-4 flex-col">
            <div className="flex items-center justify-between">
                <h1 className="text-black font-semibold text-xl">
                    Account Kit Sandbox
                </h1>
                <div className="flex space-x-2">
                    <h4 className="text-black font-semibold">Paymaster</h4>
                    <Switch
                        checked={isPaymasterRequired}
                        onChange={setIsPaymasterRequired}
                        className={`relative inline-flex ui-disabled:bg-gray-300 ui-checked:bg-green-500 ui-not-checked:bg-red-500 h-6 w-11 items-center rounded-full`}
                    >
                        <span className="sr-only">Enable notifications</span>
                        <span
                            className={`${
                                isPaymasterRequired
                                    ? "translate-x-6"
                                    : "translate-x-1"
                            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                        />
                    </Switch>
                </div>
            </div>
            <AlchemyProviderConfiguration />
            <SignerConfiguration />
            {isPaymasterRequired && <PaymasterConfiguration />}
        </div>
    );
}
