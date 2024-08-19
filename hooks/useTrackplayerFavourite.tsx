import { useFavourites } from "@/store/library"
import { useCallback } from "react"
import TrackPlayer, { useActiveTrack } from "react-native-track-player"

export const useTrackplayerFavourite = () => {
    const activeTrack = useActiveTrack()

    const {favourites, toggleTrackFavourite} = useFavourites()

    const isFavourite = favourites.find((track) => track.url === activeTrack?.url)?.rating === 1

    // we are updating both the track player internal state and application state

    const toggleFavourite = useCallback(async () => {
        const id = await TrackPlayer.getActiveTrackIndex()

        if (id == null) return

        // update track player internal state

        await TrackPlayer.updateMetadataForTrack(id, {
            rating: isFavourite ? 0 : 1
        })

        // update the app internal state
        if (activeTrack) {
            toggleTrackFavourite(activeTrack)
        }
    }, [isFavourite, toggleTrackFavourite, activeTrack])

    return {isFavourite, toggleFavourite}
} 