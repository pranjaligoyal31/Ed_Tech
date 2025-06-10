import axios from 'axios';

export const axiosInstance = axios.create({});

export const apiConnector = (method, url, bodyData = null, headers = {}, params = null) => {
  console.log("Calling URL:", url);

  const token = localStorage.getItem("token");
  console.log(token)

  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData,
    headers: {
      ...headers,
      Authorization: headers.Authorization ?? (token ? `Bearer ${token}` : ''),
    },
    params: params,
  });
};