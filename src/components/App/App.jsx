import { Routes, Route } from "react-router";
import RegisterPage from "../../page/RegisterPage/RegistrePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
