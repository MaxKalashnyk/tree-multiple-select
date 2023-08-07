import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import CheckBoxChecked from '~/assets/svgs/CheckBoxChecked.svg';
import CheckBoxEmpty from '~/assets/svgs/CheckBoxEmpty.svg';
import CheckBoxPartial from '~/assets/svgs/CheckBoxPartial.svg';
import TriangleCollapsed from '~/assets/svgs/TriangleCollapsed.svg';
import TriangleExpanded from '~/assets/svgs/TriangleExpanded.svg';

export const Wrap = styled(Box)(() => ({
  width: '100%',
  position: 'relative',
  '& .dropdown': {
    width: '100%',
    zIndex: 5,
  },
  '& .dropdown .dropdown-content': {
    width: '100%',
  },

  '& .dropdown-select': {
    '& .tag': {
      padding: '2px 0 2px 8px',
      height: '25px',
    },
    '& .tag-remove': {
      fontSize: '0.92rem',
    },
  },

  '& .dropdown-select .dropdown-trigger': {
    width: '100%',
    padding: '4px',
    lineHeight: '20px',
    maxHeight: '200px',
    display: 'inline-block',
    overflow: 'auto',
    border: '1px solid #b9b9b9',
    borderRadius: 6,
    '& > span:after': {
      fontSize: '12px',
      color: '#555',
    },
    '&:after': {
      position: 'absolute',
      right: '12px',
      top: '9px',
    },
  },

  '& .dropdown-select .search': {
    borderBottom: 'none',
    height: '26px',
  },

  '& .dropdown-select li.node': {
    position: 'relative',
    padding: 0,
    overflow: 'hidden',

    display: 'flex',
    flexDirection: 'row-reverse',

    '&.focused': {
      backgroundColor: 'transparent',
    },
    '&:hover': {
      backgroundColor: '#f4f4f4',
    },

    '&[aria-level="1"]': { paddingLeft: '8px !important' },
    '&[aria-level="2"]': { paddingLeft: '25px !important' },
    '&[aria-level="3"]': { paddingLeft: '42px !important' },
    '&[aria-level="4"]': { paddingLeft: '59px !important' },

    '& > i.toggle': {
      flexGrow: '2',
      textAlign: 'right',
      cursor: 'pointer',
      position: 'relative',
      whiteSpace: 'pre',
      marginRight: 0,
      outline: 'none',

      '&:after': {
        content: '""',
        cursor: 'pointer',
        fontSize: 0,
        display: 'block',
        width: '8px',
        height: '5px',
        position: 'absolute',
        top: '13px',
        right: '10px',
      },

      '&.collapsed': {
        '&:after': {
          width: '5px',
          height: '8px',
          top: '10px',
          right: '11px',
          backgroundImage: `url(${TriangleCollapsed})`,
        },
      },

      '&.expanded': {
        '&:after': {
          backgroundImage: `url(${TriangleExpanded})`,
        },
      },
    },

    '&.partial': {
      '& > label > input': {
        '&:before': {
          width: '16px',
          height: '16px',
          top: '0',
          left: '1px',
          backgroundImage: `url(${CheckBoxPartial})`,
        },
      },
    },

    '& > label': {
      display: 'block',
      padding: '6px 4px',

      '& > input': {
        '&:before': {
          width: '18px',
          height: '18px',
          border: 0,
          display: 'block',
          backgroundImage: `url(${CheckBoxEmpty})`,
          transition: 'none',
          top: '-1px',
        },

        '&:checked': {
          '&:before': {
            transform: 'none',
            width: '16px',
            height: '16px',
            top: '0',
            left: '1px',
            backgroundImage: `url(${CheckBoxChecked})`,
          },
        },
      },
    },

    '&.leaf': {
      '& > i': {
        display: 'none',
      },
      '& > label': {
        flexGrow: '2',
      },
    },
  },

  '& .searchModeOn': {
    '& i.toggle': {
      display: 'block',
      opacity: 0,
    },
  },

  '& .dropdown-select .checkbox-item': {
    position: 'relative',
    width: '1rem',
    height: '1rem',
    marginRight: '9px',
    cursor: 'pointer',
    appearance: 'none',
    outline: 0,
    verticalAlign: 'middle',
    '&:checked:before': {
      height: '50%',
      transform: 'rotate(-45deg)',
      borderTopStyle: 'none',
      borderRightStyle: 'none',
      borderColor: '#2196f3',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: 1,
      width: '100%',
      height: '100%',
      border: '2px solid #aaa',
      transition: 'all 0.3s ease-in-out',
    },
  },
}));
