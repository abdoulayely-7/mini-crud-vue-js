import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

export const createUser = async (payload) => {
    return await axios.post(API_URL, payload);
};

export const getAllUsers = async () => {
    return await axios.get(API_URL);
};