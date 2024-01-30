import Configuration from "@/components/Configuration";
import Preview from "@/components/Preview";
import { ConfigurationContext } from "@/context/ConfigurationProvider";
import { useContext } from "react";

export default function Home() {
    const { isAllConfigurationAvailable } = useContext(ConfigurationContext);

    return (
        <main className="m-auto bg-brand-gradient h-screen flex items-center justify-center">
            <div className="w-[1280px] bg-white h-[85%] drop-shadow-lg rounded-md overflow-hidden">
                <div className="grid grid-cols-3 w-full h-full">
                    <Configuration />
                    <Preview
                        isAllConfigurationAvailable={
                            isAllConfigurationAvailable
                        }
                    />
                </div>
            </div>
        </main>
    );
}
