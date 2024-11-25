import "./App.css";
import { Routes, Route, Navigate } from "react-router";
import { useSchedule } from "./contexts/ScheduleContext";
import homeRoutes from "./routes/homeRoutes";
import scheduleRoutes from "./routes/scheduleRoutes";

//components
import Wrapper from "./components/Wrapper";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Lineup from "./pages/Lineup";
import DaySchedule from "./pages/DaySchedule";
import ScheduleNavigation from "./pages/ScheduleNavigation";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import MyFestivals from "./pages/MyFestivals";
import NoFestivals from "./components/NoFestivals";

function App() {
  const { dayOneSchedule, dayRoutes, selectedFestId, myFestival } =
    useSchedule();

  const scheduleRoute = scheduleRoutes(selectedFestId);

  return (
    <>
      <Header />
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="lineup/:festival" element={<Lineup />} />

          <Route
            path="schedule"
            element={
              myFestival.length === 0 ? (
                <NoFestivals />
              ) : (
                <ScheduleNavigation routes={scheduleRoute} type="top-nav" />
              )
            }
          >
            <Route index element={<Navigate to={selectedFestId} replace />} />
            <Route
              path=":selectedFestId"
              element={
                <ScheduleNavigation routes={dayRoutes} type="days-nav" />
              }
            >
              <Route index element={<Navigate to={dayOneSchedule} replace />} />
              <Route path=":day" element={<DaySchedule />} />
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
                  element={
                    <Navigate
                      to={`${dayOneSchedule}/${selectedFestId}`}
                      replace
                    />
                  }
                />
                <Route
                  path={"/schedule/my-schedule/:day/:id"}
                  element={<DaySchedule />}
                />
              </>
            </Route>
            <Route path="lineup">
              <>
                <Route
                  index
                  element={<Navigate to={selectedFestId} replace />}
                />
                <Route path=":id" element={<Lineup />} />
              </>
            </Route>
          </Route>
          <Route path="my-festivals" element={<MyFestivals />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Navigation routes={homeRoutes} type="bottom-nav" />
      </Wrapper>
    </>
  );
}

export default App;
