import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
    return (
        <div className="border-2 border-gray-200 flex flex-col space-y-2 p-4 rounded-md">
            {children}
        </div>
    );
}
