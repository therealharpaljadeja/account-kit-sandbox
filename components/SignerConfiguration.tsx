import Container from "./ui/Container";
import ContainerTitle from "./ui/ContainerTitle";
import SelectedSignerConfiguration from "./SelectedSignerConfiguration";
import SignerDropdown from "./SignerDropdown";

export default function SignerConfiguration() {
    return (
        <Container>
            <ContainerTitle>Signer</ContainerTitle>
            <SignerDropdown />
            <Container>
                <SelectedSignerConfiguration />
            </Container>
        </Container>
    );
}
