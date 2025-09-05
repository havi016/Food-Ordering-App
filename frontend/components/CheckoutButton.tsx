import {View, Text, TouchableOpacity, ActivityIndicator, Alert} from 'react-native'
import React, {useState} from 'react'
import {CartCustomization, CheckoutButtonProps, CustomButtonProps} from "@/type";
import cn from "clsx";
import {createPaymentIntents, createOrder} from "@/src/api/paymentIntentApi";
import { useStripe, initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native';
import useAuthStore from "@/store/auth.store";
import {useCartStore} from "@/store/cart.store";



const CheckoutButton = ({
                            totalPrice,
                            style,
                            textStyle,
                            leftIcon,
                            isLoading = false
                      } :   CheckoutButtonProps) => {

    const handleCreateOrder = async (paymentIntentId: string, totalPrice: number) => {
        const { user } = useAuthStore.getState();  // access Zustand store directly
        const { items } = useCartStore.getState();

        if (!user?._id) {
            console.error("No user logged in");
            return;
        }

        const orderItems = items.map((item) => ({
            productId: item._id,  // backend expects productId
            quantity: item.quantity,
            customizations: item.customisations?.map((c :CartCustomization) => c.name) || [],
        }));

        const orderData = {
            userId: user._id,
            items: orderItems,
            total: totalPrice,
            paymentIntentId,
        };

        try {
            const createdOrder = await createOrder(orderData);
            console.log("Order created:", createdOrder);
        } catch (err) {
            console.error("Failed to create order:", err);
        }
    };

    const { initPaymentSheet, presentPaymentSheet } = useStripe();

    const onCheckout = async (totalPrice: number) => {
        // 1. Create a payment intent
        try{

            const amountInPence = Math.floor(totalPrice * 100);
            const response = await createPaymentIntents(amountInPence);

            if (!response){
                Alert.alert("Error checking out");
                return;
            }


            // 2. Initialize the Payment sheet

            const initResponse = await initPaymentSheet({
                paymentIntentClientSecret: response.paymentIntent,
                merchantDisplayName: "Checkout"
            });
            if (initResponse.error){
                console.error(initResponse.error);
                Alert.alert("Error when initialising response");
            }

            // 3. Present the Payment Sheet from Stripe
            const paymentResponse = await presentPaymentSheet();


            if (!paymentResponse.error) {
                await handleCreateOrder(response.paymentIntent, totalPrice);
                Alert.alert("Payment successful", "Your order has been placed");
            }

        }catch(err){
            console.error('Failed to get checkout:', err);
        }

    };




    return (
            <TouchableOpacity className={cn("custom-btn", style)} onPress={() => onCheckout(Number(totalPrice))}>
                {leftIcon}
                <View className={"flex-center flex-row"}>
                    {isLoading ? (
                        <ActivityIndicator size={ "small"} color = "white"/>
                    ): (
                        <Text className={cn( 'text-white-100 paragraph-semibold' , textStyle)}>
                            Checkout £{ totalPrice }
                        </Text>
                    )}
                </View>
            </TouchableOpacity>

    )
}
export default CheckoutButton
