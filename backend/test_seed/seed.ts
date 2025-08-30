import mongoose from "mongoose";
import dummyData from "./data";
import Customisation from "../model/Customisation";
import Menu from "../model/Menu";
import Category from "../model/Categories";
import { ID } from "react-native-appwrite";
import { appwriteConfig, storage } from "@/lib/appwrite";

interface CategoryType {
    name: string;
    description: string;
}

interface CustomisationType {
    name: string;
    price: number;
    type: "topping" | "side" | "size" | "crust" | "bread" | "spice" | "base" | "sauce";
}

interface MenuItemType {
    name: string;
    description: string;
    image_url: string;
    price: number;
    rating: number;
    calories: number;
    protein: number;
    category_name: string;
    customizations: string[];
}

// Upload image to Appwrite storage
async function uploadImageToAppwrite(imageUrl: string) {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const fileObj = {
        name: imageUrl.split("/").pop() || `file-${Date.now()}.jpg`,
        type: blob.type,
        size: blob.size,
        uri: imageUrl,
};

    const file = await storage.createFile(appwriteConfig.bucketId, ID.unique(), fileObj);
    return storage.getFileViewURL(appwriteConfig.bucketId, file.$id);
}

async function seed() {
    try {
        // Connect to MongoDB
        await mongoose.connect("mongodb+srv://admin:wFavJEuWpAfRd5x1@cluster0.xkftiax.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connected to MongoDB");

        // Clear collections
        await Category.deleteMany({});
        await Customisation.deleteMany({});
        await Menu.deleteMany({});

        // Map categories
        const categoryMap: Record<string, mongoose.Types.ObjectId> = {};
        for (const cat of dummyData.categories as CategoryType[]) {
            const created = await Category.create(cat);
            categoryMap[cat.name] = created._id;
        }

        // Map customisations
        const customizationMap: Record<string, mongoose.Types.ObjectId> = {};
        for (const cus of dummyData.customizations as CustomisationType[]) {
            const created = await Customisation.create(cus);
            customizationMap[cus.name] = created._id;
        }

        // Create menu items
        for (const item of dummyData.menu as MenuItemType[]) {
            const uploadedImageUrl = await uploadImageToAppwrite(item.image_url);

            await Menu.create({
                name: item.name,
                description: item.description,
                imageUrl: uploadedImageUrl, // matches Menu schema
                price: item.price,
                rating: item.rating,
                calories: item.calories,
                protein: item.protein,
                category: categoryMap[item.category_name],
                customisations: item.customizations.map((name) => customizationMap[name]),
            });
        }

        console.log("✅ Seeding complete.");
        await mongoose.disconnect();
    } catch (err) {
        console.error("Seeding error:", err);
    }
}

module.exports = {seed}