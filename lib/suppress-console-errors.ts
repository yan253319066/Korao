export function suppressConsoleErrors() {
  if (typeof window !== 'undefined') {
    const originalError = console.error;
    console.error = (...args: unknown[]) => {
      if (args[0] && typeof args[0] === 'string' && (
        args[0].includes('Framer Motion') ||
        args[0].includes('componentKey') ||
        args[0].includes('lucide') ||
        args[0].includes('Extra attributes from the server')
      )) {
        return;
      }
      originalError(...args);
    };
  }
}
