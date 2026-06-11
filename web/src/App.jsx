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
import Layout from "./components/Layout.jsx";

import { Toaster } from "react-hot-toast";
import { useAuthUser } from "./hooks/useAuthUser";

function App() {
  const { data: authData, isLoading } = useAuthUser();

  const authUser = authData?.user;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section
      className="h-screen"
      data-theme="calmpizza"
    >
      <Routes>
        {/* HOME */}
        <Route
          path="/"
          element={
            !authUser ? (
              <Navigate to="/login" replace />
            ) : !authUser.isOnboarded ? (
              <Navigate to="/onboarding" replace />
            ) : (
              <Layout showSidebar={true} >
                <Home />
              </Layout>
            )
          }
        />

        {/* SIGNUP */}
        <Route
          path="/signup"
          element={
            !authUser ? (
              <SignUp />
            ) : authUser.isOnboarded ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/onboarding" replace />
            )
          }
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={
            !authUser ? (
              <Login />
            ) : authUser.isOnboarded ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/onboarding" replace />
            )
          }
        />

        {/* ONBOARDING */}
        <Route
          path="/onboarding"
          element={
            !authUser ? (
              <Navigate to="/login" replace />
            ) : authUser.isOnboarded ? (
              <Navigate to="/" replace />
            ) : (
              <OnBoarding />
            )
          }
        />

        {/* NOTIFICATIONS */}
        <Route
          path="/notifications"
          element={
            !authUser ? (
              <Navigate to="/login" replace />
            ) : !authUser.isOnboarded ? (
              <Navigate to="/onboarding" replace />
            ) : (
              <Notifications />
            )
          }
        />

        {/* CALL */}
        <Route
          path="/call"
          element={
            !authUser ? (
              <Navigate to="/login" replace />
            ) : !authUser.isOnboarded ? (
              <Navigate to="/onboarding" replace />
            ) : (
              <Call />
            )
          }
        />

        {/* CHAT */}
        <Route
          path="/chat"
          element={
            !authUser ? (
              <Navigate to="/login" replace />
            ) : !authUser.isOnboarded ? (
              <Navigate to="/onboarding" replace />
            ) : (
              <Layout>
                <Chat />
              </Layout>
            )
          }
        />

        {/* FALLBACK */}
        <Route
          path="*"
          element={
            <Navigate
              to={authUser ? "/" : "/login"}
              replace
            />
          }
        />
      </Routes>

      <Toaster />
    </section>
  );
}

export default App;