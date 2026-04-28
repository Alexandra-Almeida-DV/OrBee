import { useContext } from 'react';
import { AppEffectsContext } from '../contexts/AppEffectsContext';
import type { AppEffectsContextValue } from '../contexts/AppEffectsContext';

export function useAppEffects(): AppEffectsContextValue {
  return useContext(AppEffectsContext);
}