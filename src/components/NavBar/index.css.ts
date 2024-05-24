import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/vars.css'
import { betweenWrapper, columnWrapper, defaultWrapper, rowWrapper } from '@/styles/wrapper.css';
import { plainButton } from '@/styles/common.css';

export const container = style([
  betweenWrapper,
  {
    position: 'fixed',
    width: '100%',
    backgroundColor: vars.colors.white,
    height: 50,
    padding: `0 ${vars.space['1x']} 0 ${vars.space['1x']}`,
    boxShadow: vars.boxShadow['1x'],
    zIndex: 3001,
    // overflow: 'visible'
  }
])

export const leftNavBox = style([
  rowWrapper,
  {
    gap: vars.space['1x']
  }
])

export const centerBox = style([
  rowWrapper,
  {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  }
])

export const rightNavBox = style([
  rowWrapper,
  {
    gap: vars.space['1x']
  }
])

export const logo = style([
  rowWrapper,
  {
    width: 'auto',
    height: 32,
  }
])


// studioNav.tsx

export const studioNavBox = style([
  rowWrapper,
  {
    gap: vars.space.none,
  }
])

export const textLogo = style([
  rowWrapper,
  {
    width: 'auto',
    height: 12,
  }
])


// profileMenu.tsx

export const profileMenuContainer = style({
  position: 'relative',
  cursor: 'pointer',
});

export const avatarButton = style([
  columnWrapper,
  {
    backgroundImage: 'url("/path/to/avatar.png")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    border: 'none',
    borderRadius: '50%',
  }
]);


// SeachBar.tsx

export const SearchBarContainer = style([
  rowWrapper, 
  {
  }
])

export const SearchBarInputBox = style({
  width: 300,
  border: `1px solid ${vars.colors.gray}`,
  borderRadius: vars.borderRadius['0.5x'],
})

export const searchInput = style({
  flex: 1,
  width: '100%',
  border: 'none',
  outline: 'none',
  padding: vars.space['1x'],
})

export const searchIcon = style({
  backgroundColor: vars.colors.lightGray,
  borderRadius: vars.borderRadius['0.5x'],
  border: 'none',
  cursor: 'pointer',
  margin: `0 0 0 ${vars.space['0.5x']}`,
  padding: `${vars.space['0.5x']} ${vars.space['1x']}`,
  fontSize: vars.fontSize['2x'],
})

export const autocompleteList = style({
  position: 'absolute',
  backgroundColor: vars.colors.white,
  borderRadius: vars.borderRadius['1x'],
  boxShadow: vars.boxShadow['2x'],
  maxHeight: 200,
  width: 300,
  overflowY: 'auto',
  zIndex: 100,
  selectors: {
  '&::-webkit-scrollbar': {
    display: 'none',
    // width: 5,
    // height: 2,
    // backgroundColor: vars.colors.lightGray
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: vars.colors.darkGray
  }
  },
  margin: `${vars.space['0.5x']} 0 0 0`
})

export const autocompleteItem = style([
  rowWrapper, 
  plainButton,
  {
    margin: `${vars.space['0.5x']} ${vars.space['0.5x']}`,
    padding: vars.space['0.5x'],
    selectors: {
      '&:hover': {
        backgroundColor: vars.colors.lightGray,
      }
    }
  }
])

export const searchUserName = style({
  overflow: 'hidden', 
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  margin: `0 0 0 ${vars.space['0.5x']}`,
})