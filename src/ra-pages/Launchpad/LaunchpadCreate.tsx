import {
  BooleanInput,
  Create,
  NumberInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import { contractTypeChoices } from "~constants";
import { FContractDTO } from "~types";

export function LaunchpadCreate() {
  return (
    <Create>
      <SimpleForm>
        <TextInput
          label="Address"
          source={FContractDTO("address")}
          validate={required()}
        />
        <SelectInput
          source={FContractDTO("type")}
          choices={contractTypeChoices}
          validate={required()}
        />
        <TextInput label="name" source={FContractDTO("name")} />
        <NumberInput
          label="Sync block number"
          source={FContractDTO("syncBlockNumber")}
          validate={required()}
        />
        <NumberInput
          label="Process block number"
          source={FContractDTO("processBlockNumber")}
          validate={required()}
        />
        <BooleanInput label="Disable" source={FContractDTO("disable")} />
      </SimpleForm>
    </Create>
  );
}
