import {View, Text, FlatList, TouchableOpacity, Platform} from 'react-native'
import React, {useEffect, useState} from 'react'
import {Category, MenuItem} from "@/type";
import {router, useLocalSearchParams} from "expo-router";
import cn from "clsx";


const Filter = ({categories}: {categories: Category[] }) => {


    const searchParams = useLocalSearchParams();
    const [active, setActive] = useState(searchParams.category || '');

    const handlePress = (name: string) => {
        setActive(name);

        if (name === 'All') router.setParams({ category: undefined });
        else router.setParams({ category: name });
    };

    const filterData: (Category | {_id: string; name: string})[] = categories
        ? [{ _id: 'all', name:'All'}, ...categories]
        : [{ _id: 'all', name:'All'}]

    return (
        <FlatList
            data={filterData}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerClassName={"gap-x-2 pb-3 pt-2"}
            renderItem={({ item }) => (
                <TouchableOpacity
                    key={item._id}
                    className={cn('filter', active === item.name ? 'bg-amber-500' : 'bg-white')}
                    style = {Platform.OS === 'android' ? { elevation: 5, shadowColor: '#878787' }: {}}
                    onPress={() => handlePress(item.name)}
                >
                    <Text className={cn('body-medium', active === item.name ? 'text-white': "text-gray-200")}>{item.name}</Text>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.name}
        />


    )
}
export default Filter
