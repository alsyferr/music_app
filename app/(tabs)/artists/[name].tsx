import { ArtistTrackList } from "@/components/ArtistTrackList"
import { screenPadding } from "@/constants/tokens"
import { useArtists } from "@/store/library"
import { defaultStyles } from "@/styles"
import { Redirect, useLocalSearchParams } from "expo-router"
import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"


const ArtistDetailScreen = () => {
  const {name: artistName} = useLocalSearchParams<{ name: string }>()

  const artists = useArtists()

  const artist = artists.find((artist) => artist.name === artistName)

  if(!artist) {
    console.warn(`Artist ${artistName} not found` )

    return <Redirect href="/artists" />

  }

  return (
    <View style={defaultStyles.container}>
       <ScrollView
         contentInsetAdjustmentBehavior="automatic"
         style={{paddingHorizontal: screenPadding.horizontal}}
       >
            <ArtistTrackList artist={artist} />
       </ScrollView>
    </View>
  )
}

export default ArtistDetailScreen