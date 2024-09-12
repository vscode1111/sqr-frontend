import {
  BooleanInput,
  DateTimeInput,
  Edit,
  NumberInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import { contractTypeChoices } from "~constants";
import { FContractDTO } from "~types";

export function LaunchpadEdit() {
  return (
    <Edit mutationMode="optimistic">
      <SimpleForm>
        <TextInput label="Id" source={FContractDTO("id")} disabled />
        <TextInput label="Address" source={FContractDTO("address")} disabled />
        <SelectInput
          source={FContractDTO("type")}
          choices={contractTypeChoices}
          validate={required()}
        />
        <TextInput label="name" source={FContractDTO("name")} />
        <NumberInput
          label="Sync block number"
          source={FContractDTO("syncBlockNumber")}
        />
        <NumberInput
          label="Process block number"
          source={FContractDTO("processBlockNumber")}
        />
        <BooleanInput label="Disable" source={FContractDTO("disable")} />
        <DateTimeInput
          label="Created"
          source={FContractDTO("createdAt")}
          disabled
        />
        <DateTimeInput
          label="Updated"
          source={FContractDTO("updatedAt")}
          disabled
        />
      </SimpleForm>
    </Edit>
  );
}
