import { createContext } from 'react';

export const UIContext = createContext({
  overlay: false,
  showOverlay: () => {},
});