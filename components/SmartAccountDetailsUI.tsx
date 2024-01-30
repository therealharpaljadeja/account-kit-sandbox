import { SignerContext } from "@/context/SelectedSignerProvider";
import Link from "next/link";
import { useContext } from "react";

export default function SmartAccountDetailsUI() {
    const { isLoggedIn, scaAddress, username, logout, login } =
        useContext(SignerContext);

    if (!isLoggedIn)
        return (
            <button
                onClick={login}
                className="flex w-full justify-center rounded-md bg-brand2 px-3 py-3 text-md font-semibold leading-6 text-white shadow-sm hover:bg-brand2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand2"
            >
                Connect Wallet
            </button>
        );

    return (
        <div className="flex mt-auto flex-col space-y-2 items-center">
            {username && (
                <div className="bg-[#161618] border-[#333] border-2 w-full text-center text-white py-2 rounded-md">
                    <h4>{username}</h4>
                </div>
            )}
            <div className="flex w-full space-x-2">
                {scaAddress && (
                    <div className="bg-[#161618] border-[#333] border-2 text-center text-white w-full  px-2 py-2 rounded-md">
                        <Link
                            href={`https://sepolia.etherscan.io/address/${scaAddress}`}
                            className="underline"
                            target="_blank"
                        >
                            <h4>{`${scaAddress?.slice(
                                0,
                                10
                            )}...${scaAddress?.slice(-10)}`}</h4>
                        </Link>
                    </div>
                )}
                <div className="w-full">
                    <button
                        onClick={logout}
                        className="flex w-full justify-center rounded-md bg-brand2 px-3 py-2 text-md font-semibold leading-6 text-white shadow-sm hover:bg-brand2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand2"
                    >
                        Sign out
                    </button>
                </div>
            </div>
        </div>
    );
}
