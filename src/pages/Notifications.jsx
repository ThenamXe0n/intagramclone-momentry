import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserNotificationAsync } from "../features/notification/notificationSlice";

export default function Notifications() {
  const dispatch = useDispatch();
  const notifications= useSelector((state)=>state.notification.notificationList);
  const { id } = useSelector((state) => state.auth.loggedInUser);
  const { loading } = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(fetchUserNotificationAsync(id));
  }, [id]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Notifications</h1>
      {loading ? (
        <div className="h-full w-full flex items-center justify-center text-xl ">
          <span className="animate-pulse">Loading...</span>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notify, idx) => (
            <NotificationTile key={idx} notification={notify} />
          ))}
        </div>
      )}
    </div>
  );
}

export function NotificationTile({ notification }) {
  return (
    <div className="flex items-center gap-2 p-2">
      <div className="size-10 border rounded-full overflow-hidden">
        <img
          className="h-full w-full object-cover object-center"
          alt="username"
          src={
            notification?.sender?.avata ||
            "https://tse4.mm.bing.net/th/id/OIP.WVXZojicp7Yx59n4HJksvgHaHa?pid=Api&h=220&P=0"
          }
        />
      </div>
      <div className="space-x-2 flex-1">
        <strong>{notification?.sender?.username}</strong>
        <span>{notification?.message}</span> •{" "}
        <span>{moment(notification?.createdAt, "YYYYMMDD").fromNow()}</span>
      </div>
      <div className="w-fit">
        {notification?.type === "follow" && (
          <button className="bg-blue-600 text-white px-2 py-1 rounded-md shadow-md shadow-gray-600">
            Follow
          </button>
        )}
        {notification?.type === "post" && (
          <div className="size-16">
            <img
              alt="post"
              className="h-full w-full object-cover"
              src={notification.postdetails.image}
            />
          </div>
        )}
      </div>
    </div>
  );
}
