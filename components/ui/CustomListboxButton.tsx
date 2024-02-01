import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";

export default function CustomListboxButton({
    listboxButtonProps,
}: {
    listboxButtonProps: ListboxButton;
}) {
    return (
        <Listbox.Button className="relative cursor-default text-black rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-brand2 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-brand2 sm:text-sm">
            <span className="text-md flex items-center space-x-2">
                <img
                    className="h-3 w-3"
                    src={`/logos/${listboxButtonProps.image}`}
                />
                <h4 className="text-md">{listboxButtonProps.name}</h4>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                    className="h-5 w-5 text-black"
                    aria-hidden="true"
                />
            </span>
        </Listbox.Button>
    );
}
