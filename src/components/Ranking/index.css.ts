import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/vars.css'
import { columnWrapper, rowWrapper } from '@/styles/wrapper.css'
import { plainButton } from '@/styles/common.css'
import { bold } from '@/styles/fonts.css'

export const rankingTitle = style([
  bold, 
  {
    display: 'inline-block',
    width: '100%',
    fontSize: vars.fontSize['0.5x'],
    alignItems: 'flex-start',
    padding: `${vars.space['0.5x']} 0 0 ${vars.space['0.5x']}`,
    margin: `${vars.space['0.5x']} 0 0 0`,
  }
])

export const rankingList = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: 310,
  overflowY: 'auto',
  zIndex: 100,
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
})

export const openRankingListItem = style([
  plainButton,
  rowWrapper, 
  {
    margin: `2px 0`,
    width: 184,
    padding: vars.space['0.5x'],
    ':hover': {
      backgroundColor: vars.colors.lightGray,
      // borderRadius: vars.borderRadius['0.5x']
    },
  }
])

export const closeRankingListItem = style([
  plainButton,
  // rowWrapper,
  {
    margin: `2px 0`,
    width: '100%',
    padding: `${vars.space['0.5x']} 0`,
    ':hover': {
      backgroundColor: vars.colors.lightGray,
      // borderRadius: vars.borderRadius['0.5x']
    },
  }
])

export const rankingUserName = style({
  overflow: 'hidden', 
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  flex: '1',
  margin: `0 0 0 ${vars.space['1x']}`,
})