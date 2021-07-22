import { useApplicationState } from "./ApplicationState";
import "./styles.css";

export default function App() {
  const [state, mutate] = useApplicationState();

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>name is: {state.name}</h2>
      <button
        onClick={() =>
          mutate((draft) => {
            draft.name = "John Doe";

            return draft;
          })
        }
      >
        Set state to John Doe
      </button>
    </div>
  );
}
