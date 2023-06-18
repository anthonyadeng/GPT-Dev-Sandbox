import { Autocomplete, TextField } from '@mui/material';
interface DropdownProps {
  options: String[];
}
export default function Dropdown({ options }: DropdownProps) {
  return (
    <div>
      <Autocomplete
        disablePortal
        id='combo-box-demo'
        options={options}
        sx={{ width: 300 }}
        selectOnFocus
        renderInput={(params) => <TextField {...params} label='Model' />}
      />
    </div>
  );
}
