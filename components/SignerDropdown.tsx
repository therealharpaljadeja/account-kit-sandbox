import {
    ConfigurationContext,
    SignerType,
} from "@/context/ConfigurationProvider";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import CustomListboxButton from "./ui/CustomListboxButton";
import CustomListboxOption from "./ui/CustomListboxOption";

export default function SignerDropdown() {
    const { signerType, setSignerType } = useContext(ConfigurationContext);

    return (
        <div>
            <Listbox value={signerType} onChange={setSignerType}>
                <div className="w-72 relative">
                    <CustomListboxButton listboxButtonProps={signerType} />

                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-md shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {SignerType.map((signer, index) => (
                                <CustomListboxOption
                                    listboxOption={signer}
                                    key={index}
                                    disabled={signer.disabled}
                                />
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}
