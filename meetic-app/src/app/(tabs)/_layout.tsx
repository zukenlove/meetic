import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // 1. Import the icon library

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 80, 
          backgroundColor: '#0f172a', 
          borderTopWidth: 0,
          paddingBottom: 15, 
        },
        tabBarActiveTintColor: '#3b82f6',   // Active icon color (Blue)
        tabBarInactiveTintColor: '#94a3b8', // Inactive icon color (Gray)
      }}
    >
      <Tabs.Screen 
        name="home" 
        options={{ 
          title: "Home",
          // 2. Add the function that renders the icon dynamically
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} // Changes style when selected
              size={size} // Adjust size as needed
              color={color} // Automatically inherits active/inactive tint colors
            />
          )
        }} 
      />
      
      <Tabs.Screen 
        name="settings" 
        options={{ 
          title: "Settings",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
              name={focused ? "settings" : "settings-outline"} 
              size={size} 
              color={color} 
            />
          )
        }} 
      />
    </Tabs>
  );
}
