import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import SellerOnboard from "./pages/SellerOnboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sellerOnboard" element={<SellerOnboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;