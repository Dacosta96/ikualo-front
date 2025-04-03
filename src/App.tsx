import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import ProfilePage from "./components/UserProfile/ProfileClerk";
import { useAuth } from "@clerk/clerk-react";
import LoadingSpinner from "./components/common/LoadingSpinner";

export default function App() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Protected Routes */}
          {isSignedIn && (
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route index path="/" element={<Home />} />
                <Route path="/profile-user" element={<ProfilePage />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/blank" element={<Blank />} />
                <Route path="/form-elements" element={<FormElements />} />
                <Route path="/basic-tables" element={<BasicTables />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/avatars" element={<Avatars />} />
                <Route path="/badge" element={<Badges />} />
                <Route path="/buttons" element={<Buttons />} />
                <Route path="/images" element={<Images />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/line-chart" element={<LineChart />} />
                <Route path="/bar-chart" element={<BarChart />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Route>
          )}

          {/* Auth Routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* add router redirect when / */}
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
      </Router>
    </>
  );
}
