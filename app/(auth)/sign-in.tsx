import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const SignIn = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const Submit = async () => {
    if (!form.email || !form.password) {
      return Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error!",
        textBody: "Please enter all the required fields",
      });
    }
    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result= await getCurrentUser()
      setUser(result);
      setIsLoggedIn(true);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className=" bg-primary h-full">
      <ScrollView>
        <View className=" justify-center w-full px-4 py-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[130px] h-[40px]"
          />
          <Text className=" text-2xl text-white text-semibold mt-10 font-psemibold">
            Log in to Vidiq
          </Text>
          <FormField
            title="Email"
            placeholder="example@gmail.com"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles=" mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            placeholder="password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles=" mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={Submit}
            containerStyles="mt-7"
            textStyles=""
            isLoading={isSubmitting}
          />

          <View className=" justify-center pt-5 flex-row gap-2">
            <Text className=" text-lg text-gray-100 font-pregular">
              Don't have account?{" "}
            </Text>
            <Link
              href="/sign-up"
              className=" text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
