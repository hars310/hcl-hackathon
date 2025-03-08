import { Link } from "react-router-dom";

function Home() {
    return (
      <div className="bg-zinc-900 w-full h-screen image-cover flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-6xl text-white font-bold mb-4">Welcome to Fund Transfer System</h1>
        <div className="w-1/3 my-12">
        <img src="OSV4VQ0.jpg" alt="" />
        </div>
        <div className="flex gap-4">
          <Link to="/register">
            <button className="bg-white text-black px-4 py-2 rounded cursor-pointer">Register Bank</button>
          </Link>
          <Link to="/transfer">
            <button className="bg-white text-black px-4 py-2 rounded cursor-pointer">Transfer Money</button>
          </Link>
        </div>
      </div>
    );
  }

export default Home