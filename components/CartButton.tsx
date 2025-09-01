import {View, Text, TouchableOpacity, Image} from 'react-native'
import React from 'react'
import {useCartStore} from "@/store/cart.store";
import {router} from "expo-router";

const CartButton = () => {
    const { getTotalItems} = useCartStore();

    const totalItems = getTotalItems();

    return (
        <TouchableOpacity className={"cart-button"} onPress={() => {router.push('/cart')}}>
            <Image source= {require("../assets/icons/bag.png")} className="size-10 "  tintColor = '#5D5F6D' resizeMode = "contain" />
            {totalItems > 0 && (
                <View className="cart-badge">
                    <Text className={"small-bold text-white"}> {totalItems}</Text>
                </View>
            )}
        </TouchableOpacity>
    )
}
export default CartButton

