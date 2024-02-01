import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import CustomListboxButton from "./ui/CustomListboxButton";
import CustomListboxOption from "./ui/CustomListboxOption";

const chains = [
    { name: "Sepolia", image: "sepolia.svg", disabled: false },
    { name: "More coming soon", image: "", disabled: true },
];

export default function ChainDropdown() {
    const [chain, setChain] = useState<{
        name: string;
        image: string;
    }>(chains[0]);

    return (
        <div className="w-full">
            <label
                htmlFor="rpc-url"
                className="block text-sm font-semibold leading-6 text-gray-900"
            >
                Chain
            </label>
            <div className="mt-2.5">
                <Listbox value={chain} onChange={setChain}>
                    <div className="w-72 relative">
                        <CustomListboxButton listboxButtonProps={chain} />
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-md shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                {chains.map((chain, index) => (
                                    <CustomListboxOption
                                        listboxOption={chain}
                                        key={index}
                                        disabled={chain.disabled}
                                    />
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </div>
        </div>
    );
}
