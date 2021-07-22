import { useContext, useState, createContext } from "react";
import { produce } from "immer";

export const ApplicationState = createContext([{}, () => undefined]);

export function AppStateProvider(props) {
  const [state, setState] = useState(
    props.initialState ? props.initialState() : {}
  );
  return (
    <ApplicationState.Provider
      value={[
        state,
        async (mutation) => {
          const m = await mutation;

          setState((s) => {
            const nextState = produce(s, m);

            props.onChange && props.onChange(nextState);

            return nextState;
          });
        }
      ]}
    >
      {props.children}
    </ApplicationState.Provider>
  );
}

export function useApplicationState() {
  return useContext(ApplicationState);
}
