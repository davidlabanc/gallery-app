import { createContext } from 'react';

export const DataContext = createContext({
  appendToResponse: () => { },
  deleteFromResponse: () => { },
  data: {
    categories: null,
    photos: []
  }
});
