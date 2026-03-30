import React from "react";
import { useNavigate } from "react-router-dom";

type Product = {
  id: number;
  title: string;
  price: string;
  category: string;
  author: string;
};

const dummyProducts: Product[] = [
  { id: 1, title: "E-Commerce React Template", price: "$49", category: "Web Apps", author: "CodeNinja" },
  { id: 2, title: "Auth Boilerplate (Node.js)", price: "$29", category: "Backend", author: "JSmith" },
  { id: 3, title: "iOS Chat UI Kit", price: "$39", category: "Mobile Apps", author: "UIUX_Pro" },
  { id: 4, title: "Machine Learning Model (Python)", price: "$99", category: "Data Science", author: "DataGeek" },
];

const BuyerProducts: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-sm p-4 px-8 flex justify-between items-center z-10 w-full relative">
        <h1 className="text-xl font-bold text-indigo-600">Marketplace</h1>
        <div className="flex gap-4 items-center">
          <button 
            onClick={() => navigate("/dashboard")}
            className="text-gray-600 hover:text-indigo-600 font-medium transition cursor-pointer"
          >
            Switch to Seller
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold mb-8">Codes to Buy</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dummyProducts.map((product) => (
            <div key={product.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-indigo-50 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <span className="text-xl font-bold text-gray-900">{product.price}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{product.title}</h3>
              <p className="text-sm text-gray-500 mb-6">By {product.author}</p>
              
              <div className="mt-auto">
                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition cursor-pointer">
                  Purchase Code
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BuyerProducts;
