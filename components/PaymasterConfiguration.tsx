import { ChangeEvent, useContext } from "react";
import Container from "./ui/Container";
import ContainerTitle from "./ui/ContainerTitle";
import { AlchemyProviderContext } from "@/context/AlchemyProviderProvider";

export default function PaymasterConfiguration() {
    const { policyId, setPolicyId } = useContext(AlchemyProviderContext);

    function handlePaymasterConfigurationChange({
        target,
    }: ChangeEvent<HTMLInputElement>) {
        if (setPolicyId) {
            if (target.value) {
                setPolicyId(target.value);
            } else {
                setPolicyId("");
            }
        }
    }

    return (
        <Container>
            <ContainerTitle>Alchemy Paymaster</ContainerTitle>
            <div className="w-full">
                <label
                    htmlFor="paymaster-policy-id"
                    className="block text-sm font-semibold leading-6 text-gray-900"
                >
                    Policy ID{" "}
                    <span>
                        <a
                            href="https://dashboard.alchemy.com/gas-manager"
                            target="_blank"
                            className="font-light underline cursor-pointer"
                        >
                            (Get it here)
                        </a>
                    </span>
                </label>
                <div className="mt-2.5">
                    <input
                        type="text"
                        name="paymaster-policy-id"
                        id="paymaster-policy-id"
                        autoComplete="paymaster-policy-id"
                        onChange={handlePaymasterConfigurationChange}
                        value={policyId}
                        className="block w-full rounded-md border-0 outline-none px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brand2 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className="mt-2.5">
                    <span className="text-sm text-blue-600">
                        The Policy must use the same app whose rpc url is used
                        above
                    </span>
                </div>
            </div>
        </Container>
    );
}
