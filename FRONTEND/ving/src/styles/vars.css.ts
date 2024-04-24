import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  space: {
    none: '0',
    '0.5x': '4px',
    '1x': '8px',
    '2x': '16px',
    '3x': '24px',
    '4x': '32px',
    '5x': '40px',
  },

  colors: {
    white: '#ffffff',
    black: '#000000',
    darkGray: '#505050',
    red: '#F00000',
    gray: '#CFCFCF',
    lightGray: '#F2F2F2',
    pink: '#D16D6A',
  },

  borderRadius: {
    '0x': '0px',
    '0.5x': '4px',
    '1x': '8px',
    '2x': '16px',
    '3x': '24px',
    '4x': '32px',
    '5x': '40px',
    top: '32px 32px 0 0',
    full: '9999px',
  },

  fontFamily: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },

  fontSize: {
    '0x': '8px',
    '1x': '16px',
    '2x': '24px',
    '3x': '32px',
    '4x': '40px',
    '5x': '48px',
  },

  lineHeight: {
    '0x': '1',
    '1x': '1.25',
    '2x': '1.5',
    '3x': '1.75',
    '4x': '2',
    '5x': '2.25',
    '6x': '2.5',
    '7x': '2.75',
    '8x': '3',
  },
});