import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const SellerDashboard: React.FC = () => {
  const { email } = useUserContext();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-sm p-4 px-8 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-600">Seller Dashboard</h1>
        <div className="flex gap-4 items-center">
          <span className="text-gray-600 font-medium">{email}</span>
          <button 
            onClick={() => navigate("/products")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition cursor-pointer"
          >
            Switch to Buyer
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold mb-6">Welcome to your Dashboard</h2>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-600 text-lg">
            This is where you can manage your code, view sales, and track analytics.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dummy Stats Cards */}
            <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100">
              <h3 className="text-indigo-800 font-semibold mb-2">Total Sales</h3>
              <p className="text-3xl font-bold text-indigo-600">$0.00</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
              <h3 className="text-green-800 font-semibold mb-2">Active Products</h3>
              <p className="text-3xl font-bold text-green-600">0</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
              <h3 className="text-purple-800 font-semibold mb-2">Total Views</h3>
              <p className="text-3xl font-bold text-purple-600">0</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellerDashboard;
