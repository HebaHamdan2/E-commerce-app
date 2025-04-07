import { Link } from "react-router-dom";
import UseUser from "../../hooks/useUser";
import { useEffect, useState } from "react";

const UserAccount = () => {
  const { getUserInfo, userInfo, updateInfo, updatePassword } = UseUser();

  const [activeTab, setActiveTab] = useState<"info" | "password">("info");

  const [formData, setFormData] = useState({
    userName: "",
    address: "",
    phone: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    cPassword: "",
  });

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateInfo(
      formData.phone,
      formData.address,
      "",
      formData.userName
    );
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updatePassword(
      passwordData.oldPassword,
      passwordData.newPassword,
      passwordData.cPassword
    );
  };

  return (
    <>
      <div className="flex justify-between mt-20 mb-20 text-sm">
        <div className="flex text-sm">
          <Link to="/" className="text-primaryText opacity-50">
            Home /
          </Link>
          <span className="ml-1 cursor-pointer">My Account</span>
        </div>
        <div>
          <span className="text-sm">Welcome!</span>
          <span className="text-primary text-sm"> {userInfo?.userName}</span>
        </div>
      </div>

      <div className="grid">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div
            onClick={() => setActiveTab("info")}
            className={`p-4 cursor-pointer border-b-2 ${
              activeTab === "info" ? "border-primary text-primary font-semibold" : "border-gray-300"
            }`}
          >
            Edit Info
          </div>
          <div
            onClick={() => setActiveTab("password")}
            className={`p-4 cursor-pointer border-b-2 ${
              activeTab === "password" ? "border-primary text-primary font-semibold" : "border-gray-300"
            }`}
          >
            Change Password
          </div>
        </div>

        {activeTab === "info" && (
          <div className="text-left">
            <h2 className="text-primary font-medium text-xl mb-6">Edit Your Profile Information</h2>
            <form onSubmit={handleInfoSubmit}>
              <div className="flex flex-col mb-4">
                <label htmlFor="userName" className="mb-2">Name</label>
                <input
                  className="bg-[#F5F5F5] p-2"
                  type="text"
                  id="userName"
                  value={formData.userName}
                  onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                  placeholder={userInfo?.userName}
                  name="userName"
                />
              </div>
              <div className="flex flex-col mb-4">
                <label htmlFor="address" className="mb-2">Address</label>
                <input
                  className="bg-[#F5F5F5] p-2"
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder={userInfo?.address}
                  name="address"
                />
              </div>
              <div className="flex flex-col mb-6">
                <label htmlFor="phone" className="mb-2">Phone</label>
                <input
                  className="bg-[#F5F5F5] p-2"
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={userInfo?.phone}
                  name="phone"
                />
              </div>
              <button
                type="submit"
                className="bg-primary rounded font-medium text-base px-12 py-4 text-white"
              >
                Update Information
              </button>
            </form>
          </div>
        )}

        {activeTab === "password" && (
          <div className="text-left">
            <h2 className="text-primary font-medium text-xl mb-6">Edit Your Profile Password</h2>
            <form onSubmit={handlePasswordSubmit}>
              <div className="flex flex-col mb-4">
                <input
                  className="bg-[#F5F5F5] p-2"
                  placeholder="Current Password"
                  type="password"
                  id="oldPassword"
                  name="oldPassword"
                  value={passwordData.oldPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                />
              </div>
              <div className="flex flex-col mb-4">
                <input
                  className="bg-[#F5F5F5] p-2"
                  type="password"
                  id="newPassword"
                  placeholder="New Password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                />
              </div>
              <div className="flex flex-col mb-6">
                <input
                  className="bg-[#F5F5F5] p-2"
                  type="password"
                  id="cPassword"
                  placeholder="Confirm New Password"
                  name="cPassword"
                  value={passwordData.cPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, cPassword: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="bg-primary rounded font-medium text-base px-12 py-4 text-white"
              >
                Update Password
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default UserAccount;
