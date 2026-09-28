'use client';

import { useState, useEffect, useCallback } from 'react';
import { DynamicReleaseInfo, FALLBACK_RELEASE_INFO } from './release';

export function useReleaseInfo() {
  const [data, setData] = useState<DynamicReleaseInfo>(FALLBACK_RELEASE_INFO);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchRelease = useCallback(async (manual = false) => {
    if (manual) setIsRefreshing(true);
    try {
      const res = await fetch('/api/release-info', {
        cache: manual ? 'no-cache' : 'default',
      });
      if (res.ok) {
        const json = (await res.json()) as DynamicReleaseInfo;
        setData(json);
      }
    } catch (e) {
      console.warn('Failed to load release info from API, using fallback:', e);
    } finally {
      setIsLoading(false);
      if (manual) setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchRelease();
  }, [fetchRelease]);

  return {
    ...data,
    isLoading,
    isRefreshing,
    refresh: () => fetchRelease(true),
  };
}
