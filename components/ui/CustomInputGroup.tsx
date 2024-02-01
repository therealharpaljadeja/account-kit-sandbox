import { ReactNode } from "react";

export default function CustomInputGroup({
    children,
}: {
    children: ReactNode;
}) {
    return <div className="w-full space-y-2">{children}</div>;
}
