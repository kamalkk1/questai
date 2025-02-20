import React from "react";
import { Link } from "react-router-dom";

function Navbar({ username }) {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link to="/" className="text-lg font-bold">
        Podcast Manager
      </Link>
      <div>
        <Link to="/account" className="hover:underline">
          {username}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
