import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import LoginScreen from "./modules/auth/screens/LoginScreen";
import RegisterScreen from "./modules/auth/screens/RegisterScreen/RegisterScreen";
import FeedScreen from "./modules/main/screens/Feed/FeedScreen";
import PostScreen from "./modules/main/screens/Post/PostScreen";
import GroupsScreen from "./modules/main/screens/Groups/Groups";
import GroupDetailScreen from "./modules/main/screens/GroupDetail/GroupDetail";

function App() {
  return (
    <Routes>
      <Route element={<LoginScreen />} path="/login" />
      <Route element={<RegisterScreen />} path="/registrar" />
      <Route element={<ProtectedRoute />}>
        <Route element={<FeedScreen />} path="/" />
        <Route element={<PostScreen />} path="/posts/:id" />
        <Route element={<GroupsScreen />} path="/grupos" />
        <Route element={<GroupDetailScreen />} path="/grupos/:id" />
      </Route>
    </Routes>
  );
}

export default App;
