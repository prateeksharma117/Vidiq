import { View, Text, ScrollView, Image, Alert, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { images } from "../../constants";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const SignUp = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const [visible, setVisible] = useState(true);

  const Submit = async () => {
    if (!form.email || !form.password || !form.username) {
      return Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error!",
        textBody: "Please enter all the required fields",
      });
    }
    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result)
      setIsLoggedIn(true)
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
            Sign up to Vidiq
          </Text>
          <FormField
            title="Username"
            placeholder="username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles=" mt-10"
          />
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
            title="Sign Up"
            handlePress={Submit}
            containerStyles="mt-7"
            textStyles=""
            isLoading={isSubmitting}
          />

          <View className=" justify-center pt-5 flex-row gap-2">
            <Text className=" text-lg text-gray-100 font-pregular">
              Have a account already?{" "}
            </Text>
            <Link
              href="/sign-in"
              className=" text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
