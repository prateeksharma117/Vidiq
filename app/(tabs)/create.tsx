import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { ResizeMode, Video } from "expo-av";
import { icons } from "../../constants";
import CustomButton from "../../components/CustomButton";
import * as DocumentPicker from 'expo-document-picker';
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { router } from "expo-router";
import { createVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import Spinner from "react-native-loading-spinner-overlay";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async(selectType:any) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpeg", "image/jpg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType==="image") {
        setForm({...form,thumbnail:result.assets[0]})
      } 
      
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      } 
    }else{
      setTimeout(() => {
        Alert.alert("Document Picked",JSON.stringify(result,null,2))
      }, 100);
    }
  }
  

  const submit = async () => {
    if (!form.prompt||!form.thumbnail||!form.title||!form.video) {
      return Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Opps..",
        textBody: "Please fill all the required fields",
      });
    }
    setUploading(true);

    try {
      await createVideo({
        ...form,userId:user.$id
      })

      Toast.show({
        type: ALERT_TYPE.SUCCESS,
        title: "Uploaded!",
        textBody: "Congrats! Post uploaded successfully",
      });
      router.push("/home")
    } catch (error) {
      Alert.alert("Error",error.message)
    }finally{
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
      setUploading(false);
    }
   };

  return (
    <SafeAreaView className=" bg-primary h-full">
      <ScrollView className=" px-4 py-6">
        <Spinner
          visible={uploading}
          textContent={"Uploading..."}
          textStyle={{ color: "#FFF"}}
          color="#FFF"
          size="large"
        />
        <Text className=" text-2xl font-psemibold text-white">
          Upload video
        </Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="title"
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles=" mt-10"
        />

        <View className=" mt-7 space-y-2">
          <Text className=" text-gray-100 text-base font-pmedium">
            Upload video
          </Text>
          <TouchableOpacity>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className=" w-full h-64 rounded-2xl"
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
              />
            ) : (
              <TouchableOpacity onPress={() => openPicker("video")}>
                <View className=" w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                  <View className=" w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                    <Image
                      source={icons.upload}
                      resizeMode="contain"
                      className=" w-1/2 h-1/2"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          </TouchableOpacity>

          <View className=" mt-7 space-y-2">
            <Text className=" text-gray-100 text-base font-pmedium">
              Thumbnail Image
            </Text>

            <TouchableOpacity onPress={() => openPicker("image")}>
              {form.thumbnail ? (
                <Image
                  source={{ uri: form.thumbnail.uri }}
                  className=" w-full h-64 rounded-2xl"
                  resizeMode="cover"
                />
              ) : (
                <View className=" w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2 ">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className=" w-5 h-5"
                  />
                  <Text className=" text-sm text-gray-100 font-pmedium">
                    Choose a file
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="Write prompt you use to create this video..."
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles=" mt-7"
        />
        <CustomButton
          title="Submit & Publish"
          handlePress={() => submit()}
          containerStyles="mt-7 mb-10"
          textStyles=""
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
