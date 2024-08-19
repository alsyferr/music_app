import { Artist, Playlist, TrackWithPlaylist } from "@/helpers/types";
import { Track } from "react-native-track-player";
import { create } from "zustand";
import library from '@/assets/data/library.json'
import { unknownTrackImageUri } from "@/constants/images";

interface LibraryState {
    tracks: TrackWithPlaylist[]
    toggleTrackFavourite: (track: Track) => void
    addPlaylist: (track: Track, playlistName: string) => void
}

export const useLibraryStore =  create<LibraryState>()((set) => ({
    tracks: library,
    toggleTrackFavourite: (track) => set((state) => ({
        tracks: state.tracks.map((currentTrack) => {
            if(currentTrack.url === track.url) {
                return {
                    ...currentTrack,
                    rating: currentTrack.rating === 1 ? 0 : 1
                }
            }

            return currentTrack
        }),
    })),


    addPlaylist: (track, playlistName) => {
        set((state) => ({
            tracks: state.tracks.map((currentTrack) => {
                if (currentTrack.url === track.url) {
                    return {
                        ...currentTrack,
                        playlist: [...(currentTrack.playlist ?? []), playlistName]
                    }
                }

                return currentTrack
            })
        }))
    }

}))

export const useTracks = () => useLibraryStore((state) => state.tracks)

export const useFavourites = () => {
    const favourites = useLibraryStore((state) => state.tracks.filter((track) => track.rating === 1))
    const toggleTrackFavourite = useLibraryStore(state => state.toggleTrackFavourite)

    return {
        favourites,
        toggleTrackFavourite
    }
}

export const useArtists = () => 
    useLibraryStore((state) => {
        return state.tracks.reduce((acc, track) => {
            const existingArtist = acc.find((artist) => artist.name === track.artist)

            if (existingArtist) {
                existingArtist.tracks.push(track)
            } else {
                acc.push({
                    name: track.artist ?? "Unknown",
                    tracks: [track],
                })
            }

            return acc
        }, [] as Artist[])
    })


export const usePlaylists = () => {
    const playlists =  useLibraryStore((state) => {
        return state.tracks.reduce((acc, track) => {
            track.playlist?.forEach((playlistName) => {
                const existingPlaylist = acc.find((playlist) => playlist.name === playlistName)
                if (existingPlaylist) {
                    existingPlaylist.tracks.push(track)
                } else {
                    acc.push({
                        name: playlistName,
                        tracks: [track],
                        artworkPreview: track.artwork ?? unknownTrackImageUri,
                    })
                }
            })

            return acc
        }, [] as Playlist[])
    })

    const addToPlaylist = useLibraryStore(state => state.addPlaylist)

    return {playlists, addToPlaylist}
}