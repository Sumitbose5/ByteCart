import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home"; 
import SellerOnboard from "./pages/SellerOnboard";
import SellerDashboard from "./pages/SellerDashboard";
import BuyerProducts from "./pages/BuyerProducts";
import { UserProvider } from "./context/UserContext";
import { useAuth } from "@clerk/react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, isLoaded } = useAuth();
  
  if (!isLoaded) return <div>Loading...</div>;
  if (!isSignedIn) return <Navigate to="/" replace />;
  
  return <>{children}</>;
};

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sellerOnboard" element={<SellerOnboard />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <SellerDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/products" 
            element={
              <ProtectedRoute>
                <BuyerProducts />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;