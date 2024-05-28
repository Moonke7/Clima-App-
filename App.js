import { Image, StyleSheet, Text, View } from "react-native";
import Main from "./src/Components/Main";
import Santiago from "./src/Pages/Components/Santiago";
import SantiagoCentro from "./src/Pages/SantiagoCentro";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
    initialRouteName="Las Condes"
      screenOptions={{
        tabBarActiveTintColor: "#7a156f",
      }}
    >
      <Tab.Screen
        name="Rancagua"
        component={Main}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="hat-cowboy" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Las Condes"
        component={Santiago}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Santiago centro"
        component={SantiagoCentro}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="skull-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MyTabs"
          component={MyTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
});
