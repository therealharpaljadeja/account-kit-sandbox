import { SignerContext } from "@/context/SelectedSignerProvider";
import { ChangeEvent, useContext } from "react";

export default function MagicSignerConfiguration() {
    const { setApiKey, apiKey } = useContext(SignerContext);

    function handleMagicApiKeyChange({
        target,
    }: ChangeEvent<HTMLInputElement>) {
        if (setApiKey) {
            if (target.value) {
                setApiKey(target.value);
            } else {
                setApiKey("");
            }
        }
    }

    return (
        <div className="flex flex-col space-y-2">
            <h3 className="text-black text-sm">Magic Signer</h3>
            <div className="w-full">
                <label
                    htmlFor="magic-api-key"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                >
                    Magic API Key{" "}
                    <span>
                        <a
                            href="https://dashboard.magic.link/app"
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
                        name="magic-api-key"
                        id="magic-api-key"
                        onChange={handleMagicApiKeyChange}
                        value={apiKey}
                        className="block w-full rounded-md border-0 outline-none px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand2 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
        </div>
    );
}
