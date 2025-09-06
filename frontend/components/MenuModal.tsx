import React, {useEffect, useState} from "react";
import { View, Text, Image, Modal, ScrollView, TouchableOpacity, Platform } from "react-native";
import { MenuItem, CartCustomization } from "@/type";
import { useCartStore } from "@/store/cart.store";

interface MenuModalProps {
    item: MenuItem;
    visible: boolean;
    onClose: () => void;
    availableCustomisations: CartCustomization[];
}

const MenuModal = ({ item, visible, onClose, availableCustomisations = [] }: MenuModalProps) => {
    const [selectedCustomisations, setSelectedCustomisations] = useState<CartCustomization[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const addItem = useCartStore((state) => state.addItem);

    const toggleCustomisation = (c: CartCustomization) => {
        setSelectedCustomisations((prev) =>
            prev.find((x) => x._id === c._id)
                ? prev.filter((x) => x._id !== c._id)
                : [...prev, c]
        );
    };

    const handleAddToCart = () => {
        const customsWithQty = selectedCustomisations.map(c => ({
            ...c,
            quantity: c.quantity ?? 1,
        }));
        addItem({
            _id: item._id,
            name: item.name,
            price: item.price,
            image_url: item.imageUrl,
            customisations: customsWithQty,
        });
        onClose();
    }

    useEffect(() => {})

    return (
        <Modal visible={visible} transparent animationType="slide">
            <TouchableOpacity
                activeOpacity={1}
                onPress={onClose}
                className="flex-1 justify-center items-center bg-black/40"
            >
                <View
                    className={`w-[90%] bg-white rounded-xl p-4 ${Platform.OS === "android" ? "shadow-lg" : "shadow"}`}
                    onStartShouldSetResponder={() => true}
                >
                    <ScrollView>
                        <Image
                            source={{ uri: `${item.imageUrl}?project=${"YOUR_PROJECT_ID"}` }}
                            className="w-full h-40 rounded-xl mb-4"
                            resizeMode="contain"
                        />
                        <Text className="text-xl font-bold text-center mb-1">{item.name}</Text>
                        <Text className="text-center text-gray-600 mb-2">{item.description}</Text>
                        <Text className="text-center text-gray-500 mb-1">Calories: {item.calories}, Protein: {item.protein}</Text>
                        <Text className="text-center text-gray-800 font-semibold mb-1">Price: £{item.price}</Text>

                        <TouchableOpacity
                            onPress={() => setDropdownOpen(!dropdownOpen)}
                            className="bg-blue-400 rounded-lg p-3 mb-2"
                        >
                            <Text className="text-center font-semibold text-white">Select Customisations</Text>
                        </TouchableOpacity>

                        {dropdownOpen && (
                            <View className="border border-gray-300 rounded-lg mb-4">
                                {availableCustomisations.map((c) => (
                                    <TouchableOpacity
                                        key={c._id}
                                        onPress={() => toggleCustomisation(c)}
                                        className="p-3 border-b border-gray-200 last:border-b-0"
                                    >
                                        <Text className={selectedCustomisations.find((x) => x._id === c._id) ? "text-green-600 font-semibold" : "text-gray-800"}>
                                            {c.name} (+£{c.price})
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}

                        <TouchableOpacity
                            onPress={handleAddToCart}
                            className="bg-primary rounded-lg p-3 mb-2"
                        >
                            <Text className="text-white text-center font-bold">Add to Cart</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

export default MenuModal;