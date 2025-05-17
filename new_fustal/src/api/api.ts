import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Make separate header for authorization
const token = localStorage.getItem("token");

const config = {
  headers: {
    authorization: `Bearer ${token}`,
  },
};

// Test API
export const testApi = () => Api.get("/test");

// User APIs
export const createUserApi = (data: any) => Api.post("/api/user/create", data);
export const loginUserApi = (data: any) => Api.post("/api/user/login", data);
export const updateUserApi = (id: string, data: any) =>
  Api.put(`/api/user/update_user/${id}`, data);
export const getSingleUserApi = (id: string) =>
  Api.get(`/api/user/get_user/${id}`);
export const forgetPasswordAPI = (data: any) =>
  Api.post("/api/user/forgetpassword", data);

// Futsal APIs
export const createFutsalApi = (data: any) =>
  Api.post("/api/futsal/create_futsal", data, config);
export const getAllFutsalsApi = () => Api.get("/api/futsal/get_futsals");
export const getFutsalUserIdApi = (id: string) =>
  Api.get(`/api/futsal/getfutsalbyUser/${id}`);
export const getSingleFutsalApi = (id: string) =>
  Api.get(`/api/futsal/get_futsals/${id}`);
export const updateFutsalAPI = (id: string, formData: any) =>
  Api.put(`/api/futsal/update_futsal/${id}`, formData, config);
export const deleteFutsalAPI = (id: string) =>
  Api.delete(`/api/futsal/delete_futsal/${id}`, config);

// Booking APIs
export const getUserFutsalBookingApi = (userId: string) =>
  Api.get(`/api/booking/getbookingUserId/${userId}`);
export const getBookingbyfutsalid = (id: string) =>
  Api.get(`/api/booking/getbookingbyfutsalid/${id}`);
export const createBookingApi = (data: any) =>
  Api.post("/api/booking/create_booking", data);
export const getAllBookingApi = () => Api.get("/api/booking/get_allbooking");
export const approveBookingApi = (bookingId: string) =>
  Api.put(`/api/booking/approve_booking/${bookingId}`, {}, config);
export const rejectBookingApi = (bookingId: string) =>
  Api.put(`/api/booking/reject_booking/${bookingId}`, {}, config);
export const deleteBookingAPi = (id: string) =>
  Api.delete(`/api/booking/delete_booking/${id}`);
export const updateBookingApi = (id: string, data: any) =>
  Api.put(`/api/booking/update_booking/${id}`, data);
export const getAvailableTimeSlotsApi = (id: string, date: string) =>
  Api.get(`/api/booking/getbookedslot/${id}/${date}`);
export const getSingleBookingApi = (id: string) =>
  Api.get(`/api/booking/get_singlebooking/${id}`);

// Notification APIs
export const createNotitificationAPI = (data: any) =>
  Api.post("/api/notification/createnotification", data, config);
export const getNotitificationAPI = (id:any) =>
  Api.get(`/api/notification/get_notification/${id}`);
export const updateNotitificationAPI = (id: string, formData: any) =>
  Api.put(`/api/notification/update_notification/${id}`, formData, config);
export const getSingleNotificationAPI = (id: string) =>
  Api.get(`/api/notification/getsinglenotification/${id}`);
export const getUserNotificaitonAPI = (userId: string) =>
  Api.get(`/api/notification/usernotification/${userId}`);
export const deleteNotificationAPI = (id: string) =>
  Api.delete(`/api/notification/delete_notification/${id}`, config);

// Review APIs
export const createReviewApi = (data: any) =>
  Api.post("/api/review/create_review", data);
export const getReviewsByFutsalIdApi = (futsalId: string) =>
  Api.get(`/api/review/getreviews/${futsalId}`);
export const deleteReviewApi = (reviewId: string) =>
  Api.delete(`/api/review/deletereview/${reviewId}`);
export const getAvgRatingApi = (futsalId: string) =>
  Api.get(`/api/review/averageRating/${futsalId}`);
