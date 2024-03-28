import React, { Fragment } from "react";
import { useSchedule } from "../contexts/ScheduleContext";
import Loading from "../components/Loading";

function Lineup() {
  const { scheduleData, isLoading, addMyFestival } = useSchedule();

  if (isLoading) {
    return <Loading />;
  }
  return (
    <section className="image-container">
      {scheduleData.map((data) => {
        return (
          <Fragment key={data._id}>
            <img src={data.festivalImage} alt={data.festivalName} />
            <button onClick={() => addMyFestival(data)}>Add Festival</button>
          </Fragment>
        );
      })}
    </section>
  );
}

export default Lineup;
