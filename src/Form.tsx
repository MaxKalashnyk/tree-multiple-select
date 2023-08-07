import { Button as MuiButton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TreeSelect } from './components/TreeSelect';

import { TreeOption } from './components/TreeSelect/types';

// Update this interface according to your form and move it outside this file
interface FormData {
  places: TreeOption[];
}

const defaultValues = {
  places: [],
};

export const Form = () => {
  const [result, setResult] = useState<FormData | null>(null);
  const methods = useForm<FormData>({
    defaultValues,
    // resolver: yupResolver(schema), TODO: update resolver here
  });

  const { handleSubmit, control, setValue } = methods;

  const onSubmit = (data) => {
    console.log('data', data);
    setResult(data);
  };

  const placesOptions = [
    {
      label: 'Germany',
      value: 'Germany',
      children: [
        {
          label: 'Berlin',
          value: 'Berlin',
          parent: 'Germany',
          checked: false,
        },
        {
          label: 'Dusseldorf',
          value: 'Dusseldorf',
          parent: 'Germany',
          checked: false,
        },
      ],
      checked: false,
    },
    {
      label: 'Great Britain',
      value: 'Great Britain',
      children: [
        {
          label: 'London',
          value: 'London',
          parent: 'Great Britain',
          checked: false,
        },
      ],
      checked: false,
    },
    {
      label: 'HiddenCountry',
      value: 'HiddenCountry',
      children: [
        {
          label: 'Test',
          value: 'Test',
          parent: 'HiddenCountry',
          checked: false,
        },
      ],
      checked: false,
    },
    {
      label: 'Israel',
      value: 'Israel',
      children: [
        {
          label: 'Haifa',
          value: 'Haifa',
          parent: 'Israel',
          checked: false,
        },
        {
          label: 'Kiryat Ono',
          value: 'Kiryat Ono',
          parent: 'Israel',
          checked: false,
        },
        {
          label: 'Petach Tikva',
          value: 'Petach Tikva',
          parent: 'Israel',
          checked: false,
        },
        {
          label: 'Raanana',
          value: 'Raanana',
          parent: 'Israel',
          checked: false,
        },
        {
          label: 'Ramat Gan',
          value: 'Ramat Gan',
          parent: 'Israel',
          checked: false,
        },
        {
          label: 'Tel Aviv',
          value: 'Tel Aviv',
          parent: 'Israel',
          checked: false,
        },
      ],
      checked: false,
    },
    {
      label: 'Netherlands',
      value: 'Netherlands',
      children: [
        {
          label: 'Amsterdam',
          value: 'Amsterdam',
          parent: 'Netherlands',
          checked: false,
        },
        {
          label: 'Utrecht',
          value: 'Utrecht',
          parent: 'Netherlands',
          checked: false,
        },
        {
          label: 'UTRECHT',
          value: 'UTRECHT',
          parent: 'Netherlands',
          checked: false,
        },
      ],
      checked: false,
    },
    {
      label: 'Poland',
      value: 'Poland',
      children: [
        {
          label: 'Warsaw',
          value: 'Warsaw',
          parent: 'Poland',
          checked: false,
        },
      ],
      checked: false,
    },
    {
      label: 'UK',
      value: 'UK',
      children: [
        {
          label: 'London',
          value: 'London',
          parent: 'UK',
          checked: false,
        },
      ],
      checked: false,
    },
    {
      label: 'Ukraine',
      value: 'Ukraine',
      children: [
        {
          label: 'Kyiv',
          value: 'Kyiv',
          parent: 'Ukraine',
          checked: false,
        },
      ],
      checked: false,
    },
    {
      label: 'US',
      value: 'US',
      children: [
        {
          label: 'DC',
          value: 'DC',
          parent: 'US',
          checked: false,
        },
        {
          label: 'Miami',
          value: 'Miami',
          parent: 'US',
          checked: false,
        },
        {
          label: 'Philadelphia',
          value: 'Philadelphia',
          parent: 'US',
          checked: false,
        },
      ],
      checked: false,
    },
    {
      label: 'USA',
      value: 'USA',
      children: [
        {
          label: 'Miami',
          value: 'Miami',
          parent: 'USA',
          checked: false,
        },
        {
          label: 'WASHINGTON, DC',
          value: 'WASHINGTON, DC',
          parent: 'USA',
          checked: false,
        },
      ],
      checked: false,
    },
  ];

  const handleLocationChange = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack width="400px" margin="auto">
        <Stack direction="row" mb={2}>
          <TreeSelect
            name="places"
            mode="multiSelect"
            options={placesOptions}
            onChange={handleLocationChange}
            setValue={setValue}
            control={control}
          />
        </Stack>
        <Stack direction="row" mb={2}>
          <MuiButton type="submit" variant="contained">
            Submit
          </MuiButton>
        </Stack>
        <Stack>
          <Typography>Form result:</Typography>
          <code>{JSON.stringify(result)}</code>
        </Stack>
      </Stack>
    </form>
  );
};
