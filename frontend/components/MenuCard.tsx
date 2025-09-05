import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import { MenuItem } from "@/type";
import { appwriteConfig } from "@/lib/appwrite";
import MenuModal from "./MenuModal";

const MenuCard = ({ item }: { item: MenuItem }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const imageURL = `${item.imageUrl}?project=${appwriteConfig.projectId}`;



    return (
        <View>
            <TouchableOpacity
                className="menu-card"
                style={Platform.OS === "android" ? { elevation: 10, shadowColor: "#878787" } : {}}
                onPress={() => setModalVisible(true)}
            >
                <Image source={{ uri: imageURL }} className="size-32 absolute -top-10" resizeMode="contain" />
                <Text className="text-center base-bold text-dark-100 mb-2" numberOfLines={1}>
                    {item.name}
                </Text>
                <Text className="body-regular text-gray-100 mb-4">From £{item.price}</Text>
            </TouchableOpacity>

            <MenuModal
                item={item}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                availableCustomisations={item.customisations ?? []} // pass an array
            />
        </View>
    );
};

export default MenuCard;