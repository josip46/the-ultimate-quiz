import { useMemo } from "react";

function shuffleArray(array) {
  const newArray = array.slice();

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function replaceHtmlEntities(text) {
  var doc = new DOMParser().parseFromString(text, "text/html");
  return doc.documentElement.textContent;
}

function Options({ question, dispatch, answerState }) {
  const shuffledAnswers = useMemo(
    () =>
      shuffleArray([...question.incorrect_answers, question.correct_answer]),
    [question]
  );

  return (
    <div className="options">
      {shuffledAnswers.map((answer) => (
        <button
          disabled={answerState}
          className={`btn btn-option ${
            answerState
              ? answer === question.correct_answer
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={answer}
          onClick={() =>
            dispatch({
              type: `${
                answer === question.correct_answer
                  ? "correctAnswer"
                  : "wrongAnswer"
              }`,
              payload: answer,
            })
          }
        >
          {replaceHtmlEntities(answer)}
        </button>
      ))}
    </div>
  );
}

export default Options;
