import { Box, FormHelperText, InputAdornment, MenuItem } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useController } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { ReactComponent as Search } from '~/assets/svgs/Search.svg';

import { InputLabel } from '../InputLabel';
import { NestedItem } from './NestedItem';
import { SearchWrap, StyledSearch, StyledSelect } from './styles';
import { ILocation, IProps, Option } from './types';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      if (JSON.stringify(debouncedValue) !== JSON.stringify(value)) {
        setDebouncedValue(value);
      }
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, debouncedValue, delay]);
  return debouncedValue;
};

const transformLocationsStructure = (data: ILocation[]): Option[] => {
  const res = [];
  data?.forEach((item) => {
    const foundCountry = res.find((country) => item.country === country.name);
    if (foundCountry) {
      const foundCity = foundCountry.suboptions.find(
        (city) => item.city === city.name
      );
      if (foundCity) {
        const foundLocation = foundCity.suboptions.find(
          (location) => item.name === location.name
        );
        if (!foundLocation) {
          foundCity.suboptions.push({
            id: item.id,
            name: item.name,
            city: item.city,
            country: item.country,
          });
        }
      } else {
        foundCountry.suboptions.push({
          id: uuidv4(),
          name: item.city,
          suboptions: [{ id: item.id, name: item.name }],
          city: item.city,
          country: item.country,
        });
      }
    } else {
      res.push({
        id: uuidv4(),
        name: item.country,
        city: item.city,
        country: item.country,
        suboptions: [
          {
            id: uuidv4(),
            name: item.city,
            city: item.city,
            country: item.country,
            suboptions: [
              {
                id: item.id,
                name: item.name,
                city: item.city,
                country: item.country,
              },
            ],
          },
        ],
      });
    }
  });
  return res;
};

export const NestedSingleSelect = <T extends object>({
  id,
  name,
  control,
  outsideError,
  label,
  options = [],
  option,
  textFieldProps = {},
  menuPosition = 'left',
  wrapProps = {},
  inputLabelProps = {},
}: IProps<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const renderValue = () => options && option.name;

  const debouncedSearchValue = useDebounce(searchValue, 300);

  const errorMessage = error?.message || outsideError;

  const toggleSelect = () => {
    setIsOpen((prev) => !prev);
  };

  const [searchedLocations, setSearchedLocations] = useState(options);

  const locationOptions = useMemo(
    () => transformLocationsStructure(searchedLocations),
    [searchedLocations]
  );

  const handleSearchLocations = (searchValue) => {
    const lowered = searchValue.toLowerCase();
    const searchedLocationsOptions = options.filter(
      ({ name, city, country }) =>
        name.toLowerCase().includes(lowered) ||
        city?.toLowerCase().includes(lowered) ||
        country?.toLowerCase().includes(lowered)
    );
    setSearchedLocations(searchedLocationsOptions);
  };

  useEffect(() => {
    handleSearchLocations(debouncedSearchValue);
  }, [debouncedSearchValue]);

  return (
    <Box width="100%" {...wrapProps}>
      {label && (
        <InputLabel htmlFor={name} error={!!errorMessage}>
          {label}
        </InputLabel>
      )}

      <StyledSelect
        id={id}
        select
        SelectProps={{
          renderValue,
          value: option,
          id: 'select',
          open: isOpen,
          onOpen: toggleSelect,
          // onClose: toggleSelect,
          MenuProps: {
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: menuPosition,
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: menuPosition,
            },
          },
        }}
        {...textFieldProps}
        InputLabelProps={inputLabelProps}
      >
        <SearchWrap>
          {/* TODO: create separate component for search input if we have it not only in this nested select */}
          <StyledSearch
            id="search"
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder={`Search ${textFieldProps?.label || 'Location'}...`}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          {locationOptions.map((item) =>
            item?.suboptions?.length ? (
              <MenuItem
                key={item.id}
                disableRipple
                sx={{
                  p: 0,
                  '&:hover': {
                    backgroundColor: 'white',
                  },
                }}
              >
                <NestedItem
                  option={item}
                  options={item.suboptions}
                  onClick={(location) => {
                    field.onChange(location);
                    toggleSelect();
                  }}
                  searchValue={debouncedSearchValue}
                />
              </MenuItem>
            ) : (
              <MenuItem
                key={item?.id}
                onClick={() => {
                  field.onChange(item);
                  toggleSelect();
                }}
                disableRipple
              >
                {item?.name}
              </MenuItem>
            )
          )}
        </SearchWrap>
      </StyledSelect>

      {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
    </Box>
  );
};
