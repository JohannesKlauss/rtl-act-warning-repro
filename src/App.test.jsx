import { render, screen } from "@testing-library/react";
import App from "./App";
import { AppStateProvider } from "./ApplicationState";

// Recursively wraps component around given decorators
function wrapWithDecorator(children, decorators, index) {
  if (index === -1) {
    return children;
  }

  return wrapWithDecorator(decorators[index](children), decorators, index - 1);
}

// Use this function instead of RTLs render function if you need to wrap your components with decorators
export function renderWithDecorators(ui, decorators) {
  return render(ui, {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    wrapper: decorators
      ? ({ children }) =>
          wrapWithDecorator(children, decorators, decorators.length - 1)
      : undefined
  });
}

export const withApplicationStateDecorator = (state = {}) => (component) => {
  return (
    <AppStateProvider initialState={() => state}>{component}</AppStateProvider>
  );
};

test("Should throw no act warning when wrapping with components that use hooks", () => {
  renderWithDecorators(<App />, [
    withApplicationStateDecorator({ name: "Test" })
  ]);

  expect(screen.getByText(/Test/i)).not.toBeUndefined();
});
