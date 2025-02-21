import { RegisterFormData } from "./pages/Register";
// import {HotelType} from "../../backend/src/models/hotel"
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''
export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    const responseBody = await response.json();

    if (!response.ok) {
        console.error("Error", responseBody);
        
        // Ensure the error message is a string
        const errorMessage = responseBody.message 
            ? Array.isArray(responseBody.message) 
                ? responseBody.message.map(msg => msg.msg).join(", ") // Join array of messages
                : responseBody.message
            : "An unknown error occurred";

        throw new Error(errorMessage);
    }
    
    console.log("Data", formData);
};

