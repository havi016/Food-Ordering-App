import axios from "axios";

const API_URL = "http://192.168.1.77:3000/users";

export const getAllUsers = async (token) => {
    return axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updateUser = async (id, token, data) => {
    return axios.put(`${API_URL}/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const deleteUser = async (id, token) => {
    return axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

