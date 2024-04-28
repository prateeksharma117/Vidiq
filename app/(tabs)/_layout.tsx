import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "../../constants";
import { StatusBar } from "expo-status-bar";
import { AlertNotificationRoot } from "react-native-alert-notification";

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className=" items-center justify-center gap-2">
            <Image
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className=" w-6 h-6"
            />
            <Text
                className={` text-xs ${focused ? "font-psemibold" : "font-pregular"}`}
                style={{color: color}}
            >
                {name}
            </Text>
        </View>
    );
};

const TabsLayout = () => {
    return (
      <>
        <AlertNotificationRoot>
          <Tabs
            screenOptions={{
              tabBarShowLabel: false,
              tabBarActiveTintColor: "#ff4400",
              tabBarInactiveTintColor: "#CDCDE0",
              tabBarStyle: {
                backgroundColor: "#161622",
                borderTopWidth: 1,
                borderTopColor: "#232533",
                height: 70,
              },
            }}
          >
            <Tabs.Screen
              name="home"
              options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                  <TabIcon
                    icon={icons.home}
                    color={color}
                    name="home"
                    focused={focused}
                  />
                ),
              }}
            />

            <Tabs.Screen
              name="create"
              options={{
                title: "Create",
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                  <TabIcon
                    icon={icons.plus}
                    color={color}
                    name="Create"
                    focused={focused}
                  />
                ),
              }}
            />

            <Tabs.Screen
              name="profile"
              options={{
                title: "Profile",
                headerShown: false,
                tabBarIcon: ({ color, focused }) => (
                  <TabIcon
                    icon={icons.profile}
                    color={color}
                    name="profile"
                    focused={focused}
                  />
                ),
              }}
            />
          </Tabs>
        </AlertNotificationRoot>
        <StatusBar backgroundColor="#161622" style="light" />
      </>
    );
};

export default TabsLayout;
