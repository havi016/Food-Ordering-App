import axios from "axios";
import {getCustomisationById} from "@/backend/controller/customisations-controller";

const API_URL = "http://192.168.1.76:3000/menus";
const categoryUrl = "http://192.168.1.76:3000/categories";
const customisationUrl = "http://192.168.1.76:3000/customisations";

// Get all menus
export const getAllMenus = async () => {
    try {
        const { data } = await axios.get(`${API_URL}/`);
        return data;
    } catch (error) {
        console.error("Error fetching all menus:", error.message);
        return [];
    }
};

// Get menu by ID
export const getMenuById = async (id) => {
    try {
        const { data } = await axios.get(`${API_URL}/${id}`);
        return data;
    } catch (error) {
        console.error(`Error fetching menu with id ${id}:`, error.message);
        return null;
    }
};

// Get menus by category
export const getMenusByCategory = async (name) => {
    try {
        const { data } = await axios.get(`${API_URL}/category/${name}`);
        return data;
    } catch (error) {
        console.error(`Error fetching menus for category ${name}:`, error.message);
        return [];
    }
};

// Get menus sorted by rating
export const getMenusSortedByRating = async () => {
    try {
        const { data } = await axios.get(`${API_URL}/sorted/by-rating`);
        return data;
    } catch (error) {
        console.error("Error fetching menus sorted by rating:", error.message);
        return [];
    }
};

// Search menus
export const searchMenus = async (query) => {
    try {
        const { data } = await axios.get(`${API_URL}/search`, {
            params: { query },
        });
        return data;
    } catch (error) {
        console.error(`Error searching menus with query "${query}":`, error.message);
        return [];
    }
};

export const getAllCategories = async () => {
    try{
        const { data } = await axios.get(`${categoryUrl}`);
        return data;
    }catch(error){
        console.error(`Error fetching all categories for ${error.message}`);
        return [];
    }

}


