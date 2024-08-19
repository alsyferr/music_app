import { useFavourites } from "@/store/library"
import { useQueue } from "@/store/queue"
import { MenuView } from "@react-native-menu/menu"
import { useRouter } from "expo-router"
import { PropsWithChildren } from "react"
import TrackPlayer, { Track } from "react-native-track-player"
import { match } from "ts-pattern"

type TrackShortcutsMenuProps = PropsWithChildren<{track: Track}>

export const TrackShortcutsMenu = ({track, children}: TrackShortcutsMenuProps) => {
    const router = useRouter()

    const isFavourite = track.rating === 1

    const { toggleTrackFavourite} = useFavourites()
    const { activeQueueId } = useQueue()

    const handlePressActions = (id: string) => {
        match(id).with('add-to-favourites', async() => {
            toggleTrackFavourite(track)

            // if the track is in the favourite queue, add it
            if (activeQueueId?.startsWith('favourites')) {
                await TrackPlayer.add(track)
            }
        })
        .with('remove-from-favourites', async() => {
            toggleTrackFavourite(track)

            // if the track is in the favourite queue, remove it
            if (activeQueueId?.startsWith('favourites')) {
                const queue = await TrackPlayer.getQueue()

                const trackToReemove = queue.findIndex(queueTrack => queueTrack.url === track.url)

                await TrackPlayer.remove(trackToReemove)
            }

        })
        .with('add-to-playlist', () => {
            // it opens the addToPlaylist modal
            // @ts-expect-error it should work
            router.push({ pathname: '(modals)/addToPlaylist', params: {
                trackUrl : track.url
            }})
        })
        .otherwise(() => console.warn(`Unknown menu action ${id}`))
    }

    return (
        <MenuView
        onPressAction={({nativeEvent: {event}}) => handlePressActions(event)}
        actions={[
            {
                id: isFavourite ? 'remove-from-favourites' : 'add-to-favourites',
                title: isFavourite ? 'Remove from favourites' : 'Add to favourites',
                image: isFavourite ? 'star.fill' : 'star'
            },
            {
              id: 'add-to-playlist',
              title: 'Add to playlist',
              image: 'ic_menu_add',
            }
        ]}
        >
         {children}   
        </MenuView>
    )
}