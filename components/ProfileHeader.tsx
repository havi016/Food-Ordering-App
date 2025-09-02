import React from "react";
import { View, Image, Text } from "react-native";
import avatar from "../assets/images/avatar.png";
import icon from "../assets/images/icon.png";
import {User} from "@/type";

const ProfileHeader = ({ user }: { user: User }) => {
    return (
        <View className="items-center mb-6 mt-10">
            {/* Container for stacked images */}
            <View className="relative w-32 h-32">
                {/* Bottom image (icon) */}
                <Image
                    source={icon}
                    className="w-32 h-32 rounded-full border-2 border-gray-300"
                />
                {/* Top image (avatar) */}
                <Image
                    source={avatar}
                    className="absolute top-0 left-0 w-32 h-32 rounded-full border-4 border-gray-200"
                />
            </View>

        </View>
    );
};

export default ProfileHeader;