import React from "react";

export default function BlockedRoutesPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Routes Blocked</h1>
        <p className="text-gray-700 mb-2">Access to this site has been temporarily restricted.</p>
        <p className="text-gray-500 mb-6">Please contact your admin or web developer for further assistance.</p>
        <div className="flex flex-col gap-2">
          <a
            href="mailto:admin@example.com"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Contact Admin
          </a>
        </div>
      </div>
    </div>
  );
}
