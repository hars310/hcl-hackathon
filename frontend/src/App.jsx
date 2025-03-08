import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import RegisterBank from "./pages/RegisterBank";
import TransferMoney from "./pages/TransferMoney";


const App = () => {
  return (
    <div className="bg-darkBackground text-black min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<RegisterBank />} />
          <Route path="/transfer" element={<TransferMoney/>} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;