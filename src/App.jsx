import { Route, Routes } from "react-router-dom";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { ToastContainer } from "react-toastify";
import FullPageLayout from "./components/Layout/FullPageLayout/FullPageLayout";
import DashLayout from "./components/Layout/Dash/DashLayout";
import PersistsLogin from "./components/auth/PersistsLogin";
import Chat from "./pages/chat/Chat";
import Prefetch from "./components/auth/Prefetch";
import RequiredAuth from "./components/auth/RequiredAuth";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="light"
      />
      <Routes>
        {/* Public */}
        <Route path="" element={<FullPageLayout />}>
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        {/* Private */}
        <Route element={<RequiredAuth />}>
          <Route element={<PersistsLogin />}>
            <Route element={<Prefetch />}>
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Chat />} />
              </Route>
            </Route>
          </Route>
        </Route>
        {/* Dash end */}
      </Routes>
    </>
  );
}

export default App;
