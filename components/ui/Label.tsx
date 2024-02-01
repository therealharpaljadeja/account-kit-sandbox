import { DetailedHTMLProps, LabelHTMLAttributes } from "react";

export default function Label(
    props: DetailedHTMLProps<
        LabelHTMLAttributes<HTMLLabelElement>,
        HTMLLabelElement
    >
) {
    return (
        <label
            className="block text-sm font-semibold leading-6 text-white"
            {...props}
        >
            {props.children}
        </label>
    );
}
