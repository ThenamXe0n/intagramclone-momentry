import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchNotification() {
      let { data } = await axiosInstance.get("/notifications");
      setNotifications(data);
    }
    fetchNotification();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Notifications</h1>
      <div className="space-y-3">
        {notifications.map((notify, idx) => (
          <NotificationTile key={idx} notification={notify} />
        ))}
      </div>
    </div>
  );
}

export function NotificationTile({notification}) {
  return (
    <div className="flex items-center gap-2 p-2">
      <div className="size-10 border rounded-full overflow-hidden">
        <img
          className="h-full w-full object-cover object-center"
          alt="username"
          src={notification?.sender?.avatar}
        />
      </div>
      <div className="space-x-2 flex-1">
        <strong>{notification?.sender?.username}</strong>
        <span>{notification?.message}</span> • <span>{moment(notification?.createdAt).format()}</span>
      </div>
      <div className="w-fit">
        {notification?.type === "follow" && (
          <button className="bg-blue-600 text-white px-2 py-1 rounded-md shadow-md shadow-gray-600">
            Follow
          </button>
        )}
        {notification?.type === "post" && (
          <div className="size-12 border">
            <img alt="post" src={notification.postdetails.image} />
          </div>
        )}
      </div>
    </div>
  );
}
