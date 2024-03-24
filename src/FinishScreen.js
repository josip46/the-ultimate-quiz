function FinishScreen({ points, numberOfQuestions, dispatch }) {
  const percentage = (points / numberOfQuestions) * 100;

  let emoji;
  if (percentage === 100) {
    emoji = "🏆";
  }
  if (percentage >= 50 && percentage < 100) {
    emoji = "😄";
  }
  if (percentage < 50 && percentage > 0) {
    emoji = "😢";
  }
  if (percentage === 0) {
    emoji = "💩";
  }

  return (
    <>
      <div className="result">
        <h4>
          You have answered {points} out of {numberOfQuestions} questions
          correctly! (That's {percentage}% of questions answered correctly!
          {emoji})
        </h4>
      </div>
      <div className="center">
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "restartQuiz" })}
        >
          Play again!
        </button>
      </div>
    </>
  );
}

export default FinishScreen;
