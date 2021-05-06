import { userAxios } from "./AuthService";

export const getProfile = (id) => {
  return userAxios
    .get(`/user/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};

export const updateProfile = (id, newInput) => {
  return userAxios
    .put(`/user/${id}`, newInput)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
export const deleteUser = (id) => {
  return userAxios
    .delete(`/user/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response.data;
    });
};
