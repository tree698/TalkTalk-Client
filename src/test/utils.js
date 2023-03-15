import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

export function withQuery(children) {
  const testClient = createQueryClient();
  return (
    <QueryClientProvider client={testClient}>{children}</QueryClientProvider>
  );
}

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });
}
