import { Box, Typography, TextField, Button } from '@mui/material';
import { defaultModelsType } from '../utils/defaultModels';
import { trpc } from '../utils/trpc';

interface LoginProps {
    apiKey: React.MutableRefObject<string>;
    organization: React.MutableRefObject<string>;
    setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    modelsList: React.MutableRefObject<defaultModelsType>;
}
export default function Login({ apiKey, organization, setUpdate, modelsList }: LoginProps) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const input = {
            apiKey: formatInput(String(data.get('apiKey'))),
            organization: formatInput(String(data.get('organization'))),
        };
        apiKey.current = input.apiKey;
        organization.current = input.organization;

        setUpdate((curr) => !curr);
    };

    return (
        <div style={{ position: 'relative', display: 'inline', fontSize: '15px' }}>
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField margin="normal" fullWidth defaultValue={apiKey.current} id="apiKey" label="OpenAI API Key" name="apiKey" autoFocus />
                <TextField
                    margin="normal"
                    fullWidth
                    defaultValue={organization.current}
                    id="organization"
                    label="OpenAI Organization"
                    name="organization"
                    autoFocus
                />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Ok!
                </Button>
            </Box>
        </div>
    );
}

function formatInput(str: string): string {
    // delete leading and trailing whitespace
    let index = 0;
    if (str[0] === ' ') {
        while (str[index] === ' ') {
            index++;
        }
        str = str.slice(index, str.length);
    }
    index = str.length - 1;
    if (str[index] === ' ') {
        while (str[index] === ' ') {
            index--;
        }
        str = str.slice(0, index + 1);
    }
    return str;
}
