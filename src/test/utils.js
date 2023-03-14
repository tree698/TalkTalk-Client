import { MemoryRouter, Routes } from 'react-router-dom';
import { ApiContext } from '../context/ApiContext';

export function withRouter(route, initialEntry = '/') {
  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>{route}</Routes>
    </MemoryRouter>
  );
}

export function withApiContext(children, context) {
  return <ApiContext.Provider value={context}>{children}</ApiContext.Provider>;
}
