function ChoosingDifficulty({ dispatch }) {
  return (
    <div className="onetwo">
      <h3 className="difftext">Choose your difficulty:</h3>
      <select
        className="btn btn-ui margin-bottom"
        onChange={(e) =>
          dispatch({ type: "changeDiffuclty", payload: e.target.value })
        }
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
  );
}

export default ChoosingDifficulty;
