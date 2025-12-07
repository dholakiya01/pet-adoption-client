'use client'
import { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, Eye, Trash2 } from 'lucide-react';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('YOUR_API_ENDPOINT/applications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setApplications(data);
      } else {
        // Mock data for demo
        setApplications([
          {
            id: 1,
            petId: 1,
            petName: "Max",
            petImage: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=200&h=200&fit=crop",
            status: "pending",
            appliedDate: "2024-12-01",
            message: "I would love to adopt Max"
          },
          {
            id: 2,
            petId: 2,
            petName: "Luna",
            petImage: "https://images.unsplash.com/photo-1573865526739-10c1d3a1f0cc?w=200&h=200&fit=crop",
            status: "approved",
            appliedDate: "2024-11-28",
            message: "Looking for a calm cat"
          },
          {
            id: 3,
            petId: 3,
            petName: "Charlie",
            petImage: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop",
            status: "rejected",
            appliedDate: "2024-11-25",
            message: "Need a friendly dog"
          }
        ]);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this application?')) return;

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`YOUR_API_ENDPOINT/applications/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setApplications(applications.filter(app => app.id !== id));
        alert('Application deleted successfully');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error deleting application');
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
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
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">My Applications</h1>

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center">
            <p className="text-gray-600 text-lg">No applications yet</p>
            <button 
              onClick={() => window.location.href = '/pets'}
              className="mt-4 bg-brand-primaryBlue text-white px-6 py-2.5 rounded-xl hover:bg-opacity-90 transition-colors"
            >
              Browse Pets
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <div key={app.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
                <div className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Pet Image */}
                    <img 
                      src={app.petImage} 
                      alt={app.petName}
                      className="w-full md:w-32 h-32 object-cover rounded-xl"
                    />

                    {/* Application Info */}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{app.petName}</h3>
                          <p className="text-sm text-gray-500">Applied on {app.appliedDate}</p>
                        </div>
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(app.status)} w-fit`}>
                          {getStatusIcon(app.status)}
                          <span className="capitalize">{app.status}</span>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4">{app.message}</p>

                      {/* Actions */}
                      <div className="flex gap-2 flex-wrap">
                        <button 
                          onClick={() => window.location.href = `/pets/${app.petId}`}
                          className="flex items-center gap-2 px-4 py-2 bg-brand-lightBlue text-brand-primaryBlue rounded-lg hover:bg-opacity-80 transition-colors text-sm font-medium"
                        >
                          <Eye className="w-4 h-4" />
                          View Pet
                        </button>
                        <button 
                          onClick={() => handleDelete(app.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
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