import axios from "axios"
const URL = "http://localhost:300";
export const fetchRoomID = async() => {
try {
    const response = await axios.get(`${URL}/room-id`);
     const data = response.json();
     return data;
} catch (error) {
    console.log(error);
}
}