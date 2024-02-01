import { AlchemyProviderContext } from "@/context/AlchemyProviderProvider";
import { ChangeEvent, useContext } from "react";

export default function RPCURLInput() {
    const { setRpcUrl, rpcUrl } = useContext(AlchemyProviderContext);

    if (!setRpcUrl) return null;

    function handleRpcChange({ target }: ChangeEvent<HTMLInputElement>) {
        if (target) {
            setRpcUrl(target.value);
        }
    }

    return (
        <div className="w-full">
            <label
                htmlFor="rpc-url"
                className="block text-sm font-semibold leading-6 text-gray-900"
            >
                RPC URL{" "}
                <span>
                    <a
                        href="https://dashboard.alchemy.com/apps"
                        target="_blank"
                        className="font-light underline cursor-pointer"
                    >
                        (Get it here)
                    </a>
                </span>
            </label>
            <div className="mt-2.5">
                <input
                    type="text"
                    name="rpc-url"
                    id="rpc-url"
                    autoComplete="rpc-url"
                    value={rpcUrl}
                    className="block w-full rounded-md border-0 outline-none px-3.5 py-2 text-gray-900 shadow-sm!important ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand2  sm:text-sm sm:leading-6"
                    onChange={handleRpcChange}
                />
            </div>
        </div>
    );
}
