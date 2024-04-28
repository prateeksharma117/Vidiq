import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormField = ({
    title,
    value,
    handleChangeText,
    placeholder,
    otherStyles,
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <View className={` space-y-2 ${otherStyles}`}>
        <Text className=" text-base text-gray-100 font-pmedium">{title}</Text>
        <View className=" border-2 w-full h-16 px-4 bg-black-100 border-black-200 rounded-2xl flex-row focus:border-secondary items-center">
          <TextInput
            className=" flex-1 text-white font-psemibold text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#98a1ae"
            onChangeText={handleChangeText}
            secureTextEntry={title === "Password" && !showPassword}
          />
          {title === "Password" && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={!showPassword ? icons.eye : icons.eyeHide}
                className=" w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
};

export default FormField;
