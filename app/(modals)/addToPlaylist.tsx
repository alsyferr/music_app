import { PlaylistsList } from "@/components/PlaylistsList"
import { Playlist } from "@/helpers/types"
import { usePlaylists, useTracks } from "@/store/library"
import { useQueue } from "@/store/queue"
import { useLocalSearchParams, useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"
import TrackPlayer, { Track } from "react-native-track-player"
import {useHeaderHeight} from '@react-navigation/elements'
import { StyleSheet } from "react-native"
import { defaultStyles } from "@/styles"
import { colors, screenPadding } from "@/constants/tokens"

const AddToPlaylistModal = () => {
    const router =  useRouter()
    const headerHeight = useHeaderHeight()
    const {activeQueueId} = useQueue()
    const {trackUrl} = useLocalSearchParams<{trackUrl: Track['url']}>()

    const tracks = useTracks()

    const {playlists, addToPlaylist} = usePlaylists()

    const track = tracks.find((currentTrack) => trackUrl === currentTrack.url)

    // track was not found
    if (!track) {
        return null
    }

    const availablePlaylists = playlists.filter(
		(playlist) => !playlist.tracks.some((playlistTrack) => playlistTrack.url === track.url),
	)

    const handlePlaylistPres = async (playlist: Playlist) => {
        addToPlaylist(track, playlist.name)
       
        // should close modal
        router.dismiss()

        // if the current queue is the playlist we are adding to, add the track at the end of the queue
   
        if(activeQueueId?.startsWith(playlist.name)) {
            await TrackPlayer.add(track)
        }
    }

    return (
      <SafeAreaView>
        <PlaylistsList 
            style={[styles.modalContainer, {paddingTop: headerHeight}]}
            playlists={availablePlaylists} 
            onPlaylistPress={handlePlaylistPres} 
        />
      </SafeAreaView>
        
    )
}

const styles =  StyleSheet.create({
    modalContainer: {
        ...defaultStyles.text,
        paddingHorizontal: screenPadding.horizontal,
         backgroundColor: 'black'
        
    }
})

export default AddToPlaylistModal