import ApiClient from "./ApiClient";

export const loginApi = (username, password) => {
  return ApiClient.post("/profile-path-way/v1/auth/login", { username, password });
};

export const signupApi = (email, password, fullname, username) => {
  return ApiClient.post("/profile-path-way/v1/auth/register", {
    username,
    fullname,
    email,
    password,
  });
};
