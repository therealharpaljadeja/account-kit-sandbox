import { AlchemyProviderContext } from "@/context/AlchemyProviderProvider";
import { Switch } from "@headlessui/react";
import { useContext } from "react";

export default function PaymasterSwitch() {
    const { isPaymasterRequired, setIsPaymasterRequired } = useContext(
        AlchemyProviderContext
    );

    return (
        <Switch
            checked={isPaymasterRequired}
            onChange={setIsPaymasterRequired}
            className={`relative inline-flex ui-disabled:bg-gray-300 ui-checked:bg-green-500 ui-not-checked:bg-red-500 h-6 w-11 items-center rounded-full`}
        >
            <span className="sr-only">Enable notifications</span>
            <span
                className={`${
                    isPaymasterRequired ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
        </Switch>
    );
}
