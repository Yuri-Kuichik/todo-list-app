import { useMediaQuery } from '@vueuse/core';

export function useMedia() {
  const isSmallScreen = useMediaQuery('(max-width: 768px)');

  return {
    isSmallScreen,
  };
}