import { BoxProps } from '@mui/material';
import { Control, Path, UseFormSetValue } from 'react-hook-form';

interface Option {
  label: string;
  value: string;
  checked: boolean;
}

interface ChildOption extends Option {
  parent: string;
}

export interface TreeOption extends Option {
  children: ChildOption[];
}

type ModeType = 'multiSelect' | 'hierarchical' | 'simpleSelect' | 'radioSelect';

export interface IProps<T> {
  name: Path<T>;
  control: Control<T, object>;
  setValue: UseFormSetValue<T>;
  options: TreeOption[];
  onChange: (nodes: TreeOption[]) => void;
  mode: ModeType;
  outsideError?: string;
  label?: string;
  wrapProps?: BoxProps;
}
