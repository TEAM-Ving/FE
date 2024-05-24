import { bold } from "@/styles/fonts.css"
import { vars } from "@/styles/vars.css"
import { betweenWrapper, columnWrapper, endWrapper, rowWrapper, startWrapper } from "@/styles/wrapper.css"
import { style } from "@vanilla-extract/css"

export const videoResize = style({
  position: 'relative',
  width: '100%',
  aspectRatio: '16/9',
})

export const videoPlayer = style({
  width: "100%",
  aspectRatio: "16/9",
})

export const streamerInfoContainer = style([
  betweenWrapper,
  {
    padding: vars.space['2x'],
  }
])

export const leftBoxContainer = style([
  rowWrapper,
  {
    gap: 10,
  }
])

export const leftBox = style([
  columnWrapper,
  {
    // gap: 10,
  }
])

export const rightBox = style([
  columnWrapper,
  {
    gap: 10,
  }
])

export const leftBoxItem = style([
  startWrapper,
  {
    height: '100%',
  }
])

export const rightBoxItme = style([
  endWrapper,
  {
    height: '100%',
  }
])

export const streamerImage = style({
  width: 80,
  height: 80, 
  borderRadius: vars.borderRadius.full,
  border: `2.5px solid ${vars.colors.black}`
})

export const streamingTitle = style([
  bold,
  {
    fontSize: vars.fontSize['2x']
  }
])

export const streamerName = style({
  fontSize: vars.fontSize['1x']
})

export const stremingInfo = style({
  fontSize: vars.fontSize['0.5x']
})