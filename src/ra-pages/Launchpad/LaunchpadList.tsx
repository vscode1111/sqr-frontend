import {
  BooleanField,
  CreateButton,
  Datagrid,
  DateField,
  ExportButton,
  List,
  SortButton,
  TextField,
  TopToolbar,
} from "react-admin";
import { FContractDTO } from "~types";

function CompanyListActions() {
  return (
    <TopToolbar>
      <SortButton fields={[FContractDTO("id"), FContractDTO("createdAt")]} />
      <ExportButton />
      <CreateButton
        variant="contained"
        label="New Contract"
        sx={{ marginLeft: 2 }}
      />
    </TopToolbar>
  );
}

export function LaunchpadList() {
  return (
    <List actions={<CompanyListActions />}>
      <Datagrid rowClick="edit">
        <TextField label="Id" source={FContractDTO("id")} />
        <TextField label="Address" source={FContractDTO("address")} />
        <TextField label="Type" source={FContractDTO("type")} />
        <TextField label="name" source={FContractDTO("name")} />
        <TextField
          label="Sync block number"
          source={FContractDTO("syncBlockNumber")}
        />
        <TextField
          label="Process block number"
          source={FContractDTO("processBlockNumber")}
        />
        <BooleanField label="Disable" source={FContractDTO("disable")} />
        <DateField
          label="Created"
          source={FContractDTO("createdAt")}
          showTime
        />
        <DateField
          label="Updated"
          source={FContractDTO("updatedAt")}
          showTime
        />
      </Datagrid>
    </List>
  );
}
