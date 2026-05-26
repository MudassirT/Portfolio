import "@testing-library/jest-dom";

Object.defineProperty(window, "matchMedia", {
  writable,
  value) => ({
    matches,
    media,
    onchange,
    addListener) => {},
    removeListener) => {},
    addEventListener) => {},
    removeEventListener) => {},
    dispatchEvent) => {},
  }),
});
