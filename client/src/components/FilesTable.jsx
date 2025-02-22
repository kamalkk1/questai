export function FilesTable({ files, onView, onDelete }) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Your Files</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-4 rounded-l-lg">No.</th>
                <th className="p-4">Name</th>
                <th className="p-4">Upload Date & Time</th>
                <th className="p-4 rounded-r-lg">Action</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file, index) => {
                const validDate = file.updatedAt ? new Date(file.updatedAt) : null;
  
                return (
                  <tr key={file.id} className="border-b last:border-b-0">
                    <td className="p-4">{index + 1}</td> {/* ✅ Row number */}
                    <td className="p-4">{file.name}</td>
                    <td className="p-4">
                      {validDate
                        ? `${validDate.toLocaleDateString()} | ${validDate.toLocaleTimeString()}`
                        : "N/A"} {/* ✅ Fix invalid date */}
                    </td>
                    <td className="p-4">
                      <button
                        className="text-blue-500 hover:underline mr-2"
                        onClick={() => onView(file.id)}
                      >
                        View
                      </button>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => onDelete(file.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  