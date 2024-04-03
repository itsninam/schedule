import React from "react";
import { useSchedule } from "../contexts/ScheduleContext";

function Home() {
  const { userInput, handleSubmit, setUserInput, errorMessage } = useSchedule();
  return (
    <section className="full-page">
      <form onSubmit={handleSubmit}>
        <label className="sr-only">Search festival</label>
        <input
          placeholder="Search"
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
        />
      </form>
      <p>{errorMessage && errorMessage}</p>
    </section>
  );
}

export default Home;
