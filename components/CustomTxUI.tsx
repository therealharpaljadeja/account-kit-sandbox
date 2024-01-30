import { Dispatch, SetStateAction, useContext, useState } from "react";
import PreviewUIContainer from "./PreviewUIContainer";
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { Address, Hex } from "viem";
import { AlchemyProviderContext } from "@/context/AlchemyProviderProvider";
import { SignerContext } from "@/context/SelectedSignerProvider";
import toast from "react-hot-toast";

export async function sendTx(
    provider: AlchemyProvider,
    target: Address,
    data: Hex
) {
    let tx = await provider.sendUserOperation({
        data,
        target,
    });
    return tx;
}

export default function CustomTxUI({
    setUserOpHash,
}: {
    setUserOpHash: Dispatch<SetStateAction<string>>;
}) {
    const { isLoggedIn } = useContext(SignerContext);
    const { provider } = useContext(AlchemyProviderContext);
    const [target, setTarget] = useState<Address>();
    const [data, setData] = useState<Hex>();

    async function handleSend() {
        if (provider)
            if (target && data) {
                toast.promise(
                    sendTx(provider, target, data).then((result) => {
                        if (result) setUserOpHash(result.hash);
                    }),
                    {
                        loading: "Sending UserOperation",
                        success: "UserOperation Sent!",
                        error: (error) => {
                            console.log(error);
                            return "Something went wrong, check console!";
                        },
                    }
                );
            }
    }

    return (
        <PreviewUIContainer>
            <div className="w-full flex flex-1 flex-col items-center space-y-4 justify-center">
                <h3 className="text-3xl text-center font-PlayFair whitespace-pre-wrap italic">
                    Send Any Transaction using Smart Account
                </h3>
                <img src="/logos/tx-logo.png" className="h-44 w-44" />
            </div>
            <div className="space-y-4">
                <div className="w-full space-y-2">
                    <label
                        htmlFor="to-address"
                        className="block text-sm font-semibold leading-6 text-white"
                    >
                        To
                    </label>
                    <div className="mt-2.5">
                        <input
                            className="block w-full rounded-md border-0 outline-none px-3.5 py-2 text-[#1b1b1f] shadow-sm ring-1 ring-inset ring-[#333] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#333] sm:text-sm sm:leading-6"
                            type="text"
                            name="to-address"
                            id="to-address"
                            autoComplete="address"
                            placeholder="0x..."
                            onChange={({ target }) =>
                                setTarget(target.value as Address)
                            }
                        />
                    </div>
                </div>
                <div className="w-full space-y-2">
                    <label
                        htmlFor="data"
                        className="block text-sm font-semibold leading-6 text-white"
                    >
                        Data
                    </label>
                    <div className="mt-2.5">
                        <input
                            className="block w-full rounded-md border-0 outline-none px-3.5 py-2 text-[#1b1b1f] shadow-sm ring-1 ring-inset ring-[#333] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#333] sm:text-sm sm:leading-6"
                            type="text"
                            name="data"
                            id="data"
                            autoComplete="address"
                            placeholder="0x..."
                            onChange={({ target }) =>
                                setData(target.value as Address)
                            }
                        />
                    </div>
                </div>
                <div className="">
                    {isLoggedIn ? (
                        <button
                            onClick={handleSend}
                            className="flex w-full justify-center rounded-md bg-brand2 px-3 py-3 text-md font-semibold leading-6 text-white shadow-sm hover:bg-brand2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand2"
                        >
                            Send
                        </button>
                    ) : null}
                </div>
            </div>
        </PreviewUIContainer>
    );
}
