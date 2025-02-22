export function UploadOptionCard({ title, description, icon, onClick }) {
    return (
      <div
        onClick={onClick}
        className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer flex justify-between items-start"
      >
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>
        <div className="mr-4">{icon}</div>
      </div>
    );
  }