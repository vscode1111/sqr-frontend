import { Admin, Resource } from 'react-admin';
import { Layout } from '~components';
import { LaunchpadCreate, LaunchpadEdit, LaunchpadList } from '~ra-pages';
import { daServer } from '~ra-services';

// import PostIcon from '@material-ui/icons/Book';

export function RaApp() {
  return (
    <Admin layout={Layout} dataProvider={daServer('http://localhost:3000/db')}>
      <Resource
        // name={ROUTE.LAUNCHPAD}
        name={'contracts'}
        // icon={PostIcon}
        list={LaunchpadList}
        edit={LaunchpadEdit}
        create={LaunchpadCreate}
      />
    </Admin>
  );
}
