import { View, Text, Alert } from 'react-native';
import React, { useState } from 'react';
import { Link, router } from "expo-router";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {signUp, signIn, getCurrentUser} from "@/src/api/authApi";
import useAuthStore from "@/store/auth.store";

const SignUp = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const authStore = useAuthStore();

    const submit = async () => {
        const { name, email, password } = form;

        if (!name || !email || !password) {
            return Alert.alert('Error', 'Please enter all fields correctly.');
        }

        setIsSubmitting(true);

        try {
            await signUp(name, email, password);

            const response = await signIn(email, password);

            const token = response.data.token;

            await AsyncStorage.setItem("token", token);

            await authStore.fetchAuthenticatedUser();

            router.replace('/');

        } catch (error: any) {
            console.error(error.response?.data || error.message);
            const msg = error.response?.data?.message || 'Something went wrong';
            Alert.alert('Error', msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View className="gap-10 bg-white rounded-lg p-5 mt-5">
            <CustomInput
                placeholder="Enter full name"
                value={form.name}
                onChangeText={text => setForm(prev => ({ ...prev, name: text }))}
                label="Full name"
            />
            <CustomInput
                placeholder="Enter email address"
                value={form.email}
                onChangeText={text => setForm(prev => ({ ...prev, email: text }))}
                label="Email"
                keyboardType="email-address"
            />
            <CustomInput
                placeholder="Enter Password"
                value={form.password}
                onChangeText={text => setForm(prev => ({ ...prev, password: text }))}
                label="Password"
                secureTextEntry
            />
            <CustomButton
                title="Sign Up"
                isLoading={isSubmitting}
                onPress={submit}
            />
            <View className="flex-row justify-center mt-5 gap-2">
                <Text className="base-regular text-gray-100">Already have an account?</Text>
                <Link href="/sign-in" className="base-bold text-primary">Sign In</Link>
            </View>
        </View>
    );
};

export default SignUp;