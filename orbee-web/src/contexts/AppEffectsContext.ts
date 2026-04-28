import { createContext } from 'react';
import type { PointerPos } from '../hooks/usePointerPos';

export interface AppEffectsContextValue {
  pointerPos: PointerPos | null;
}

export const AppEffectsContext = createContext<AppEffectsContextValue>({ pointerPos: null });