import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios"; // ✅ Import axios to fetch project data

function Breadcrumb() {
  const location = useLocation();
  const { projectId } = useParams(); // Get project ID from URL
  const [projectName, setProjectName] = useState(null);

  const pathSegments = location.pathname.split("/").filter((segment) => segment);

  console.log("Breadcrumb Path Segments:", pathSegments);

  // ✅ Fetch project name when `id` changes
  useEffect(() => {
    if (!projectId) return; // Skip if no project ID

    const fetchProjectName = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, unable to fetch project.");
          return;
        }

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched Project Name:", res.data.name);
        setProjectName(res.data.name); // ✅ Set project name
      } catch (error) {
        console.error("Error fetching project name:", error);
      }
    };

    fetchProjectName();
  }, [projectId]);

  return (
    <nav className="text-gray-600 mb-4">
      <ul className="flex space-x-2">
        {/* Home Link */}
        <li>
          <Link to="/" className="hover:text-blue-500">Home</Link>
        </li>

        {pathSegments.map((segment, index) => {
          let url = `/${pathSegments.slice(0, index + 1).join("/")}`;
          let isProjectId = segment === projectId;
          let isLast = index === pathSegments.length - 1;
          let displayText = segment?.includes("_") ? segment.split("_")[0] : segment;

          // ✅ Replace project ID with project name
          if (isProjectId && projectName) {
            displayText = projectName;
          }

          return (
            <li key={url} className="flex items-center">
              <span className="mx-2">/</span>
              {!isLast || isProjectId ? (
                <Link to={url} className="hover:text-blue-500 capitalize">{displayText}</Link>
              ) : (
                <span className="text-gray-500 capitalize">{displayText}</span> // Last item remains unclickable
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Breadcrumb;
