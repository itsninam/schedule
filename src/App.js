import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import { useSchedule } from "./contexts/ScheduleContext";
import homeRoutes from "./data/homeRoutes";
import dayRoutes from "./data/dayRoutes";

//components
import Wrapper from "./components/Wrapper";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Lineup from "./pages/Lineup";
import DaySchedule from "./pages/DaySchedule";
import scheduleRoutes from "./data/scheduleRoutes";
import ScheduleNavigation from "./pages/ScheduleNavigation";

function App() {
  const { dayOneSchedule } = useSchedule();

  return (
    <>
      <Header />
      <Wrapper>
        <Routes>
          <Route path="/" element={<Lineup />} />
          <Route
            path="schedule"
            element={
              <ScheduleNavigation routes={scheduleRoutes} type="top-nav" />
            }
          >
            <Route index element={<Navigate to="music" replace />} />
            <Route
              path="music"
              element={
                <ScheduleNavigation routes={dayRoutes} type="days-nav" />
              }
            >
              <Route index element={<Navigate to={dayOneSchedule} replace />} />
              <Route path={`/schedule/music/:day`} element={<DaySchedule />} />
            </Route>
            <Route
              path="my-schedule"
              element={
                <ScheduleNavigation routes={dayRoutes} type="days-nav" />
              }
            >
              <>
                <Route
                  index
                  element={<Navigate to={dayOneSchedule} replace />}
                />
                <Route
                  path={"/schedule/my-schedule/:day"}
                  element={<DaySchedule />}
                />
              </>
            </Route>
          </Route>
        </Routes>
        <Navigation routes={homeRoutes} type="bottom-nav" />
      </Wrapper>
    </>
  );
}

export default App;
