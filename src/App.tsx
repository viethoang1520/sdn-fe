import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import AuthPage from "./components/AuthPage";
import TrainSchedule from "./components/TrainSchedule";
import SuccessPayment from "./components/SuccessPayment";
import ErrorPayment from "./components/ErrorPayment";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/schedule" element={<TrainSchedule />} />
          <Route path="/payment/success" element={<SuccessPayment />} />
          <Route path="/payment/error" element={<ErrorPayment />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
