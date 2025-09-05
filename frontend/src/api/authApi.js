import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.1.76:3000/users";

export const signUp = async (name, email, password) => {
    return axios.post(`${API_URL}/sign-up`, { name, email, password });
};

export const signIn = async (email, password) => {
    return axios.post(`${API_URL}/sign-in`, { email, password });
};

export const getCurrentUser = async () => {
    const token = await AsyncStorage.getItem("token");

    const { data } = await axios.get(`${API_URL}/current-user`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data.user;
};