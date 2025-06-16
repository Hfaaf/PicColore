import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights"
import { Analytics } from "@vercel/analytics"

import { HomePage } from "./pages/Home";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import TrabalheConosco from "./pages/TrabalheConosco";
import Licenciados from "./pages/Licenciados";
import Agenda from "./pages/Agenda";
import AdminLogin from "./pages/PicAdminL";
import AdminPanel from "./pages/PicAdminPainel";
import ProtectedRoute from "./components/ProtectedRoute";
import Catalogo from "./pages/Catalogo";

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomePage />
              <Footer />
            </>
          }
        />
        <Route
          path="/agenda"
          element={
            <>
              <Agenda />
              <Footer />
            </>
          }
        />
        <Route
          path="/licenciados"
          element={
            <>
              <Licenciados />
              <Footer />
            </>
          }
        />
        <Route
          path="/catalogo"
          element={
            <>
              <Catalogo />
              <Footer />
            </>
          }
        />
        <Route
          path="/trabalhe-conosco"
          element={
            <TrabalheConosco />
          }
        />
        <Route
          path="/adm"
          element={
            <AdminLogin />
          }
        />
        <Route
          path="/painel-adm"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}