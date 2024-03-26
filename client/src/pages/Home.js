import React from "react";
import { useSchedule } from "../contexts/ScheduleContext";

function Home() {
  const { userInput, handleSubmit, setUserInput, errorMessage } = useSchedule();
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Search festival</label>
        <input
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
        />
      </form>
      <p>{errorMessage && errorMessage}</p>
    </>
  );
}

export default Home;
