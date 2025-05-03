import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,

  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// make seperate header for authorization
const token = localStorage.getItem("token");

const config = {
  headers: {
    authorization: `Bearer ${token}`,
  },
};

export const testApi = () => Api.get("/test");

// "http://localhost:5000/test"(backend route)
// create user api

export const createUserApi = (data) => Api.post("api/user/create", data);
export const loginUserApi = (data) => Api.post("api/user/login", data);
export const updateUserApi = (id, data) =>
  Api.put(`/api/user/update_user/${id}`, data);
export const getSingleUserApi = (id) => Api.get(`/api/user/get_user/${id}`);
export const forgetPasswordAPI = (data) =>
  Api.post("/api/user/forgetpassword", data);

// Create product API
export const createFutsalApi = (data) =>
  Api.post("/api/futsal/create_futsal", data, config);

// get all products
export const getAllFutsalsApi = () => Api.get("/api/futsal/get_futsals");

// get single product api

export const getFutsalUserIdApi = (id) =>
  Api.get(`/api/futsal/getfutsalbyUser/${id}`);

export const getSingleFutsalApi = (id) =>
  Api.get(`/api/futsal/get_futsals/${id}`);

// update product API with ID
export const updateFutsalAPI = (id, formData) =>
  Api.put(`/api/futsal/update_futsal/${id}`, formData, config);

// delete product with id
export const deleteFutsalAPI = (id) =>
  Api.delete(`/api/futsal/delete_futsal/${id}`, config);
// get booking by user id
export const getUserFutsalBookingApi = (userId) =>
  Api.get(`api/booking/getbookingUserId/${userId}`);
export const getBookingbyfutsalid = (id) =>
  Api.get(`api/booking/getbookingbyfutsalid/${id}`);

// create booking api
export const createBookingApi = (data) =>
  Api.post("/api/booking/create_booking", data);

// get all booking api

export const getAllBookingApi = () => Api.get("/api/booking/get_allbooking");

// for approve and reject booking
export const approveBookingApi = (bookingId) =>
  Api.put(`/api/booking/approve_booking/${bookingId}`, {}, config);

export const deleteBookingAPi = (id) =>
  Api.delete(`/api/booking/delete_booking/${id}`);

export const rejectBookingApi = (bookingId) =>
  Api.put(`/api/booking/reject_booking/${bookingId}`, {}, config);

export const updateBookingApi = (id, data) =>
  Api.put(`/api/booking//update_booking/${id}`, data);
export const getAvailableTimeSlotsApi = (id, date) =>
  Api.get(`/api/booking/getbookedslot/${id}/${date}`);
export const getSingleBookingApi = (id) =>
  Api.get(`/api/booking/get_singlebooking/${id}`);

// notificaton apis
export const createNotitificationAPI = (data) =>
  Api.post("/api/notification/createnotification", data, config);
export const getNotitificationAPI = (id) =>
  Api.get(`/api/notification/get_notification/${id}`);
export const updateNotitificationAPI = (id, formData) =>
  Api.put(`/api/notification/update_notification/${id}`, formData, config);
export const getSingleNotificationAPI = (id) =>
  Api.get(`/api/notification/getsinglenotification/${id}`);
export const getUserNotificaitonAPI = (userId) =>
  Api.get(`/api/notification/usernotification/${userId}`);
export const deleteNotificationAPI = (id) =>
  Api.delete(`/api/notification/delete_notification/${id}`, config);

// review apis
export const createReviewApi = (data) =>
  Api.post("api/review/create_review", data);
export const getReviewsByFutsalIdApi = (futsalId) =>
  Api.get(`api/review/getreviews/${futsalId}`);
export const deleteReviewApi = (reviewId) =>
  Api.delete(`api/review/deletereview/${reviewId}`);
export const getAvgRatingApi = (futsalId) =>
  Api.get(`api/review//averageRating/${futsalId}`);
