import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Diamond, LayoutTemplate, Pencil, Plus, Settings } from "lucide-react";

function Sidebar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className=" min-h-screen bg-white border-r border-gray-200 p-4 flex flex-col">
    <div>
      <div className="flex items-center gap-2 mb-12">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 16H28" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 4C19.1206 7.35065 20.9012 11.5847 21 16C20.9012 20.4153 19.1206 24.6494 16 28C12.8794 24.6494 11.0988 20.4153 11 16C11.0988 11.5847 12.8794 7.35065 16 4Z" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h2 className="text-2xl font-semibold">
          <span className="text-[#8B5CF6]">Ques</span>
          <span className="text-black">.AI</span>
        </h2>
      </div>

      <nav className="space-y-4">
        <Link 
          to="/projects"
          className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#F3EEFF] text-[#8B5CF6] font-medium transition-colors hover:bg-[#EBE3FF]"
        >
          <Plus className="w-5 h-5" />
          Add your Podcast(s)
        </Link>

        <Link 
          to="/projects"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 font-medium transition-colors hover:bg-gray-50"
        >
          <Pencil className="w-5 h-5" />
          Create & Repurpose
        </Link>

        <Link 
          to="/projects"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 font-medium transition-colors hover:bg-gray-50"
        >
          <LayoutTemplate className="w-5 h-5" />
          Podcast Widget
        </Link>

        <Link 
          to="/projects"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 font-medium transition-colors hover:bg-gray-50"
        >
          <Diamond className="w-5 h-5" />
          Upgrade
        </Link>
      </nav>
    </div>

       <div className="mt-auto bottom-0">
         <div className="mb-4 p-2 text-sm">
           <div className="text-gray-400">Username</div>
           <div className="text-gray-200">{user?.email}</div>
         </div>
         <button 
           className="w-full mb-10 bg-red-500 hover:bg-red-600 text-white p-2 rounded transition-colors"
           onClick={logout}
         >
           Logout
         </button>
       </div>
  </div>
  );
}

export default Sidebar;