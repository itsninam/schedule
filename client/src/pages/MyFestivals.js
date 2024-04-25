import React, { useEffect } from "react";
import { useSchedule } from "../contexts/ScheduleContext";
import Festival from "../components/Festival";
import EmptyView from "../components/EmptyView";
import svg from "../assets/page-lost.svg";

function MyFestivals() {
  const { myFestival, fetchMyFestival, isLoading } = useSchedule();

  useEffect(() => {
    fetchMyFestival();
  }, [fetchMyFestival]);

  if (isLoading) {
    return "Loading";
  }

  if (myFestival.length === 0) {
    return (
      <EmptyView
        header="No festivals!"
        message="Add festivals to your list"
        image={svg}
        type="full-page"
      />
    );
  }

  return (
    <ul className="festival-list">
      {myFestival.map((festival) => {
        return <Festival festival={festival} key={festival._id} />;
      })}
    </ul>
  );
}

export default MyFestivals;
