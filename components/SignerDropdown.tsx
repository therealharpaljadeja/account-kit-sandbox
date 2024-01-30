import {
    ConfigurationContext,
    SignerType,
} from "@/context/ConfigurationProvider";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { Fragment, useContext } from "react";

export default function SignerDropdown() {
    const { signerType, setSignerType } = useContext(ConfigurationContext);

    return (
        <div>
            <Listbox value={signerType} onChange={setSignerType}>
                <div className="w-72 relative">
                    <Listbox.Button className="relative cursor-default text-black rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-brand2 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-brand2 sm:text-sm">
                        <span className="text-md flex items-center space-x-2">
                            <img
                                className="h-3 w-3"
                                src={`/logos/${signerType.image}`}
                            />
                            <h4 className="text-md">{signerType.name}</h4>
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
                        <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-md shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {SignerType.map((signer, index) => (
                                <Listbox.Option
                                    key={index}
                                    className={({ active, disabled }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            active
                                                ? "bg-brand2-100 text-brand2"
                                                : disabled
                                                ? "text-gray-900 bg-gray-100 cursor-not-allowed"
                                                : "text-gray-900"
                                        }`
                                    }
                                    value={signer}
                                    disabled={signer.disabled}
                                >
                                    {({ selected, disabled }) => (
                                        <>
                                            <span className="text-md flex items-center space-x-2">
                                                <img
                                                    className="h-3 w-3"
                                                    src={`/logos/${signer.image}`}
                                                />
                                                <h4 className="text-md">
                                                    {signer.name}
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
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}