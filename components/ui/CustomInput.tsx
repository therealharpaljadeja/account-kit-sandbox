import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export default function CustomInput(
    props: DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    >
) {
    return (
        <div className="mt-2.5">
            <input
                className="block w-full rounded-md border-0 outline-none px-3.5 py-2 disabled:opacity-75 text-[#1b1b1f] shadow-sm ring-1 ring-inset ring-[#333] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#333] sm:text-sm sm:leading-6 "
                type="text"
                {...props}
            />
        </div>
    );
}
