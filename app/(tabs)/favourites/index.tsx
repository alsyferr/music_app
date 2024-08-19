import { defaultStyles } from '@/styles'
import { Stack } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'
import library from '@/assets/data/library.json'
import { TrackList } from '@/components/TrackList'
import { screenPadding } from '@/constants/tokens'
import { useMemo } from 'react'
import { useNavigationSearch } from '@/hooks/useNavigationSearch'
import { useFavourites } from '@/store/library'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTracksListId } from '@/helpers/miscellaneous'

const FavouritesScreen = () => {
  const search = useNavigationSearch({
    searchBarOptions: {
      placeholder: 'Find in songs'
    },
  })


 const favouritesTrack = useFavourites().favourites

 const filterFavouritesTracks = useMemo(() => {
  if (!search) return favouritesTrack

  return favouritesTrack.filter(trackTitleFilter(search))

 },[search, favouritesTrack])

  return (
    <View style={defaultStyles.container}>
      <ScrollView 
        style={{ paddingHorizontal: screenPadding.horizontal}}
        contentInsetAdjustmentBehavior='automatic'
      >
        <TrackList 
          id={generateTracksListId('favourites', search)} 
          scrollEnabled={false} 
          tracks={filterFavouritesTracks} 
        />
      </ScrollView>
    </View>
  )
}

export default FavouritesScreen