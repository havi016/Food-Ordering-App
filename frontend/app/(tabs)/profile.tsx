import {View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image} from 'react-native'
import React, {use, useEffect} from 'react'
import useAuthStore from "@/store/auth.store";
import {Redirect} from "expo-router";
import ProfileHeader from "@/components/ProfileHeader";
import UserInfo from "@/components/UserInfo";

const Profile = () => {

    const {user, setUser, setIsAuthenticated} = useAuthStore()


    if (!user) return <Redirect href={"/"} />

    let avatar;
    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView contentContainerStyle={{ padding: 24 }} className="gap-6">

                <View className="items-center mb-6">
                    <ProfileHeader user={user}/>
                </View>

                <View className="relative w-full p-4 bg-white rounded-xl shadow-xl">
                    <UserInfo value={user.name} label = "Name" />
                    <UserInfo value={user.email} label = "Email" />
                </View>

                <View className="mt-10">
                    <TouchableOpacity
                        onPress={() => {
                            console.log("Logging out...");
                            setUser(null);
                            setIsAuthenticated(false);
                        }}
                        className="bg-red-500 rounded-2xl p-4"
                    >
                        <Text className="text-white text-center font-bold">Log Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile
