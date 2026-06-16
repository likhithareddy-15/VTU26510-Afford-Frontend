import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getDoctors = () =>
  axios.get(`${API_URL}/doctors`);

export const getAppointments = () =>
  axios.get(`${API_URL}/appointments`);

export const createAppointment = (data) =>
  axios.post(`${API_URL}/appointments`, data);
