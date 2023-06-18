import { Box, Typography, TextField, Button } from '@mui/material';

export default function Login({
  apiKey,
}: {
  apiKey: React.MutableRefObject<string>;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const input = formatInput(String(data.get('apiKey')));
    apiKey.current = input;
    console.log(apiKey.current);
  };

  return (
    <div style={{ position: 'relative', display: 'inline', fontSize: '15px' }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h5'>
          Chat-GPT Explorer
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            fullWidth
            defaultValue={apiKey.current}
            id='apiKey'
            label='OpenAI API Key'
            name='apiKey'
            autoFocus
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Ok!
          </Button>
        </Box>
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
