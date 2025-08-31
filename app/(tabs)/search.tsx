import {View, Text, SafeAreaView, ActivityIndicator, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getAllCategories, getAllMenus, getMenusByCategory} from '@/src/api/menusApi';
import {useTabSlot} from "expo-router/ui";
import CartButton from "@/components/CartButton";
import cn from "clsx";
import MenuCard from "@/components/MenuCard";

interface Menu {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    rating: number;
    calories: number;
    protein: number;
    price: number;
    category: string;
    customisations: string[];
}

interface Category {
    _id: string;       // MongoDB will always add this
    name: string;
    description: string;
}

const Search = () => {

    const [menus, setMenus] = useState<Menu[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState(null)


    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const categoriesData = await getAllCategories();
                setCategories(categoriesData);

                const menusData = await getAllMenus();
                setMenus(menusData);
            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
        };

        fetchInitialData();
    }, []);

    useEffect(() => {
        if (!selectedCategory) return;

        const fetchMenusByCategory = async () => {
            try {
                const data = await getMenusByCategory(selectedCategory);
                setMenus(data);
            } catch (error) {
                console.error("Error fetching menus by category:", error);
            }
        };

        fetchMenusByCategory();
    }, [selectedCategory]);

    return (
        <SafeAreaView className = " bg-white h-full pt-5" >
            <FlatList
                data={menus}
                renderItem={({ item, index }) => {
                    const isFirstRightColItem = index % 2 === 0;

                    return (
                        <View className={cn("flex-1 max-w-[48%]", !isFirstRightColItem ? "mt-10" : "mt-0")}>
                            <MenuCard item={item as Menu}/>
                        </View>
                    )
                }}
                keyExtractor={item => item._id}
                numColumns={2}
                columnWrapperClassName={"gap-7"}
                contentContainerClassName={"gap-7 px-5 pb-32"}
                ListHeaderComponent = {() => (
                    <View className=" my-5 gap-5">
                        <View className = " flex-between flex-row w-full">
                            <View className="flex-start">
                                <Text className={"small-bold uppercase text-primary"}>Search.</Text>
                                <View className={" flex-start flex-row gap-x-1 mt-0.5"}>
                                    <Text className={"parigraph-semibold text-dark-100"}>Find your favourtite food</Text>
                                </View>
                            </View>

                            <CartButton/>
                        </View>
                        <Text>Search Input</Text>

                        <Text>Filter</Text>
                    </View>
                )}
                ListEmptyComponent = {() => !isLoading && <Text>Empty...</Text>}
            />
        </SafeAreaView>
    )

}

export default Search;