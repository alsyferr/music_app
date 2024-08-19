import library from "@/assets/data/library.json"
import { FlatList, FlatListProps, Text, View } from "react-native"
import { TrackListItem } from "@/components/TrackListItem"
import { utilsStyles } from "@/styles"
import TrackPlayer, { Track } from "react-native-track-player"
import FastImage from "react-native-fast-image"
import { unknownTrackImageUri } from "@/constants/images"
import { useRef } from "react"
import { useQueue } from "@/store/queue"
import { QueueControls } from "./QueueControls"

export type TrackListProp = Partial<FlatListProps<Track>> & {
  id: string
  tracks: Track[]
  hideQueControls?: boolean
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

export const TrackList = ({id, tracks, hideQueControls = false, ...flatListProps}: TrackListProp) => {
  const queueOffset = useRef(0)
  const {activeQueueId, setActiveQueueId} = useQueue()

  const handleTrackSelect = async (selectedTrack: Track) => {
    // await TrackPlayer.load(track)
    // await TrackPlayer.play()
    // console.log(track)
    const trackIndex = tracks.findIndex((track) => track.url === selectedTrack.url)

    if(trackIndex === 1) return

    const isChangingQueue = id !== activeQueueId

    if (isChangingQueue) {
      const beforeTracks = tracks.slice(0, trackIndex)
      const afterTracks = tracks.slice(trackIndex + 1)

      // we construct the new queue
      await TrackPlayer.reset()
      await TrackPlayer.add(selectedTrack)
      await TrackPlayer.add(afterTracks)
      await TrackPlayer.add(beforeTracks)

      await TrackPlayer.play()

      queueOffset.current = trackIndex
      setActiveQueueId(id)

    } else {
      const nextTrackIndex = trackIndex - queueOffset.current < 0
        ? tracks.length + trackIndex - queueOffset.current
        : trackIndex - queueOffset.current
      
      await TrackPlayer.skip(nextTrackIndex)
      TrackPlayer.play()
    }
  }

  return (
    <FlatList 
        data={tracks} 
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 128}}
        ListHeaderComponent={
          !hideQueControls ? ( 
          <QueueControls tracks={tracks} style={{paddingBottom: 20}} />
          ) : undefined
        }
        ItemSeparatorComponent={ItemDivider}
        ListFooterComponent={ItemDivider}
        ListEmptyComponent={<View>
          <Text style={utilsStyles.emptyContentText}>No songs found</Text>

          <FastImage
             source={{ uri: unknownTrackImageUri, priority: FastImage.priority.normal}}
             style={utilsStyles.emptyContentImage}
          /> 
        </View>}
        renderItem={({item: track}) => (
            <TrackListItem 
              track={track}
              onTrackSelect={handleTrackSelect}
            />
        )}
        {...flatListProps}
    />
  )
}

