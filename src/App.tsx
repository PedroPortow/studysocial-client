import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import LoginScreen from "./modules/auth/screens/LoginScreen";
import FeedScreen from "./modules/main/screens/Feed/FeedScreen";

function App() {
  return (
    <Routes>
      <Route element={<LoginScreen />} path="/login" />
      <Route element={<ProtectedRoute />}>
        <Route element={<FeedScreen />} path="/" />
      </Route>
    </Routes>
  );
}

export default App;
