import { Dispatch, SetStateAction, useContext, useState } from "react";
import PreviewUIContainer from "./PreviewUIContainer";
import { sendTx } from "./CustomTxUI";
import { Address, Hex } from "viem";
import { AlchemyProviderContext } from "@/context/AlchemyProviderProvider";
import { SignerContext } from "@/context/SelectedSignerProvider";
import toast, { useToasterStore } from "react-hot-toast";

export default function MintTokenUI({
    setUserOpHash,
}: {
    setUserOpHash: Dispatch<SetStateAction<string>>;
}) {
    const { provider } = useContext(AlchemyProviderContext);
    const { isLoggedIn } = useContext(SignerContext);

    const [sendingTx, setSendingTx] = useState(false);

    async function mintToken() {
        setSendingTx(true);
        if (provider) {
            let data =
                "0x6a6278420000000000000000000000000f06d15f909d9473a2d09fefa99e5ae7c7a962c4" as Hex;
            let target =
                "0x54571Bee711bf03269f65D379fDE3ff078d6F786" as Address;
            toast.promise(
                sendTx(provider, target, data).then((result) => {
                    if (result) {
                        setUserOpHash(result.hash);
                    }
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
                    Mint Account Kit Tokens using Smart Account
                </h3>
                <img src="/logos/kit-logo.svg" className="h-32 w-32" />
            </div>
            <div className="">
                {isLoggedIn ? (
                    <button
                        onClick={mintToken}
                        disabled={sendingTx}
                        className="flex w-full disabled:cursor-not-allowed disabled:bg-brand2Disabled justify-center rounded-md bg-brand2 px-3 py-3 text-md font-semibold leading-6 text-white shadow-sm hover:bg-brand2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand2"
                    >
                        Mint
                    </button>
                ) : null}
            </div>
        </PreviewUIContainer>
    );
}
