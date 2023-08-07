import { BoxProps, InputLabelProps, TextFieldProps } from '@mui/material';
import { CSSProperties } from 'react';
import { Control, Path } from 'react-hook-form';

export interface ILocation {
  id: number;
  city: string;
  country: string;
  name: string;
}

export interface Option {
  id: string;
  name: string;
  city?: string;
  country?: string;
  suboptions?: Option[];
}

export interface IProps<T> {
  id: string;
  name: Path<T>;
  control: Control<T, object>;
  options: ILocation[];
  menuPosition?: 'right' | 'left' | 'center';
  option: ILocation;
  outsideError?: string;
  label?: string;
  wrapProps?: BoxProps;
  textFieldProps?: TextFieldProps;
  inputLabelProps?: InputLabelProps;
}
