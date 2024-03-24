function ChoosingAmoutOfQuestions({ dispatch }) {
  return (
    <div className="onetwo">
      <h3 className="difftext">Choose the amount of questions:</h3>
      <select
        className="btn btn-ui margin-bottom"
        onChange={(e) =>
          dispatch({
            type: "changeAmountOfQuestions",
            payload: e.target.value,
          })
        }
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </select>
    </div>
  );
}

export default ChoosingAmoutOfQuestions;
