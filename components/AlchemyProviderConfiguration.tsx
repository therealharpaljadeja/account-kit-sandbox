import ChainDropdown from "./ChainDropdown";
import Container from "./ui/Container";
import ContainerTitle from "./ui/ContainerTitle";
import RPCURLInput from "./RPCURLInput";
import Link from "next/link";

export default function AlchemyProviderConfiguration() {
    return (
        <Container>
            <div className="flex space-x-2 items-center">
                <ContainerTitle>Alchemy Provider</ContainerTitle>
                <Link
                    href="https://github.com/therealharpaljadeja/account-kit-sandbox/blob/main/hooks/useAlchemyProvider.ts"
                    target="_blank"
                >
                    <h3 className="text-black text-sm underline">
                        (Code Here)
                    </h3>
                </Link>
            </div>
            <div className="flex w-full space-x-2">
                <RPCURLInput />
                <ChainDropdown />
            </div>
        </Container>
    );
}
