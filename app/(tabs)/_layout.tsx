import { FloatingPlayer } from "@/components/FloatingPlayer"
import { colors, fontSize } from "@/constants/tokens"
import { FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { BlurView } from "expo-blur"
import { Tabs } from "expo-router"
import { StyleSheet } from "react-native"


const TabsNavigation = () => {
  return (
    <>
    <Tabs screenOptions={{
      tabBarActiveTintColor: colors.primary,
      tabBarLabelStyle: {
        fontSize: fontSize.sm,
        fontWeight: '500',
      },
      headerShown: false,
      tabBarStyle: {
        position: 'absolute',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTopWidth: 0,
        paddingTop: 5,
        height: 70,

      },
      tabBarBackground: () => {
        return <BlurView
          intensity={50}
          style={{
            ...StyleSheet.absoluteFillObject,
            overflow: "hidden",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }} />
      },
    }}>
        <Tabs.Screen 
          name="favourites" 
          options={{
            title: 'Favourites',
            tabBarIcon: ({ color }) => <FontAwesome name="heart" size={24} color={color} />,
          }}
        />
        <Tabs.Screen 
          name="playlists"
          options={{
            title: 'Playlists',
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="playlist-play" size={24} color={color} />,
          }} 
        />
        <Tabs.Screen 
          name="(songs)"
          options={{
            title: 'Songs',
            tabBarIcon: ({ color }) => <Ionicons name="musical-notes-sharp" size={24} color={color} />,
          }}  
        />
        <Tabs.Screen 
          name="artists"
          options={{
            title: 'Artists',
            tabBarIcon: ({ color }) => <FontAwesome6 name="users-line" size={22} color={color} />,
          }}  
        />
        
    </Tabs> 
     <FloatingPlayer 
        style={{
          position: 'absolute',
          left: 8,
          right: 8,
          bottom: 80,
        }} 
     />
    </>
  )
}

export default TabsNavigation