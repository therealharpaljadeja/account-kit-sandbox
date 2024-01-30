import { ReactNode } from "react";

export default function PreviewUIContainer({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="flex h-full w-full flex-col justify-between space-y-8">
            {children}
        </div>
    );
}
