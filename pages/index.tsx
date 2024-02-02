import Configuration from "@/components/Configuration";
import Preview from "@/components/Preview";
import Link from "next/link";

export default function Home() {
    return (
        <main className="m-auto bg-brand-gradient h-screen flex flex-col space-y-4 items-center justify-center">
            <div className="w-[1280px] bg-white h-[85%] drop-shadow-lg rounded-md overflow-hidden">
                <div className="grid grid-cols-3 w-full h-full">
                    <Configuration />
                    <Preview />
                </div>
            </div>
            <div className="flex flex-col text-center text-[#1B1B1F] space-x-2">
                <div className="flex space-x-2">
                    <h2 className="text-md">
                        Built by{" "}
                        <Link
                            href="https://github.com/therealharpaljadeja?tab=repositories"
                            target="_blank"
                        >
                            <strong className="underline">
                                Harpalsinh Jadeja
                            </strong>
                        </Link>
                    </h2>
                </div>
                <div className="flex">
                    <h2 className="">
                        Powered by{" "}
                        <Link
                            href="https://accountkit.alchemy.com/"
                            target="_blank"
                        >
                            <strong className="underline">Account Kit</strong>
                        </Link>
                    </h2>
                </div>
            </div>
        </main>
    );
}
