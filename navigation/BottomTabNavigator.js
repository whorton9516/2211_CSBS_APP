// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";

import Colors from "../constants/Colors";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import CalculatorScreen from "../screens/CalculatorScreen"
import SettingsScreen from "../screens/SettingsScreen"
import QuizScreen from "../screens/QuizScreen"


const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const buttoncolor = Colors.dark.buttoncolor;
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
const TabOneStack = createStackNavigator();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: "Tab One Title", headerTitleAlign: 'center' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: "Tab Two Title", headerTitleAlign: 'center' }}
      />
    </TabTwoStack.Navigator>
  );
}

const CalculatorStack = createStackNavigator();

function CalculatorNavigator() {
  return (
    <CalculatorStack.Navigator>
      <CalculatorStack.Screen
      name="CalculatorScreen"
      component={CalculatorScreen}
      options={{headerTitle: "Calculator", headerTitleAlign: 'center'}}
      />
    </CalculatorStack.Navigator>
  )
}

const SettingStack = createStackNavigator();

function SettingNavigator() {
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen
      name="SettingsScreen"
      component={SettingsScreen}
      options={{headerTitle: "Settings", headerTitleAlign: 'center'}}
      />
    </SettingStack.Navigator>
  )
}

const QuizStack = createStackNavigator();

function QuizNavigator() {
  return (
    <QuizStack.Navigator>
      <QuizStack.Screen
      name="QuizScreen"
      component={QuizScreen}
      options={{headerTitle: "Quizes", headerTitleAlign: 'center'}}
      />
    </QuizStack.Navigator>
  )
}