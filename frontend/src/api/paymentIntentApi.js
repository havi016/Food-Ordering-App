import axios from 'axios';

const intents_Url = "http://192.168.1.76:3000/payments/intents";
const orders_Url = "http://192.168.1.76:3000/orders/create-order";

export const createPaymentIntents = async (amount) => {
    try {
        const response = await axios.post(intents_Url, { amount }, {
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Request failed:", error.response?.data || error.message);
    }
}

export const createOrder = async (orderData) => {
    try {
        const response = await axios.post(orders_Url, orderData, {
            headers: { 'Content-Type': 'application/json' }
        });
        console.log("Order created:", response.data);
        return response.data;
    } catch (error) {
        console.error("Failed to create order:", error.response?.data || error.message);
        throw error;
    }
};
