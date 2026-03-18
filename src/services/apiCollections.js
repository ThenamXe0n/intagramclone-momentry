import { apiPaths } from "./apiPaths";
import axiosInstance from "./axiosInstance";

export const registerUserAPI = async (payload) => {
  try {
    //checkins : email check and username check before registration
    const isExist = await axiosInstance.get(
      `${apiPaths.USER}?email=${payload.email}`,
    ); //users?email=demo@gmail.com
    if (isExist?.data?.length > 0) {
      return alert(
        "User with this email already exists! Please login to continue.",
      );
    }

    const response = await axiosInstance.post(apiPaths.USER, payload);
    alert("Registration successful! Please login to continue.");
    return response.data;
  } catch (error) {
    console.log("Error in registerUserAPI", error);
    throw new Error(error);
  }
};

export const loginUserAPI = async (payload) => {
  try {
    const isExist = await axiosInstance.get(
      `${apiPaths.USER}?email=${payload.email}`,
    );
    if (isExist?.data?.length < 0) {
      return alert("no registered user found please register first");
    }
    //password matching
    if (isExist.data[0].password !== payload.password) {
      return alert("invalid credentials !");
    }

    localStorage.setItem("loginStatus", "momentryLoggedIn");
    localStorage.setItem("loggedInUser", JSON.stringify(isExist.data[0]));

    return {
      user: isExist.data[0],
      loginStatus: "momentryLoggedIn",
    };
  } catch (error) {
    console.log("Error in loginUserAPI", error);
    throw new Error(error);
  }
};

// =================posts ===============
export const uploadPostAPI = async (payload) => {
  try {
    const response = await axiosInstance.post(apiPaths.POST, payload);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
export const fetchAllPostAPI = async () => {
  try {
    const response = await axiosInstance.get(apiPaths.POST);
    const getAllUser = await axiosInstance.get(apiPaths.USER);
    console.log("posts", response.data);
    console.log("all users", getAllUser.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
export const fetchUserPostAPI = async (userid) => {
  try {
    const response = await axiosInstance.get(
      `${apiPaths.POST}?userId=${userid}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const likePostAPI = async (postId, likepayload) => {
  try {
    let response = await axiosInstance.patch(`${apiPaths.POST}/${postId}`, {
      likes: likepayload,
    });
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const sendNotificationAPI = async (notificationDetails) => {
  try {
    const response = await axiosInstance.post(
      apiPaths.NOTIFICATION,
      notificationDetails,
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchUserNotificationAPI= async(userId)=> {
  try {
    let response = await axiosInstance.get(
      `/notifications?receiverId=${userId}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}
export const fetchUserDetailsByIdAPI= async(userId)=> {
  try {
    let response = await axiosInstance.get(
      `/users/${userId}`,
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}



