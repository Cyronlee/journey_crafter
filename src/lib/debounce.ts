type Fn = (...args: any[]) => void;

export function debounced(fn: Fn): Fn {
  let lastTime = Date.now();
  console.log(`function useDebounce created at ${lastTime}`);

  return (...args: any[]): void => {
    const currentTime = Date.now();
    try {
      if (currentTime - lastTime > 2000) {
        lastTime = currentTime;
        console.log(`debounced function is triggered at ${currentTime}`);
        fn(...args);
      }
    } catch (error) {}
  };
}
