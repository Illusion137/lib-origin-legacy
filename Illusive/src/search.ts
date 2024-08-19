import * as Origin from '../../index'
import { generateNewUID, parseTime } from '../../src/utils/util';
import { MusicSearchResponse } from './types';

export async function spotify_search(query: string): Promise<MusicSearchResponse>{
    const search_response = await Origin.Spotify.search(query, {});
    if("error" in search_response){
        return {
            "tracks": [],
            "playlists": [],
            "albums": [],
            "artists": []
        }
    }
    search_response.data.searchV2.topResultsV2.itemsV2
    return {
        "tracks": search_response.data.searchV2.tracksV2.items.map(track => {
            return {
                "uid": generateNewUID(track.item.data.name),
                "title": track.item.data.name,
                "artists": track.item.data.artists.items.map(artist => artist.profile.name),
                "album": track.item.data.albumOfTrack.name,
                "duration": Math.floor(track.item.data.duration.totalMilliseconds/1000),
                "explicit": track.item.data.contentRating.label === "EXPLICIT",
                "spotify_id": track.item.data.uri
            }
        }),
        "playlists": search_response.data.searchV2.playlists.items.map(playlist => {
            return {
                "title": playlist.data.name,
                "uri": playlist.data.uri,
                "artist": playlist.data.ownerV2.data.name,
            }
        }),
        "albums": search_response.data.searchV2.albumsV2.items.map(album => {
            return {
                "title": album.data.name,
                "artist": album.data.artists.items[0].profile.name,
                "uri": album.data.uri,
                "thumbnail_uri": album.data.coverArt.sources[0].url,
                "year": album.data.date.year
            }
        }),
        "artists": search_response.data.searchV2.artists.items.map(artist => {
            return {
                "name": artist.data.profile.name,
                "uri": artist.data.uri,
                "profile_thumbnail_uri": artist.data.visuals.avatarImage?.sources[0].url as string
            }
        })
    }
}

export async function amazon_music_search(query: string): Promise<MusicSearchResponse> {
    const search_response = await Origin.AmazonMusic.search(query, {});
    if("error" in search_response){
        return {
            "tracks": [],
            "playlists": [],
            "albums": [],
            "artists": []
        }
    }
    return {
        "tracks": search_response.map(track => {
            return {
                "uid": generateNewUID(track.primaryText.text),
                "title": track.primaryText.text,
                "artists": [track.secondaryText as string],
                "duration": NaN,
                "explicit": track.tags.includes("E"),
                "amazonmusic_id": track.primaryLink.deeplink
            }
        }),
        "playlists": [],
        "albums": [],
        "artists": []
    }
}