import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import { useSchedule } from "./contexts/ScheduleContext";
import homeRoutes from "./data/homeRoutes";

//components
import Lineup from "./pages/Lineup";
import Schedule from "./pages/Schedule";
import Navigation from "./components/Navigation";
import FullSchedule from "./pages/FullSchedule";
import MySchedule from "./pages/my-schedule/MySchedule";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import DaySchedule from "./pages/DaySchedule";
import MyDaySchedule from "./pages/my-schedule/MyDaySchedule";

function App() {
  const { dayOneSchedule, myScheduleDayOne } = useSchedule();

  return (
    <Wrapper>
      <Header />
      <Routes>
        <Route path="/" element={<Lineup />} />
        <Route path="schedule" element={<Schedule />}>
          <Route index element={<Navigate to="music" replace />} />
          <Route path="music" element={<FullSchedule />}>
            <Route index element={<Navigate to={dayOneSchedule} replace />} />
            <Route path={`/schedule/music/:day`} element={<DaySchedule />} />
          </Route>
          <Route path="my-schedule" element={<MySchedule />}>
            {myScheduleDayOne !== null && (
              <>
                <Route
                  index
                  element={<Navigate to={myScheduleDayOne} replace />}
                />
                <Route
                  path={"/schedule/my-schedule/:day"}
                  element={<MyDaySchedule />}
                />
              </>
            )}
          </Route>
        </Route>
      </Routes>
      <Navigation routes={homeRoutes} type="bottom-nav" />
    </Wrapper>
  );
}

export default App;
