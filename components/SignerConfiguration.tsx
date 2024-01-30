import Container from "./Container";
import ContainerTitle from "./ContainerTitle";
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
