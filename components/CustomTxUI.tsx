import { Dispatch, SetStateAction, useContext, useState } from "react";
import PreviewUIContainer from "./ui/PreviewUIContainer";
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { Address, Hex } from "viem";
import { AlchemyProviderContext } from "@/context/AlchemyProviderProvider";
import { SignerContext } from "@/context/SelectedSignerProvider";
import toast from "react-hot-toast";
import CustomInput from "./ui/CustomInput";
import CustomInputGroup from "./ui/CustomInputGroup";
import Label from "./ui/Label";

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

    const [sendingTx, setSendingTx] = useState(false);

    async function handleSend() {
        if (provider)
            if (target && data) {
                setSendingTx(true);
                toast.promise(
                    sendTx(provider, target, data).then((result) => {
                        if (result) setUserOpHash(result.hash);
                    }),
                    {
                        loading: "Sending UserOperation",
                        success: () => {
                            setSendingTx(false);
                            return "UserOperation Sent!";
                        },
                        error: (error) => {
                            console.log(error);
                            setSendingTx(false);
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
                <CustomInputGroup>
                    <Label htmlFor="to-address">To</Label>
                    <CustomInput
                        name="to-address"
                        id="to-address"
                        autoComplete="address"
                        placeholder="0x..."
                        disabled={sendingTx || !isLoggedIn}
                        onChange={({ target }) =>
                            setTarget(target.value as Address)
                        }
                    />
                </CustomInputGroup>
                <CustomInputGroup>
                    <Label htmlFor="data">Data</Label>
                    <CustomInput
                        name="data"
                        id="data"
                        autoComplete="address"
                        placeholder="0x..."
                        disabled={sendingTx || !isLoggedIn}
                        onChange={({ target }) =>
                            setData(target.value as Address)
                        }
                    />
                </CustomInputGroup>
                <div className="">
                    {isLoggedIn ? (
                        <button
                            onClick={handleSend}
                            disabled={sendingTx}
                            className="flex w-full justify-center rounded-md bg-brand2 disabled:bg-brand2Disabled disabled:cursor-not-allowed px-3 py-3 text-md font-semibold leading-6 text-white shadow-sm hover:bg-brand2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand2"
                        >
                            Send
                        </button>
                    ) : null}
                </div>
            </div>
        </PreviewUIContainer>
    );
}
