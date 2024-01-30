import { useContext } from "react";
import MagicSignerConfiguration from "./MagicSignerConfiguration";
import { ConfigurationContext } from "@/context/ConfigurationProvider";
import RainbowKitSignerConfiguration from "./RainbowKitSignerConfiguration";

export default function SelectedSignerConfiguration() {
    const { signerType } = useContext(ConfigurationContext);

    switch (signerType.name) {
        case "Magic":
            return <MagicSignerConfiguration />;
        default:
            return <RainbowKitSignerConfiguration />;
    }
}
