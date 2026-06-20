import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Custom hook for managing dark mode
 * Respects system preference and persists user choice
 */
export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      return saved === "true";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Update DOM and localStorage when theme changes
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (isDark) {
      root.style.colorScheme = "dark";
      body.classList.add("dark-mode");
    } else {
      root.style.colorScheme = "light";
      body.classList.remove("dark-mode");
    }

    localStorage.setItem("darkMode", isDark.toString());
  }, [isDark]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      const saved = localStorage.getItem("darkMode");
      // Only update if user hasn't set preference
      if (saved === null) {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggle = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  return { isDark, toggle };
};

/**
 * Custom hook to detect screen size
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handleChange = (e) => setMatches(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
};

/**
 * Custom hook for responsive design
 */
export const useResponsive = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");

  return { isMobile, isTablet, isDesktop };
};

/**
 * Custom hook for scroll position
 */
export const useScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollPosition;
};

/**
 * Custom hook for infinite scroll
 */
export const useInfiniteScroll = (callback, threshold = 0.1) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { threshold },
    );

    const sentinel = document.getElementById("infinite-scroll-sentinel");
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [callback, threshold]);
};

/**
 * Custom hook for debounce
 */
export const useDebounce = (value, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Custom hook for throttle
 */
export const useThrottle = (value, interval = 500) => {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastRun = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(
      () => {
        if (Date.now() - lastRun.current >= interval) {
          setThrottledValue(value);
          lastRun.current = Date.now();
        }
      },
      interval - (Date.now() - lastRun.current),
    );

    return () => clearTimeout(handler);
  }, [value, interval]);

  return throttledValue;
};

/**
 * Custom hook for window size
 */
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};
