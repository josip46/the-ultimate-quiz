function Footer({ answerState, index, numberOfQuestions, dispatch, children }) {
  return (
    <>
      {children}
      {answerState && index < numberOfQuestions - 1 && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next
        </button>
      )}
      {answerState && index === numberOfQuestions - 1 && (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finishQuiz" })}
        >
          Finish
        </button>
      )}
    </>
  );
}

export default Footer;
