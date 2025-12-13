import { Route, Routes } from "react-router-dom";

import LoginScreen from "./modules/auth/LoginScreen";
function App() {
  return (
    <Routes>
      <Route element={<LoginScreen />} path="/login" />
    </Routes>
  );
}

export default App;
