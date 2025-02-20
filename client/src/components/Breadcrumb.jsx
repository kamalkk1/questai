import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

function Breadcrumb() {
  const location = useLocation();
  const { id } = useParams(); // Get project ID from URL
  const [projectName, setProjectName] = useState(null);

  const pathSegments = location.pathname.split("/").filter((segment) => segment);

  useEffect(() => {
    if (id) {
      // Fetch project details from backend
      fetch(`${import.meta.env.VITE_API_URL}/api/projects/${id}`)
        .then((res) => res.json())
        .then((data) => setProjectName(data.name)) // Update state with project name
        .catch((err) => console.error("Error fetching project:", err));
    }
  }, [id]);

  return (
    <nav className="text-gray-600 mb-4">
      <ul className="flex space-x-2">
        {/* Home Link */}
        <li>
          <Link to="/" className="hover:text-blue-500">Home</Link>
        </li>

        {pathSegments.map((segment, index) => {
          let url = `/${pathSegments.slice(0, index + 1).join("/")}`;
          let isProjectId = segment === id;
          let isLast = index === pathSegments.length - 1;
          let displayText = segment;

          // Replace project ID with project name
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

        {/* ✅ Add final "Add your podcast" text */}
        {pathSegments.length > 0 && (
          <li className="flex items-center">
            <span className="mx-2">/</span>
            <span className="text-gray-500 capitalize">Add your podcast</span>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Breadcrumb;
