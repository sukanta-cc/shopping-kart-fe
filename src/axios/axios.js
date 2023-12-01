import Axios from "axios";

const axios = Axios.create({
	baseURL: process.env.REACT_APP_API_URL,
	headers: {
		"Content-Type": "application/json",
		Authorization: localStorage.getItem("token"),
	},
});

export default axios;
