import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { Fragment, useState } from "react";

const chains = [{ name: "Sepolia", image: "sepolia.svg" }];

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
                        <Listbox.Button className="relative cursor-default text-black rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-brand2 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-brand2 sm:text-sm">
                            <span className="text-md flex items-center space-x-2">
                                <img
                                    className="h-3 w-3"
                                    src={`/logos/${chain.image}`}
                                />
                                <h4 className="text-md">{chain.name}</h4>
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-black"
                                    aria-hidden="true"
                                />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-md shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                <Listbox.Option
                                    key={0}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? "bg-brand2-100 text-brand2"
                                                : "text-gray-900"
                                        }`
                                    }
                                    value={chains[0]}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span className="text-md flex items-center space-x-2">
                                                <img
                                                    className="h-3 w-3"
                                                    src={`/logos/${chains[0].image}`}
                                                />
                                                <h4 className="text-md">
                                                    {chains[0].name}
                                                </h4>
                                            </span>
                                            {selected ? (
                                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand2">
                                                    <CheckIcon
                                                        className="h-5 w-5"
                                                        aria-hidden="true"
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>
            </div>
        </div>
    );
}
