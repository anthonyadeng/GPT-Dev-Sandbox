import { Autocomplete, TextField } from '@mui/material';

interface DropdownProps {
  opts: string[];
  width?: number;
  id?: string;
}

export default function Dropdown({ opts, width, id }: DropdownProps) {
  return (
    <Autocomplete
      disablePortal
      id={id ? id : `${opts[0]}-dropdown`}
      options={opts}
      sx={width ? { width: width } : { width: 300 }}
      fullWidth
      selectOnFocus
      renderInput={(params) => <TextField {...params} label='Model' />}
    />
  );
}
