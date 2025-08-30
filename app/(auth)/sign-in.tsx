import {View, Text, Alert} from 'react-native'
import React, {useState} from 'react'
import {Link, router} from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import {getCurrentUser, signIn} from "@/src/api/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useAuthStore from "@/store/auth.store";

const SignIn = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [form, setForm] = useState({email: '', password: ''})
    const authStore = useAuthStore(); // <- here


    const submit = async () => {
        const {email, password} = form
        if(!form.email || !form.password){ return Alert.alert('Error', 'Please enter a valid email address and password.');}

        setIsSubmitting(true)

        try {
            const response = await signIn(email, password);
            const token = response.data.token;

            await AsyncStorage.setItem('token', token);

            // update store with authenticated user
            await authStore.fetchAuthenticatedUser();

            // redirect to home
            router.replace('/');

            Alert.alert('Success', `Welcome ${authStore.user?.name}`);
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5">
            <CustomInput
                placeholder={"Enter email address"}
                value = {form.email}
                onChangeText={(text) => setForm((prev) => ({ ...prev, email: text}))}
                label="Email"
                keyboardType={"email-address"}
            />

            <CustomInput
                placeholder={"Enter password"}
                value = {form.password}
                onChangeText={(text) => setForm((prev) => ({ ...prev, password: text}))}
                label="Password"
                secureTextEntry={true}
            />
            <CustomButton
                title = "Sign in"
                isLoading={isSubmitting}
                onPress={submit}

            />

            <View className="flex justify-center mt-5 flex-row gap-2">
                <Text className={"base-regular text-gray-100"}>
                    Dont have an account?
                </Text>
                <Link href={"/sign-up"} className={"base-bold text-primary"}>
                    Sign Up
                </Link>
            </View>
        </View>
    )
}
export default SignIn
