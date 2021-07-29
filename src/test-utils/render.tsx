import { configureStore } from "@reduxjs/toolkit";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { uiReducer, authReducer, notesReducer } from "../reducers";

const customRender = (
  ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
  options?: RenderOptions<
    typeof import("/home/philip/projects/journal-app/node_modules/@testing-library/dom/types/queries"),
    HTMLElement
  >
) => {
  const store = configureStore({
    reducer: {
      authReducer,
      uiReducer,
      notesReducer,
    },
  });
  const reduxStore: React.FC = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return { component: render(ui, { wrapper: reduxStore, ...options }), store };
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
