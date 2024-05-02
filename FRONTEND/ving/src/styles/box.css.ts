import { flex } from './common.css';

export const defaultBox = flex({
  direction: 'column',
  align: 'start',
  justify: 'start',
})

export const columnbox = flex({
  direction: 'column',
  // align: 'center',
  justify: 'center',
});

export const rowbox = flex({
  direction: 'row',
  align: 'center',
  justify: 'center',
})

export const betweenBox = flex({
  direction: 'row',
  align: 'center',
  justify: 'between',
})

export const startBox = flex({
  direction: 'row',
  align: 'center',
  justify: 'start',
})

export const endBox = flex({
  direction: 'row',
  align: 'center',
  justify: 'end',
})