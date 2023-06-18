import { useRef, useState } from 'react';
import './App.css';
import Login from './Components/Login';
import Models from './Components/Models';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/react-query';
import { trpc } from './utils/trpc';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
export default function App() {
  const queryClient = new QueryClient();
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3001',
        }),
      ],
    })
  );

  const apiKey = useRef('');
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={darkTheme}>
          <div className='App'>
            <Login apiKey={apiKey} />
            <Models />
            {apiKey.current} APIKey
            <header className='App-header'>
              <img src='Octocat.png' className='App-logo' alt='logo' />
              <p>
                ChatGPT-Explore <span className='heart'>♥️</span> !
              </p>
              <p className='small'>
                Get <code>listModels()</code> and select to start.
              </p>
              <p>
                <a
                  className='App-link'
                  href='https://reactjs.org'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  !
                </a>
              </p>
            </header>
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
