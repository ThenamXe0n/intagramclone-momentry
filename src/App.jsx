import { Route, Routes } from "react-router";
import "./App.css";
import AccoutLayout from "./layouts/AccoutLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Explore from "./pages/Explore";
import Post from "./pages/Post";
import SavePost from "./pages/SavePost";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { pagePaths } from "./router/pagePaths";
import ProtectedRoute from "./router/ProtectedRoute";

function App() {
  return (
    <section className="max-w-md mx-auto shadow-neutral-400 shadow-lg  w-full min-h-screen">
      <Routes>
        <Route path={pagePaths.home} element={<ProtectedRoute isLoggedIn={true}><AccoutLayout /></ProtectedRoute>}>
          <Route index element={<Home />} />
          <Route path={pagePaths.messages} element={<Messages />} />
          <Route path={pagePaths.notifications} element={<Notifications />} />
          <Route path={pagePaths.explore} element={<Explore />} />
          <Route path={pagePaths.post} element={<Post />} />
          <Route path={pagePaths.savePost} element={<SavePost />} />
          <Route path={pagePaths.profile} element={<Profile />} />
          <Route path={pagePaths.settings} element={<Settings />} />
        </Route>
        <Route path={pagePaths.login} element={<Login />} />
        <Route path={pagePaths.register} element={<Register />} />
      </Routes>
    </section>
  );
}

export default App;
