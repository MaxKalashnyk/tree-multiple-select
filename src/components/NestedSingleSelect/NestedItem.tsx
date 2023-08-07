import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { FC, useState } from 'react';

import { Option } from './types';

const checkShouldOpenNestedItem = (options, searchValue) => {
  return options.some((item) => {
    const isIncludesSearchValue =
      item.name?.toLowerCase()?.includes(searchValue?.toLowerCase()) &&
      searchValue !== '';
    if (isIncludesSearchValue) {
      return true;
    }
    if (item.suboptions) {
      return checkShouldOpenNestedItem(item.suboptions, searchValue);
    }
    return false;
  });
};

interface IProps {
  option: Option;
  options: Option[];
  onClick: (value: Option) => void;
  searchValue: string;
  level?: number;
}

export const NestedItem: FC<IProps> = ({
  option,
  options,
  level = 0,
  onClick,
  searchValue,
}) => {
  const [isOpen, setIsOpen] = useState(
    checkShouldOpenNestedItem(options, searchValue)
  );

  const handleOpenListClick = (e) => {
    e.stopPropagation();
    setIsOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <ListItemButton onClick={handleOpenListClick}>
        <ListItemText primary={option.name} sx={{ pl: 2 * level }} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {option.suboptions.map(({ id: suboptionId }) => {
            const item = options.find(({ id }) => suboptionId === id);

            return item?.suboptions?.length ? (
              <NestedItem
                key={item.id}
                option={item}
                options={item.suboptions}
                onClick={onClick}
                level={level + 1}
                searchValue={searchValue}
              />
            ) : (
              <ListItemButton
                key={item.id}
                selected={option.id === item.id}
                onClick={() => onClick(item)}
              >
                <ListItemText
                  primary={item.name}
                  sx={{ pl: 2 * level, ml: 2 }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Collapse>
    </Box>
  );
};
