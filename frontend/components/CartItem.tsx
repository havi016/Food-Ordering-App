import { useCartStore } from "@/store/cart.store";
import { CartItemType, CartCustomization } from "@/type";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { images } from "@/constants";

const CartItem = ({ item }: { item: CartItemType }) => {
    const { increaseQty, decreaseQty, updateCustomisationQty, removeItem } = useCartStore();

    return (
        <View className="cart-item p-3 border-b border-gray-200">
            <View className="flex flex-row items-center gap-x-3">
                <View className="cart-item__image">
                    <Image
                        source={{ uri: item.image_url }}
                        className="size-4/5 rounded-lg"
                        resizeMode="cover"
                    />
                </View>

                <View className="flex-1">
                    <Text className="base-bold text-dark-100">{item.name}</Text>
                    <Text className="paragraph-bold text-primary mt-1">${item.price}</Text>

                    {/* Customisations with + / - buttons */}
                    {item.customisations && item.customisations.length > 0 && (
                        <View className="mt-2 space-y-1">
                            {item.customisations.map((c: CartCustomization) => (
                                <View key={c._id} className="flex-row justify-between items-center">
                                    <Text className="text-gray-600">
                                        {c.name} (+£{c.price})
                                    </Text>

                                    <View className="flex-row items-center gap-x-2">
                                        <TouchableOpacity
                                            onPress={() =>
                                                updateCustomisationQty(item._id, c._id, (c.quantity || 1) + 1)
                                            }
                                        >
                                            <Text className="text-green-600 font-bold">+</Text>
                                        </TouchableOpacity>

                                        <Text className="mx-1">{c.quantity || 1}</Text>

                                        <TouchableOpacity
                                            onPress={() =>
                                                updateCustomisationQty(item._id, c._id, (c.quantity || 1) - 1)}
                                        >
                                            <Text className="text-red-600 font-bold">-</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Quantity controls */}
                    <View className="flex flex-row items-center gap-x-4 mt-2">
                        <TouchableOpacity
                            onPress={() => decreaseQty(item._id, item.customisations!)}
                            className="cart-item__actions"
                        >
                            <Image
                                source={images.minus}
                                className="size-1/2"
                                resizeMode="contain"
                                tintColor="#FF9C01"
                            />
                        </TouchableOpacity>

                        <Text className="base-bold text-dark-100">{item.quantity}</Text>

                        <TouchableOpacity
                            onPress={() => increaseQty(item._id, item.customisations!)}
                            className="cart-item__actions"
                        >
                            <Image
                                source={images.plus}
                                className="size-1/2"
                                resizeMode="contain"
                                tintColor="#FF9C01"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Trash button */}
            <TouchableOpacity
                onPress={() => removeItem(item._id, item.customisations!)}
                className="flex-center mt-2"
            >
                <Image source={images.trash} className="size-5" resizeMode="contain" />
            </TouchableOpacity>
        </View>
    );
};

export default CartItem;