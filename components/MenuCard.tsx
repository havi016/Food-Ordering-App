import {View, Text, TouchableOpacity, Image, Platform} from 'react-native'
import React from 'react'
import {MenuItem} from "@/type";
import {appwriteConfig} from "@/lib/appwrite";
import {useCartStore} from "@/store/cart.store";


const MenuCard = ({item: {_id, imageUrl, name ,price }}: {item: MenuItem}) => {

    const imageURL = `${imageUrl}?project=${appwriteConfig.projectId}`;
    const {addItem, items} = useCartStore();

    return(
        <TouchableOpacity className={"menu-card"} style={Platform.OS === 'android' ? {elevation: 10, shadowColor: "#878787"}: {}}>
            <Image source={{uri: imageURL}} className = "size-32 absolte -top-10" resizeMode="contain"/>
            <Text className={"text-center base-bold text-dark-100 mb-2 "} numberOfLines={1}>{name}</Text>
            <Text className={" body-regular text-gray-100 mb-4"}> From £{price}</Text>
            <TouchableOpacity  onPress={()=>
            {
                addItem({_id: _id, name, price, image_url: imageUrl, customisations: []})
                console.log(items)
            }}>
                <Text className={"paragraph-bold text-primary"}>Add To Cart </Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
export default MenuCard

