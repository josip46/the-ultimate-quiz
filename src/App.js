import { useEffect, useReducer, useState } from "react";
import Header from "./Header";
import StartScreen from "./StartScreen";
import QuestionScreen from "./QuestionScreen";
import Loader from "./Loader";
import Options from "./Options";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import Error from "./Error";

const initialState = {
  questions: [],

  status: "ready",
  buttonStart: false,
  index: 0,
  answerState: null,
  points: 0,
  difficulty: "easy",
  questionAmount: 5,
  category: 9,
  timeRemaining: null,
  errorMessage: "",
};

const SECONDS_PER_QUESTION = 20;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        timeRemaining: state.questionAmount * SECONDS_PER_QUESTION,
      };
    case "error":
      return { ...state, status: "error", errorMessage: action.payload };
    case "start":
      return {
        ...state,
        buttonStart: true,
        status: "playing",
      };
    case "changeDiffuclty":
      return { ...state, difficulty: action.payload };
    case "changeAmountOfQuestions":
      return { ...state, questionAmount: action.payload };
    case "changeCategory":
      return { ...state, category: action.payload };
    case "correctAnswer":
      return {
        ...state,
        answerState: action.payload,
        points: state.points + 1,
      };
    case "wrongAnswer":
      return {
        ...state,
        answerState: action.payload,
      };
    case "nextQuestion":
      const questionLength = state.questions.length;

      return {
        ...state,
        index: state.index < questionLength - 1 ? state.index + 1 : state.index,
        answerState: null,
      };
    case "finishQuiz":
      return { ...state, status: "finished" };
    case "restartQuiz":
      return { ...initialState, status: "ready" };
    case "tick":
      return {
        ...state,
        timeRemaining: state.timeRemaining > 0 ? state.timeRemaining - 1 : 0,
        status: state.timeRemaining > 0 ? state.status : "finished",
      };
    default:
      throw new Error("Error happened 💥");
  }
}

export default function App() {
  const [
    {
      status,
      questions,
      buttonStart,
      index,
      answerState,
      points,
      difficulty,
      questionAmount,
      category,
      timeRemaining,
      errorMessage,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);

  const question = questions[index];
  const numberOfQuestions = questions.length;

  useEffect(
    function () {
      async function fetching() {
        try {
          const res = await fetch(
            `https://opentdb.com/api.php?amount=${questionAmount}&type=multiple&difficulty=${difficulty}&category=${category}`
          );
          const data = await res.json();

          dispatch({ type: "dataReceived", payload: data.results });
          setIsLoading(false);
        } catch (err) {
          dispatch({ type: "error", payload: err.message });
        }
      }
      if (buttonStart) {
        setIsLoading(true);
        fetching();
      }
    },
    [buttonStart, difficulty, questionAmount, category]
  );

  return (
    <div className="app">
      <Header />
      <main className="main">
        {status === "ready" ? <StartScreen dispatch={dispatch} /> : null}
        {status === "error" ? <Error errorMessage={errorMessage} /> : null}
        {status === "playing" && isLoading && <Loader />}
        {status === "playing" && !isLoading && questions.length && (
          <QuestionScreen
            numberOfQuestions={numberOfQuestions}
            question={question}
            index={index}
          >
            <Options
              question={question}
              dispatch={dispatch}
              answerState={answerState}
            />
            <Footer
              answerState={answerState}
              index={index}
              numberOfQuestions={numberOfQuestions}
              dispatch={dispatch}
            >
              <Timer dispatch={dispatch} timeRemaining={timeRemaining} />
            </Footer>
          </QuestionScreen>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            numberOfQuestions={numberOfQuestions}
            dispatch={dispatch}
          />
        )}
      </main>
    </div>
  );
}
