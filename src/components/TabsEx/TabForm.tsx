import { useTabFormStyles } from './useTabFormStyles';
import { Tab, Tabs } from '@mui/material';
import { useMemo, useState } from 'react';
import { uid } from 'react-uid';
import { TabValue } from '~types';

interface TabsExProps {
  list: TabValue[];
}

export function TabForm({ list }: TabsExProps) {
  const { classes } = useTabFormStyles();

  const [tab, setTab] = useState(list[0].value);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const currentForm = useMemo(() => list.find((item) => item.value === tab)?.Form, [tab, list]);

  return (
    <div className={classes.root}>
      <Tabs className={classes.tabs} value={tab} onChange={handleTabChange}>
        {list.map(({ value: route, label }) => (
          <Tab key={uid(route)} label={label} value={route} />
        ))}
      </Tabs>
      <div className={classes.mainContaniner}>{currentForm?.()}</div>
    </div>
  );
}
