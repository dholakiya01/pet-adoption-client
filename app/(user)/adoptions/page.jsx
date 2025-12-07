"use client";
import { useState, useEffect } from "react";
import { Clock, CheckCircle, XCircle, Eye, Trash2 } from "lucide-react";
import {
  getallApplication,
  getmyApplication,
} from "@/services/adoption.service";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function ApplicationsPage() {
  const router = useRouter();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await getmyApplication();
      if (response.status === 200) {
        setApplications(response.data.data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primaryBlue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
          My Applications
        </h1>

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <p className="text-gray-600 text-lg">No applications yet</p>
            <button
              onClick={() => router.push('/pets')}
              className="mt-4 bg-brand-primaryBlue text-white px-6 py-2.5 rounded-xl hover:bg-opacity-90 transition-colors"
            >
              Browse Pets
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all"
              >
                {console.log(app, "appppppp.........")}
                <div className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Pet Image */}
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_PORT}${app?.iPetId?.image}`}
                      alt={app?.iPetId?.vName}
                      className="w-full md:w-32 h-32 object-cover rounded-xl"
                    />

                    {/* Application Info */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {app?.iPetId?.vName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Applied on {app?.iRequestedAt}
                          </p>
                        </div>
                        <div
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                            app?.vStatus
                          )} w-fit`}
                        >
                          {getStatusIcon(app?.vStatus)}
                          <span className="capitalize">{app?.vStatus}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{app?.vMessage}</p>

                      {/* Actions */}
                      <div className="flex gap-2 flex-wrap">
                        <button
                          className="flex items-center gap-2 px-4 py-2 bg-brand-lightBlue text-brand-primaryBlue rounded-lg hover:bg-opacity-80 transition-colors text-sm font-medium"
                        >
                          <Eye className="w-4 h-4" />
                          View Pet
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
