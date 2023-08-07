import { Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledSelect = styled(TextField)(() => ({
  '.MuiSelect-select': {
    height: '16px',
    minHeight: '16px',
  },
  '& .MuiInputBase-input': {
    padding: '8px 11px',
  },
  width: '300px',
  height: '32px',
}));

export const StyledSearch = styled(TextField)(() => ({
  margin: '10px',
  width: '225px',
  border: '1px solid rgba(21, 21, 21, 0.3)',
  borderRadius: '6px',
}));

export const SearchWrap = styled(Box)(() => ({
  height: '520px',
  maxWidth: '300px',
}));
