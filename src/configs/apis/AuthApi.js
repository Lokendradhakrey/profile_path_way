import ApiClient from "./ApiClient";

export const loginApi = (username, password) => {
  return ApiClient.post("/profile-path-way/v1/auth/login", {
    username,
    password,
  });
};

export const signupApi = (fullName, username, email, password) => {
  return ApiClient.post("/profile-path-way/v1/auth/signup", {
    fullName,
    username,
    email,
    password,
  });
};
