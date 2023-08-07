import 'react-dropdown-tree-select/dist/styles.css';

import { FormHelperText } from '@mui/material';
import { Path, PathValue, useController } from 'react-hook-form';

import { InputLabel } from '../InputLabel';
import Container from './Container';
import { Wrap } from './styles';
import { IProps } from './types';

export const TreeSelect = <T extends object>({
  options = [],
  name,
  control,
  setValue,
  mode,
  onChange,
  label,
  outsideError,
  wrapProps = {},
  ...props
}: IProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const onHandleChange = (currentNode, selectedNodes) => {
    if (mode === 'multiSelect') {
      setValue(name, selectedNodes);
      if (onChange) {
        onChange(selectedNodes);
      }
    } else {
      const { locationId, value, label, parent } = currentNode;
      const nodeData = {
        id: locationId,
        value,
        label,
        parent,
      };

      const nodeSelected = selectedNodes.some(
        ({ value }) => value === currentNode.value
      );

      setValue(
        name,
        (nodeSelected ? nodeData : undefined) as PathValue<T, Path<T>>
      );
      if (onChange) {
        onChange(
          (nodeSelected ? nodeData : undefined) as PathValue<T, Path<T>>
        );
      }
    }
  };

  const errorMessage = error?.message || outsideError;

  return (
    <Wrap {...wrapProps}>
      {label && (
        <InputLabel htmlFor={name} error={!!errorMessage}>
          {label}
        </InputLabel>
      )}

      <Container
        showPartiallySelected
        keepOpenOnSelect
        keepChildrenOnSearch
        keepTreeOnSearch
        data={options}
        onChange={(currentNode, selectedNodes) => {
          field.onChange();
          onHandleChange(currentNode, selectedNodes);
        }}
        mode={mode}
        className="dropdown-select"
        {...props}
      />

      {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
    </Wrap>
  );
};
