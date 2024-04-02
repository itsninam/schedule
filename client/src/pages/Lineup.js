import React, { Fragment } from "react";
import { useSchedule } from "../contexts/ScheduleContext";
import Loading from "../components/Loading";
import Button from "../components/Button";
import { useParams } from "react-router-dom";

function Lineup() {
  const { scheduleData, isLoading, addMyFestival, selectedFestival } =
    useSchedule();

  const { festival } = useParams();

  if (isLoading) {
    return <Loading />;
  }

  const selectedFest = selectedFestival?.filter(
    (fest) => fest._id === festival
  );

  if (festival) {
    return (
      <section className="image-container">
        {selectedFest.map((data) => {
          return (
            <Fragment key={data._id}>
              <img src={data.festivalImage} alt={data.festivalName} />
            </Fragment>
          );
        })}
      </section>
    );
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
