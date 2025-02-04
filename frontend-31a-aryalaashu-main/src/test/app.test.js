import axios from "axios";
import login_mock from "../mock/login_mock";
import signup_mock from "../mock/signup_mock";
import futsal_mock from "../mock/futsal_mock";
import notification_mock from "../mock/notification_mock";
import review_mocks from "../mock/review_mock";
import booking_mock from "../mock/booking_mock";
import create_review_mock from "../mock/create_review_mock";
import get_notification_mock from "../mock/get_notification_mock";
import get_booking_mock from "../mock/get_booking_mock";
import forget_password_mock from "../mock/forget_password_mock";

const baseURL = "http://localhost:5000";
describe("API Testing", () => {
  // register
  it("Register should work", async () => {
    const response = await axios.post(
      `${baseURL}/api/user/create`,
      signup_mock
    );
    expect(response.status).toEqual(201);
    expect(response.data.success).toEqual(true);
  });
  // login
  it("Forget Password Should Work", async () => {
    const response = await axios.post(`${baseURL}/api/user/forgetpassword`, forget_password_mock);
    expect(response.data.success).toEqual(true);
  });

  // forgetpassword
  it("", async () => {
    const response = await axios.post(`${baseURL}/api/user/login`, login_mock);
    expect(response.status).toEqual(201);
    expect(response.data.success).toEqual(true);
  });

  // notification
  it("Notification should work", async () => {
    const response = await axios.post(
      `${baseURL}/api/notification/createnotification`,
      notification_mock
    );
    expect(response.status).toEqual(200);
  });

  //   fetch all futsals and match each futsal name with the mock data
  it("Fetch all Futsal", async () => {
    const response = await axios.get(`${baseURL}/api/futsal/get_futsals`);
    // expect(response.status).toEqual(200)
    expect(response.data.futsals).toBeDefined();

    // matching each futsal name with the mock data

    response.data.futsals.forEach((individualFutsal, index) => {
      expect(individualFutsal.futsalName).toEqual(
        futsal_mock[index].futsalName
      );
    });
  });

  it("get all bookings", async () => {
    const response = await axios.get(
      `${baseURL}/api/booking/getbookingUserId/65dc1c6ecbca4fbf0350c41b`
    );
    // expect(response.status).toEqual(200)
    expect(response.data.bookings).toBeDefined();

    // matching each notifications

    response.data.bookings.forEach((individualBooking, index) => {
      expect(individualBooking.from).toEqual(
        get_booking_mock[index].from
      );
    });
  });


it("get user bookings", async () => {
  const response = await axios.get(
    `${baseURL}/api/notification/usernotification/65dc1c6ecbca4fbf0350c41b`
  );
  // expect(response.status).toEqual(200)
  expect(response.data.data.notifications).toBeDefined();

  // matching each notifications

  response.data.data.notifications.forEach((individualNotification, index) => {
    expect(individualNotification.title).toEqual(
      get_notification_mock[index].title
    );
  });
});
  it("getReview", async () => {
    const response = await axios.get(
      `${baseURL}/api/review/getreviews/65dc1c6ecbca4fbf0350c41b`
    );
    // expect(response.status).toEqual(200)
    expect(response.data.reviews).toBeDefined();
    // matching each rating with the mock data
    response.data.reviews.forEach((individualReviews, index) => {
      expect(individualReviews.rating).toEqual(review_mocks[index].rating);
    });
  });

  it("Booking should work", async () => {
    const response = await axios.post(
      `${baseURL}/api/booking/create_booking`,
      booking_mock
    );
    expect(response.status).toEqual(201);
    expect(response.data.success).toEqual(true);
  });

  it("Create Review should work", async () => {
    const response = await axios.post(
      `${baseURL}/api/review/create_review`,
      create_review_mock
    );
    expect(response.status).toEqual(200);
    expect(response.data.success).toEqual(true);
  });
});
