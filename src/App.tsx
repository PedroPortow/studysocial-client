import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import LoginScreen from "./modules/auth/screens/LoginScreen";
import RegisterScreen from "./modules/auth/screens/RegisterScreen/RegisterScreen";
import FeedScreen from "./modules/main/screens/Feed/FeedScreen";
import PostScreen from "./modules/main/screens/Post/PostScreen";

function App() {
  return (
    <Routes>
      <Route element={<LoginScreen />} path="/login" />
      <Route element={<RegisterScreen />} path="/registrar" />
      <Route element={<ProtectedRoute />}>
        <Route element={<FeedScreen />} path="/" />
        <Route element={<PostScreen />} path="/posts/:id" />
      </Route>
    </Routes>
  );
}

export default App;
