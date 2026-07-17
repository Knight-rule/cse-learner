"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseAutoRefreshOptions {
  fetchFn: () => Promise<void>;
  intervalMs?: number;
  enabled?: boolean;
}

export function useAutoRefresh({ fetchFn, intervalMs = 30 * 60 * 1000, enabled = true }: UseAutoRefreshOptions) {
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [nextRefresh, setNextRefresh] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const countdownRef = useRef<NodeJS.Timeout | null>(null);

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await fetchFn();
      setLastUpdated(new Date());
      setNextRefresh(intervalMs / 1000);
    } finally {
      setIsRefreshing(false);
    }
  }, [fetchFn, intervalMs]);

  useEffect(() => {
    if (!enabled) return;
    refresh();

    intervalRef.current = setInterval(refresh, intervalMs);
    countdownRef.current = setInterval(() => {
      setNextRefresh((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [enabled, refresh, intervalMs]);

  return { lastUpdated, isRefreshing, nextRefresh, refresh };
}
