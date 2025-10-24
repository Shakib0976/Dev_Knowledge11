import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { FaEdit, FaUpload, FaUser, FaEnvelope, FaTrophy, FaTags, FaChartLine } from "react-icons/fa";
import toast from "react-hot-toast";
import { User } from "lucide-react";

const ProfileCard = () => {
    const { user, updateUser, setUser } = useContext(AuthContext);
    const [articles, setArticles] = useState([]);
    const [newName, setNewName] = useState("");
    const [newPhotoFile, setNewPhotoFile] = useState(null);
    const [updating, setUpdating] = useState(false);
    const [loading, setLoading] = useState(false);

    // Environment variable for API key (recommended for security)
    const imgbbApiKey =  "472a4f35f88299fe3e3320a210542e39";

    useEffect(() => {
        if (!user?.email) return;

        const fetchUserArticles = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3000/allTask/email/${user.email}`);
                if (!response.ok) throw new Error('Failed to fetch articles');
                const result = await response.json();
                setArticles(result);
            } catch (error) {
                console.error("Error fetching articles:", error);
                toast.error("Failed to load user articles");
            } finally {
                setLoading(false);
            }
        };

        fetchUserArticles();
    }, [user]);

    const uploadImageToImgBB = async (imageFile) => {
        if (!imageFile) return null;

        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            const response = await fetch(
                `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (!response.ok) throw new Error('Upload failed');

            const data = await response.json();

            if (data.success) {
                return data.data.url;
            } else {
                throw new Error(data.error?.message || "Image upload failed");
            }
        } catch (error) {
            console.error("Image upload error:", error);
            throw new Error("Failed to upload image. Please try again.");
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        if (!newName.trim() && !newPhotoFile) {
            toast.error("Please enter a new name or select a photo");
            return;
        }

        setUpdating(true);

        try {
            let photoURL = user.photoURL;

            if (newPhotoFile) {
                photoURL = await uploadImageToImgBB(newPhotoFile);
            }

            const updatedUserData = {
                displayName: newName.trim() || user.displayName,
                photoURL: photoURL,
            };

            await updateUser(updatedUserData);

            setUser({
                ...user,
                ...updatedUserData,
            });

            toast.success("Profile updated successfully!");
            setNewName("");
            setNewPhotoFile(null);

            // Clear file input
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput) fileInput.value = '';

        } catch (error) {
            console.error("Profile update error:", error);
            toast.error(error.message || "Failed to update profile");
        } finally {
            setUpdating(false);
        }
    };

    const ProfileStatItem = ({ icon: Icon, label, value, className = "" }) => (
        <div className={`flex justify-between items-center py-3 ${className}`}>
            <div className="flex items-center gap-3">
                <Icon className="text-gray-400 text-lg" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">{label}</span>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">{value}</span>
        </div>
    );

    return (
        <div className="min-h-screen  py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Main Profile Section */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                {/* Profile Image */}
                                <div className="relative">
                                    {user?.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt="Profile"
                                            className="w-32 h-32 rounded-full border-4 border-gray-100 dark:border-gray-700 object-cover shadow-md"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                            <User className="text-6xl text-gray-400" />
                                        </div>
                                    )}
                                    <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 shadow-lg">
                                        <FaUser className="text-white text-sm" />
                                    </div>
                                </div>

                                {/* User Info */}
                                <div className="flex-1 text-center md:text-left">
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {user?.displayName || "Anonymous User"}
                                    </h1>
                                    <p className="text-green-600 font-medium mb-2">Professional User</p>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                                        Passionate about music collaboration and creative projects
                                    </p>
                                </div>
                            </div>

                            {/* Update Form */}
                            <form onSubmit={handleUpdateProfile} className="mt-8 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Update Username
                                        </label>
                                        <div className="relative">
                                            <FaEdit className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="text"
                                                value={newName}
                                                onChange={(e) => setNewName(e.target.value)}
                                                placeholder="Enter new display name"
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            Profile Image
                                        </label>
                                        <div className="relative">
                                            <FaUpload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setNewPhotoFile(e.target.files[0])}
                                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={updating}
                                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                                >
                                    {updating ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Updating Profile...
                                        </span>
                                    ) : (
                                        "Update Profile"
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Stats Sidebar */}
                    <div className="space-y-6">
                        {/* Profile Stats */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <FaChartLine className="text-green-600" />
                                Profile Statistics
                            </h3>

                            <div className="space-y-1">
                                <ProfileStatItem
                                    icon={FaUser}
                                    label="Role"
                                    value="Professional User"
                                />
                                <ProfileStatItem
                                    icon={FaChartLine}
                                    label="Experience Level"
                                    value="Intermediate"
                                />
                                <ProfileStatItem
                                    icon={FaEdit}
                                    label="Shared Artists"
                                    value={loading ? "..." : articles.length || 0}
                                />
                                <ProfileStatItem
                                    icon={FaEnvelope}
                                    label="Email"
                                    value={user?.email || "Not provided"}
                                    className="border-t border-gray-200 dark:border-gray-700"
                                />
                            </div>
                        </div>

                        {/* Status & Badges */}
                        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                Status & Achievements
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                    <span className="text-green-800 dark:text-green-300 font-medium">
                                        Availability
                                    </span>
                                    <span className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                        <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                                        Available for Collaboration
                                    </span>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                    <span className="text-yellow-800 dark:text-yellow-300 font-medium flex items-center gap-2">
                                        <FaTrophy />
                                        Badges
                                    </span>
                                    <span className="text-yellow-700 dark:text-yellow-300 text-sm font-medium">
                                        🏆 Top Collaborator
                                    </span>
                                </div>

                                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaTags className="text-blue-500" />
                                        <span className="text-blue-800 dark:text-blue-300 font-medium">
                                            Specializations
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {["#Drill", "#Melancholic", "#Rap-US", "#Producer", "#Songwriter"].map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;