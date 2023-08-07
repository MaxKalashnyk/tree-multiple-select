import { BoxProps } from '@mui/material';
import { DropdownTreeSelectProps } from 'react-dropdown-tree-select';
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

export interface IProps<T> extends DropdownTreeSelectProps {
  name: Path<T>;
  control: Control<T, object>;
  setValue: UseFormSetValue<T>;
  options: TreeOption[];
  mode: ModeType;
  outsideError?: string;
  label?: string;
  wrapProps?: BoxProps;
}
