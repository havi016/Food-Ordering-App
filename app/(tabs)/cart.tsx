import {View, Text, SafeAreaView, FlatList} from 'react-native'
import React from 'react'
import {useCartStore} from "@/store/cart.store";
import CustomHeader from "@/components/CustomHeader";
import cn from "clsx";
import CustomButton from "@/components/CustomButton";
import {PaymentInfoStripeProps, CartCustomization} from "@/type";
import CartItem from "../../components/CartItem";

const PaymentInfoStripe = ({ label,  value,  labelStyle,  valueStyle, }: PaymentInfoStripeProps) => (
    <View className="flex-between flex-row my-1">
        <Text className={cn("paragraph-medium text-gray-200", labelStyle)}>
            {label}
        </Text>
        <Text className={cn("paragraph-bold text-dark-100", valueStyle)}>
            {value}
        </Text>
    </View>
);

const Cart = () => {
    const { items, getTotalItems, getTotalPrice} = useCartStore();

    const totalItems = getTotalItems()
    const totalPrice = getTotalPrice()
    console.log(totalPrice)


    return (
        <SafeAreaView className="bg-white h-full">
            <FlatList
            data={items}
            renderItem={ ({item }) => <CartItem item = {item}/>}
            keyExtractor={(item, index) => {
                const customizationIds = item.customizations?.map((c: CartCustomization) => c._id).join("-") || "none";
                return `${item._id}-${customizationIds}-${index}`;
            }}
            contentContainerClassName ="pb-28 px-5 pt-5"
            ListHeaderComponent = {() => <CustomHeader title = "Your Cart" />}
            ListEmptyComponent={() => (
                <View className="flex-1 justify-center items-center py-20">
                    <Text className="text-gray-400 text-lg font-medium">
                        Cart is empty
                    </Text>
                </View>
            )}
            ListFooterComponent = {() => totalItems > 0 && (
                <View className = "gap-5">
                    <View className="mt-6 border border-gray-500 p-5 rounded-2xl">
                        <Text className={"h3-bold text-dark-100 mb-5"}>
                            Payment Summary
                        </Text>

                        <PaymentInfoStripe
                            label = {`Total Items (${totalItems})`}
                            value = {`${totalPrice.toFixed(2)}`}
                        />
                        <PaymentInfoStripe
                            label = {`Delivery Fee `}
                            value = {"£5"}
                        />
                        <PaymentInfoStripe
                            label = {`Discount`}
                            value = {`-£0.50`}
                            valueStyle = {"!text-success"}
                        />
                        <View className={"border-t border-gray-200 my-2"}/>
                        <PaymentInfoStripe
                            label = {`Total`}
                            value = {`£${(totalPrice + 5 - 0.5).toFixed(2)}`}
                            labelStyle = {"base-bold !text-dark-100"}
                            valueStyle={"base-bold !text-dark-100 !text-right"}
                        />
                    </View>

                    <CustomButton title = "Order Now " />
                </View>
                )}
            />
        </SafeAreaView>
    )
}
export default Cart
