import { Control, Monitoring } from './components';
import { useClaimStyles } from './useClaimStyles';
import { Tab, Tabs } from '@mui/material';
import { observer } from 'mobx-react';
import { useMemo, useState } from 'react';
import { uid } from 'react-uid';
import { PageLayout } from '~components';
import { TabValue } from '~types';

const tabValueList: TabValue[] = [
  {
    label: 'Control',
    value: 'control',
    Form: () => <Control />,
  },
  {
    label: 'Monitoring',
    value: 'monitoring',
    Form: () => <Monitoring />,
  },
];

export const Claim = observer(() => {
  const { classes } = useClaimStyles();

  const [tab, setTab] = useState(tabValueList[0].value);
  const currentForm = useMemo(() => tabValueList.find((item) => item.value === tab)?.Form, [tab]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <PageLayout>
      <div className={classes.root}>
        <Tabs className={classes.tabs} value={tab} onChange={handleTabChange}>
          {tabValueList.map(({ value: route, label }) => (
            <Tab key={uid(route)} label={label} value={route} />
          ))}
        </Tabs>
        <div className={classes.mainContaniner}>{currentForm?.()}</div>
      </div>
    </PageLayout>
  );
});
