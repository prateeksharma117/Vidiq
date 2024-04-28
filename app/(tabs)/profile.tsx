import { View, Text, FlatList, Image, TouchableOpacity, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import VideoCard from "../../components/VideoCard";
import SearchInput from "../../components/SearchInput";
import { icons, images } from "../../constants";
import EmptyState from "../../components/EmptyState";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";
import InfoBox from "../../components/InfoBox";

const Profile = () => {
  const { user,setUser,setIsLoggedIn } =useGlobalContext() 
  const { data: posts, refetch } = useAppwrite(()=>getUserPosts(user.$id));
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
      setRefreshing(true);
      await refetch();
      setRefreshing(false);
  };
  

  const logout = async() => {
    await signOut()
    setUser(null)
    setIsLoggedIn(false)
    router.replace("/sign-in")
  }
  

  return (
    <SafeAreaView className=" bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className=" w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              className=" w-full items-end mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className=" w-6 h-6"
              />
            </TouchableOpacity>

            <View className=" w-16 h-16 border border-secondary-100 rounded-lg justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                resizeMode="cover"
                className=" w-[90%] h-[90%] rounded-lg"
              />
            </View>
            <InfoBox
              title={user?.username}
              subtitle=""
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className=" mt-5 flex-row justify-center items-center">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                containerStyles="mr-10"
                titleStyles="text-xl"
              />
              <InfoBox
                title="1.2k"
                subtitle="Likes"
                containerStyles=""
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No video found"
            subtitle="No video found for this search query"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Profile;
