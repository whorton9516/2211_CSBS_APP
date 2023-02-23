// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme, Image } from "react-native";

import Colors from "../constants/Colors";
import CalculatorScreen from "../screens/CalculatorScreen"
import SettingsScreen from "../screens/SettingsScreen"
import QuizScreen from "../screens/QuizScreen"
import TestingScreen from "../screens/TestingScreen";
import ExplanationScreen from "../screens/ExplanationsScreen";
import QuizEntryScreen from "../screens/QuizEntry";
import styles from '../constants/styles';


const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const buttoncolor = Colors.light.buttoncolor;
  return (
    <BottomTab.Navigator
      initialRouteName="Calculator"
      screenOptions={{ tabBarActiveTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Calculator"
        component={CalculatorNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calculator" color={buttoncolor} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Quizes"
        component={QuizNavigator}
        options={{
          headerShown: false,
          unmountOnBlur: true,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="book" color={buttoncolor} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={SettingNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="settings" color={buttoncolor} />
          ),
        }}
      />
      <BottomTab.Screen
        name="QuizEntry"
        component={QuizEntryNavigator}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab

const Stack = createStackNavigator();

function CalculatorNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
      name="CalculatorScreen"
      component={CalculatorScreen}
      options={{headerShown: false}}
      />
      <Stack.Screen
      name="ExplanationScreen"
      component={ExplanationScreen}
      options={{
        headerTitle: "Explanation", 
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <Image
            source={require('../assets/images/back.png')}
            style={styles.backButtonImage}
          />
        ),
      }}
      />
    </Stack.Navigator>
  )
}

function SettingNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
      name="SettingsScreen"
      component={SettingsScreen}
      options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}

function QuizNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
      name="QuizScreen"
      component={QuizScreen}
      options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}

function QuizEntryNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
      name="QuizEntryScreen"
      component={QuizEntryScreen}
      options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}

function TestingNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
      name="Testing"
      component={TestingScreen}
      options={{headerTitle: "Testing", headerTitleAlign: 'center'}}
      />
    </Stack.Navigator>
  )
}