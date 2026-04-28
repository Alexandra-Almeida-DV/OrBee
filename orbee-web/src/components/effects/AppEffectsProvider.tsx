import type { ReactNode } from 'react';
import { usePointerPos } from '../../hooks/usePointerPos';
import { PageHexBg } from '../../contexts/PageHexBg';
import { CursorGlow } from '../../contexts/CursorGlow';
import { AppEffectsContext } from '../../contexts/AppEffectsContext';

interface AppEffectsProviderProps {
  children: ReactNode;
}

export function AppEffectsProvider({ children }: AppEffectsProviderProps) {
  const pointerPos = usePointerPos();

  return (
    <AppEffectsContext.Provider value={{ pointerPos }}>
      <PageHexBg pointerPos={pointerPos} />
      {pointerPos && <CursorGlow pos={pointerPos} />}
      {children}
    </AppEffectsContext.Provider>
  );
}