import React, { Fragment, useEffect } from "react";
import { useSchedule } from "../contexts/ScheduleContext";
import Loading from "../components/Loading";
import Button from "../components/Button";
import { useParams } from "react-router-dom";

function Lineup() {
  const {
    scheduleData,
    isLoading,
    addMyFestival,
    handleSelectFestival,
    selectedFestival,
    fetchData,
  } = useSchedule();

  const { id, festival } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      handleSelectFestival(id);
    }

    if (festival !== undefined) {
      fetchData(festival);
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (id !== undefined) {
    return (
      <section className="image-container">
        {selectedFestival.map((data) => {
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
