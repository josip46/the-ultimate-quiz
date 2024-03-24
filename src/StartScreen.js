import ChoosingAmoutOfQuestions from "./ChoosingAmoutOfQuestions";
import ChoosingCategory from "./ChoosingCategory";
import ChoosingDifficulty from "./ChoosingDifficulty";

function StartScreen({ dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the quiz</h2>
      <ChoosingDifficulty dispatch={dispatch} />
      <ChoosingAmoutOfQuestions dispatch={dispatch} />
      <ChoosingCategory dispatch={dispatch} />
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start!
      </button>
    </div>
  );
}

export default StartScreen;
