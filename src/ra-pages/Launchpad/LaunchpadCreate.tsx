import { observer } from 'mobx-react';
import {
  BooleanInput,
  Create,
  NumberInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';
import { RowLayout } from '~components';
import { useSelectChoices } from '~hooks';
import { FContractDTO } from '~types';

export const LaunchpadCreate = observer(() => {
  const { networksChoices, contractTypeChoices } = useSelectChoices();

  return (
    <Create>
      <SimpleForm>
        <RowLayout flexs={[1, 2]}>
          <SelectInput
            source={FContractDTO('networkId')}
            choices={networksChoices}
            validate={required()}
          />
          <TextInput label='Address' source={FContractDTO('address')} validate={required()} />
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
      </SimpleForm>
    </Create>
  );
});
