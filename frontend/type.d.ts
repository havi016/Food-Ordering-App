import { Models } from "react-native-appwrite";

export interface MenuItem extends Models.Document {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    rating: number;
    calories: number;
    protein: number;
    price: number;
    category: string;
    customisations: CartCustomization[];
}

export interface Category extends Models.Document {
    _id: string;
    name: string;
    description: string;
}

export interface User extends Models.Document {
    _id: string;
    name: string;
    email: string;
    avatar: string;
}

export interface CartCustomization {
    _id: string;
    name: string;
    price: number;
    type: string;
    quantity: number;
}

export interface CartItemType {
    _id: string; // menu item id
    name: string;
    price: number;
    image_url: string;
    quantity: number;
    customisations?: CartCustomization[];
}

export interface CartStore {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "quantity">) => void;
    removeItem: (_id: string, customizations: CartCustomization[]) => void;
    increaseQty: (_id: string, customizations: CartCustomization[]) => void;
    decreaseQty: (_id: string, customizations: CartCustomization[]) => void;
    updateCustomisationQty: (id: string, customId: string, quantity: number) => void; // <-- add this
    clearCart: () => void;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

interface TabBarIconProps {
    focused: boolean;
    icon: ImageSourcePropType;
    title: string;
}

interface PaymentInfoStripeProps {
    label: string;
    value: string;
    labelStyle?: string;
    valueStyle?: string;
}

interface CustomButtonProps {
    onPress?: () => void;
    title?: string;
    style?: string;
    leftIcon?: React.ReactNode;
    textStyle?: string;
    isLoading?: boolean;
}

interface CheckoutButtonProps {
    style?: string;
    leftIcon?: React.ReactNode;
    textStyle?: string;
    isLoading?: boolean;
    totalPrice?: number | 0;
}


interface CustomHeaderProps {
    title?: string;
}

interface CustomInputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (text: string) => void;
    label: string;
    secureTextEntry?: boolean;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

interface ProfileFieldProps {
    label: string;
    value: string;
    icon: ImageSourcePropType;
}

interface CreateUserParams {
    email: string;
    password: string;
    name: string;
}

interface SignInParams {
    email: string;
    password: string;
}

interface GetMenuParams {
    category: string;
    query: string;
}
