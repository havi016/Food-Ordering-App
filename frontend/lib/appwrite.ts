import { Account, Client, Databases, Storage, ID, Avatars } from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: "https://fra.cloud.appwrite.io/v1",
    platform: "com.havi.foodordering",
    projectId: "68a1eeb2000584ba1377",
    databaseId: '68a1f210000c1589f445',
    userCollectionId: '68a1f2380026da7fc7b7',
    bucketId: '68aa0148002a0ecc4b59',
};

export const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint!)
    .setProject(appwriteConfig.projectId!)
    .setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
export const IDGenerator = ID; // export ID so you can use it for unique file IDs