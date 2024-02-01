import { Listbox } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/16/solid";

export default function CustomListboxOption({
    listboxOption,
    disabled,
}: {
    listboxOption: ListboxOption;
    disabled?: boolean;
}) {
    return (
        <Listbox.Option
            key={0}
            className={({ active }) =>
                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active
                        ? "bg-brand2-100 text-brand2"
                        : disabled
                        ? "bg-gray-100 text-gray-900 cursor-not-allowed"
                        : "text-gray-900"
                }`
            }
            value={listboxOption}
            disabled={disabled}
        >
            {({ selected }) => (
                <>
                    <span className="text-md flex items-center space-x-2">
                        {listboxOption.image ? (
                            <img
                                className="h-3 w-3"
                                src={`/logos/${listboxOption.image}`}
                            />
                        ) : null}
                        <h4 className="text-md">{listboxOption.name}</h4>
                    </span>
                    {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-brand2">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                    ) : null}
                </>
            )}
        </Listbox.Option>
    );
}
