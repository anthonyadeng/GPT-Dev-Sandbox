import { createContext, useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
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
import { defaultModels, modelsResponseType } from './utils/defaultModels';
import { ReactQueryDevtools } from 'react-query/devtools';
import Hyperparameters from './Components/Hyperparameters';

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
    // change useRef values into a React context to pass down to children
    createContext({
        apiKey: '',
        organization: '',
        modelsList: defaultModels,
    });

    const apiKey = useRef('');
    const organization = useRef('');
    const modelsList = useRef(defaultModels as modelsResponseType);
    const [update, setUpdate] = useState(false);

    useEffect(() => {}, [update]);
    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={darkTheme}>
                    <div className="App">
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <>
                                <Login apiKey={apiKey} organization={organization} setUpdate={setUpdate} modelsList={modelsList} />
                                <Models modelsList={modelsList} organization={organization} apiKey={apiKey} />
                                <Hyperparameters />
                                {apiKey.current} APIKey
                                <br />
                                {organization.current} org
                                <br />
                                <br />
                                <header className="App-header">
                                    <img src="Octocat.png" className="App-logo" alt="logo" />
                                    <p>
                                        GPT-Explore <span className="heart">♥️</span> !
                                    </p>
                                    <p className="small">
                                        Get <code>listModels</code> and select to start.
                                    </p>
                                    <p>
                                        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                                            !
                                        </a>
                                    </p>
                                </header>
                            </>
                        </Box>
                    </div>
                </ThemeProvider>
                {process.env.NODE_ENV !== 'production' && <ReactQueryDevtools initialIsOpen={true} />}
            </QueryClientProvider>
        </trpc.Provider>
    );
}
