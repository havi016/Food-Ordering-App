import React from "react";
import { View, Text } from "react-native";

interface UserInfoRowProps {
    label: string;
    value: string;
}

const UserInfo = ({ label, value }: UserInfoRowProps) => {
    return (
        <View className="mb-4">
            <Text className="text-sm text-gray-500">{label}</Text>
            <Text className="text-base font-semibold text-black">{value}</Text>
        </View>
    );
};

export default UserInfo;