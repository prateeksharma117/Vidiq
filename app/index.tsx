import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {

  const {isLoading, isLoggedIn}=useGlobalContext()

  if (!isLoading&&isLoggedIn) return <Redirect href="/home"/>

  return (
    <SafeAreaView className=" bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex-1 items-center justify-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[150px] h-[90px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full0 h-[300px]"
            resizeMode="contain"
          />

          <View className=" relative mt-5">
            <Text className=" text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with{" "}
              <Text className=" text-secondary-200">Vidiq</Text>
            </Text>
            <Image
              source={images.path}
              className=" w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className=" text-sm font-pregular text-gray-100 mt-7 text-center">
            "Unlimited Entertainment Awaits: Your Ultimate Destination for
            Seamless Streaming Bliss"
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles=" w-full mt-7"
            textStyles=""
            isLoading={false}
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
