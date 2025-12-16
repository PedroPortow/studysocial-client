import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import LoginScreen from "./modules/auth/screens/LoginScreen";
import FeedScreen from "./modules/main/screens/Feed/FeedScreen";
import PostScreen from "./modules/main/screens/Post/PostScreen";

function App() {
  return (
    <Routes>
      <Route element={<LoginScreen />} path="/login" />
      <Route element={<ProtectedRoute />}>
        <Route element={<FeedScreen />} path="/" />
        <Route element={<PostScreen />} path="/posts/:id" />
      </Route>
    </Routes>
  );
}

export default App;
