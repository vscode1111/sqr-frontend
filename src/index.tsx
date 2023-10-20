import { App } from './App';
import { StoreContext } from './hooks';
import { stores } from './stores';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StoreContext.Provider value={stores}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreContext.Provider>,
);
