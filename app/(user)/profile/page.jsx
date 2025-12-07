"use client";
import { useState, useEffect } from "react";
import { User, Mail, Phone, MapPin, Edit2, Save, X } from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
  });
  const [editData, setEditData] = useState({ ...profile });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("YOUR_API_ENDPOINT/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setEditData(data);
      } else {
        // Mock data for demo
        const mockProfile = {
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+1 234 567 8900",
          address: "123 Main St, New York, NY 10001",
          bio: "Animal lover looking to adopt a furry friend",
        };
        setProfile(mockProfile);
        setEditData(mockProfile);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profile });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...profile });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("YOUR_API_ENDPOINT/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        setProfile(editData);
        setIsEditing(false);
        alert("Profile updated successfully");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("YOUR_API_ENDPOINT/profile", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        localStorage.removeItem("authToken");
        alert("Account deleted successfully");
        window.location.href = "/";
      } else {
        alert("Failed to delete account");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error deleting account");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-primaryBlue to-brand-lightBlue p-6 md:p-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-brand-primaryBlue" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {profile.name || "User Profile"}
                </h1>
                <p className="text-brand-softCream">
                  Manage your account information
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {!isEditing ? (
              // View Mode
              <div className="space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <p className="text-lg text-gray-800">{profile.name}</p>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <p className="text-lg text-gray-800">{profile.email}</p>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                    <Phone className="w-4 h-4" />
                    Phone
                  </label>
                  <p className="text-lg text-gray-800">{profile.phone}</p>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-2">
                    <MapPin className="w-4 h-4" />
                    Address
                  </label>
                  <p className="text-lg text-gray-800">{profile.address}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500 mb-2 block">
                    Bio
                  </label>
                  <p className="text-lg text-gray-800">{profile.bio}</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleEdit}
                    className="flex items-center gap-2 px-6 py-2.5 bg-brand-primaryBlue text-white rounded-xl hover:bg-opacity-90 transition-colors font-medium"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-6 py-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            ) : (
              // Edit Mode
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primaryBlue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primaryBlue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) =>
                      setEditData({ ...editData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primaryBlue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={editData.address}
                    onChange={(e) =>
                      setEditData({ ...editData, address: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primaryBlue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    rows="4"
                    value={editData.bio}
                    onChange={(e) =>
                      setEditData({ ...editData, bio: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primaryBlue"
                  ></textarea>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-2.5 bg-brand-primaryBlue text-white rounded-xl hover:bg-opacity-90 transition-colors font-medium disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
