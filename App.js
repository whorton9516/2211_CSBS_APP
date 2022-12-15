import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useLoadedAssets } from "./hooks/useLoadedAssets";
import Navigation from "./navigation";
import { useColorScheme } from "react-native";
import * as SQLite from 'expo-sqlite';
import { useState, useEffect } from 'react';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const isLoadingComplete = useLoadedAssets();
  const colorScheme = useColorScheme();
  const [colorTheme, setColorTheme] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [colorBlindMode, setColorBlindMode] = useState(0)

  const db = SQLite.openDatabase('userSettings.db');
  // Create a table to store the user preferences if it doesn't exist
  useEffect(() => {

    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS userSettings (colorTheme INTEGER, ColorBlindMode INTEGER, DarkMode BOOLEAN);'
      );
    });
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
