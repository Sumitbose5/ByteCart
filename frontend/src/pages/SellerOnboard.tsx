import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SellerOnboard: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    razorpayId: "",
    bio: "",
    github: "",
    accepted: false,
  });

  const [showTnC, setShowTnC] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.accepted) {
      alert("Please accept Terms & Conditions");
      return;
    }

    console.log(form);
    alert("Seller Onboarded Successfully \ud83d\ude80");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <button 
        onClick={() => navigate("/")} 
        className="absolute top-6 left-6 flex items-center gap-2 text-indigo-600 font-semibold bg-white px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to Home
      </button>

      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-lg">
        
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Become a Seller
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Razorpay ID */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Razorpay Account ID
            </label>
            <input
              type="text"
              name="razorpayId"
              value={form.razorpayId}
              onChange={handleChange}
              placeholder="e.g. acc_XXXXXXXX"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Short Bio
            </label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows={4}
              placeholder="Tell buyers about yourself..."
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {/* GitHub URL */}
          <div>
            <label className="block text-sm font-medium mb-1">
              GitHub Profile URL
            </label>
            <input
              type="url"
              name="github"
              value={form.github}
              onChange={handleChange}
              placeholder="https://github.com/yourusername"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="accepted"
              checked={form.accepted}
              onChange={handleChange}
              className="w-4 h-4 cursor-pointer"
            />
            <span>
              I agree to the{" "}
              <button
                type="button"
                onClick={() => setShowTnC(true)}
                className="text-indigo-600 underline hover:text-indigo-800 cursor-pointer"
              >
                Terms & Conditions
              </button>
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition cursor-pointer"
          >
            Continue
          </button>
        </form>
      </div>

      {/* T&C Modal */}
      {showTnC && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-4">
          <div className="bg-white max-w-lg w-full p-6 rounded-xl shadow-lg relative">
            
            <h2 className="text-xl font-bold mb-4">
              Terms & Conditions
            </h2>

            <div className="text-sm text-gray-600 space-y-3 max-h-60 overflow-y-auto">
              <p>
                This is a dummy Terms & Conditions page for ByteCart.
              </p>
              <p>
                By becoming a seller, you agree to provide original code,
                maintain quality, and comply with platform rules.
              </p>
              <p>
                Payments will be processed via Razorpay. ByteCart is not
                responsible for disputes outside the platform.
              </p>
              <p>
                You are responsible for any legal issues related to your code.
              </p>
            </div>

            <button
              onClick={() => setShowTnC(false)}
              className="mt-6 w-full bg-gray-900 text-white py-2 rounded-lg cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerOnboard;