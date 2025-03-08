import { useState } from "react";
import { Link } from "react-router-dom";

import axios from 'axios'
function RegisterBank() {
  const [name, setName] = useState("");
  const [BIC, setBIC] = useState("");
  const [IFSC, setIFSC] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
  
    try {
      const response = await axios.post("http://localhost:3000/api/banks/create", {
        BIC,
        name,
        IFSC
      });
  
      if (response.status === 200) {
        setMessage("Bank registered successfully!");
        setName("");
        setBIC("");
        setIFSC("");
        setMessage("")
      } else {
        setMessage("Failed to register bank.");
      }
    } catch (error) {
      console.log(error);
      
    }
  
    setLoading(false);
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Register Bank</h1>
      <input 
        name="name" 
        placeholder="Bank Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        className="mb-2 p-2 border rounded w-80" 
      />
      <input 
        name="BIC" 
        placeholder="BIC" 
        value={BIC} 
        onChange={(e) => setBIC(e.target.value)} 
        className="mb-2 p-2 border rounded w-80" 
      />
      <input 
        name="IFSC" 
        placeholder="IFSC" 
        value={IFSC} 
        onChange={(e) => setIFSC(e.target.value)} 
        className="mb-2 p-2 border rounded w-80" 
      />
      <button 
        onClick={handleSubmit} 
        className="bg-black  cursor-pointer text-white px-4 py-2 rounded mt-2"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </div>
  );
}

export default RegisterBank;