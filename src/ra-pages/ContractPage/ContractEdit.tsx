import { observer } from 'mobx-react';
import {
  BooleanInput,
  DateTimeInput,
  Edit,
  NumberInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';
import { RowLayout } from '~components';
import { useSelectChoices } from '~hooks';
import { FContractDTO } from '~types';

export const ContractEdit = observer(() => {
  const { networksChoices, contractTypeChoices } = useSelectChoices();

  return (
    <Edit mutationMode='optimistic'>
      <SimpleForm>
        <RowLayout flexs={[1, 2]}>
          <SelectInput
            source={FContractDTO('networkId')}
            choices={networksChoices}
            validate={required()}
          />
          <TextInput label='Address' source={FContractDTO('address')} />
        </RowLayout>
        <RowLayout flexs={[1, 2]}>
          <SelectInput
            source={FContractDTO('type')}
            choices={contractTypeChoices}
            validate={required()}
          />
          <TextInput label='name' source={FContractDTO('name')} />
        </RowLayout>
        <RowLayout>
          <NumberInput
            label='Sync block number'
            source={FContractDTO('syncBlockNumber')}
            validate={required()}
          />
          <NumberInput
            label='Process block number'
            source={FContractDTO('processBlockNumber')}
            validate={required()}
          />
        </RowLayout>
        <BooleanInput label='Disable' source={FContractDTO('disable')} />
        <RowLayout>
          <DateTimeInput label='Created' source={FContractDTO('createdAt')} disabled />
          <DateTimeInput label='Updated' source={FContractDTO('updatedAt')} disabled />
        </RowLayout>
      </SimpleForm>
    </Edit>
  );
});
