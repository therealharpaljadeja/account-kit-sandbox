import ChainDropdown from "./ChainDropdown";
import Container from "./ui/Container";
import ContainerTitle from "./ui/ContainerTitle";
import RPCURLInput from "./RPCURLInput";

export default function AlchemyProviderConfiguration() {
    return (
        <Container>
            <ContainerTitle>Alchemy Provider</ContainerTitle>
            <div className="flex w-full space-x-2">
                <RPCURLInput />
                <ChainDropdown />
            </div>
        </Container>
    );
}
