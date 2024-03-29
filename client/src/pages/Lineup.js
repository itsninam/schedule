import React, { Fragment } from "react";
import { useSchedule } from "../contexts/ScheduleContext";
import Loading from "../components/Loading";
import Button from "../components/Button";

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
            <Button
              onClick={() => addMyFestival(data)}
              type="primary"
              text="Add Festival"
            ></Button>
          </Fragment>
        );
      })}
    </section>
  );
}

export default Lineup;
