function replaceHtmlEntities(text) {
  var doc = new DOMParser().parseFromString(text, "text/html");
  return doc.documentElement.textContent;
}

function QuestionScreen({ question, numberOfQuestions, index, children }) {
  return (
    <div>
      <div className="progress">
        <p>
          Question: {index + 1}/{numberOfQuestions}
        </p>
      </div>

      <h4>{replaceHtmlEntities(question?.question)}</h4>
      {children}
    </div>
  );
}

export default QuestionScreen;
