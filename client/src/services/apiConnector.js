import axios from 'axios';

export const axiosInstance = axios.create({
  withCredentials: true,
});


export const apiConnector = (method, url, bodyData = null, headers = {}, params = null) => {
  console.log("Calling URL:", url);

  const token = localStorage.getItem("token");
  console.log("Token from localStorage:", token);

  const finalHeaders = { ...headers };
  if (token) {
    finalHeaders["Authorization"] = `Bearer ${token}`;
  }

  return axiosInstance({
    method,
    url,
    data: bodyData,
    headers: finalHeaders,
    params,
  });
};
