import React from 'react';
import { Platform, View, Text, TouchableOpacity } from 'react-native';
import { Tabs } from 'expo-router';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const CustomTabBarButton = ({ children, onPress, isActive }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}>
      {isActive && (
        <View
          style={{
            position: 'absolute',
            top: 5,
            width: 60, // Larger size to cover the text
            height: 140, // Larger size to cover the text
            borderRadius: 40, // Circular shape
            backgroundColor: 'rgba(255, 246, 148, 0.5)', // Circle color
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      )}
      <Text
        style={{
          color: isActive ? '#FFF694' : '#FFFBCE',
          fontSize: 16,
          fontWeight: 'bold',
          zIndex: 1, // Ensure text stays on top of the circle
        }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFF694',
        tabBarInactiveTintColor: '#FFFBCE',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: 'transparent', // To avoid background blocks
            borderTopWidth: 0, // Remove default top border
          },
          default: {
            backgroundColor: 'transparent', // Make the background transparent
          },
        }),
      }}>
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color, focused }) => (
            <CustomTabBarButton isActive={focused} onPress={() => {}}>
              <IconSymbol size={20} name="party.popper.fill" color={color} />
            </CustomTabBarButton>
          ),
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: 'Camera',
          tabBarIcon: ({ color, focused }) => (
            <CustomTabBarButton isActive={focused} onPress={() => {}}>
              <IconSymbol size={20} name="camera.fill" color={color} />
            </CustomTabBarButton>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <CustomTabBarButton isActive={focused} onPress={() => {}}>
              <IconSymbol size={20} name="house.fill" color={color} />
            </CustomTabBarButton>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <CustomTabBarButton isActive={focused} onPress={() => {}}>
              <IconSymbol size={20} name="person.fill" color={color} />
            </CustomTabBarButton>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <CustomTabBarButton isActive={focused} onPress={() => {}}>
              <IconSymbol size={20} name="gear" color={color} />
            </CustomTabBarButton>
          ),
        }}
      />
      <Tabs.Screen
        name="camera_test"
        options={{
          title: 'Camera_Test',
          tabBarIcon: ({ color, focused }) => (
            <CustomTabBarButton isActive={focused} onPress={() => {}}>
              <IconSymbol size={20} name="gear" color={color} />
            </CustomTabBarButton>
          ),
        }}
      />
    </Tabs>
  );
}
