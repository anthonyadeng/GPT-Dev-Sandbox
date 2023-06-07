import { useState, Dispatch, SetStateAction } from 'react';

export default function Login({
  setAPIKey,
}: {
  setAPIKey: Dispatch<SetStateAction<string>>;
}) {
  const [input, setInput] = useState('');
  return (
    <div style={{ position: 'relative', display: 'inline', fontSize: '15px' }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setAPIKey(formatInput(input));
        }}
      >
        <input
          type='text'
          placeholder='OpenAI API Key'
          onChange={(e) => setInput(e.target.value)}
        />
        <button>OK</button>
      </form>
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
