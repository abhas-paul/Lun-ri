import { Routes, Route, Navigate } from "react-router";
import {
  Home,
  SignUp,
  Login,
  Notifications,
  Call,
  Chat,
  OnBoarding,
} from "./pages/index.js";
import Loading from "./components/Loading.jsx";

import { Toaster } from "react-hot-toast";
import { useAuthUser } from "./hooks/useAuthUser";

function App() {
  const { data: authData, isLoading, error } = useAuthUser();

  const authUser = authData?.user;

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <section className="h-screen" data-theme="calmpizza" >
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />

        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to="/" />}
        />

        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/" />}
        />

        <Route
          path="/onboarding"
          element={authUser ? <OnBoarding /> : <Navigate to="/login" />}
        />

        <Route
          path="/notifications"
          element={authUser ? <Notifications /> : <Navigate to="/login" />}
        />

        <Route
          path="/call"
          element={authUser ? <Call /> : <Navigate to="/login" />}
        />

        <Route
          path="/chat"
          element={authUser ? <Chat /> : <Navigate to="/login" />}
        />
      </Routes>

      <Toaster />
    </section>
  );
}

export default App;