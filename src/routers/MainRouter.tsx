import { Home } from '@/pages';
import { Route, Routes } from 'react-router-dom';

export function MainRouter() {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Home />} />
        {/* <Route path={`/${ROUTE.STAKE_ACCOUNTS}`} element={<StakeAccounts />} />
        <Route path={`/${ROUTE.VALIDATORS}`} element={<Validators />} /> */}
      </Route>
    </Routes>
  );
}
