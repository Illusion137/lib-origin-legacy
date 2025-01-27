import * as Origin from '../../index'
import { Playlist, User, Track } from '../../src/soundcloud/types/Search';
import { generateNewUID, makeTopic, parseRuns, parseTime } from '../../src/utils/util';
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
                "artists": track.item.data.artists.items.map(artist => makeTopic(artist.profile.name)),
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
                "artist": [makeTopic(playlist.data.ownerV2.data.name)],
            }
        }),
        "albums": search_response.data.searchV2.albumsV2.items.map(album => {
            return {
                "title": album.data.name,
                "artist": [makeTopic(album.data.artists.items[0].profile.name)],
                "uri": album.data.uri,
                "thumbnail_uri": album.data.coverArt.sources[0].url,
                "year": album.data.date.year
            }
        }),
        "artists": search_response.data.searchV2.artists.items.map(artist => {
            return {
                "name": makeTopic(artist.data.profile.name),
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
                "artists": [makeTopic(track.secondaryText!)],
                "duration": NaN,
                "explicit": track.tags.includes("E"),
                "amazonmusic_id": Origin.AmazonMusic.getTrackID(track)
            }
        }),
        "playlists": [],
        "albums": [],
        "artists": []
    }
}

export async function youtube_search(query: string): Promise<MusicSearchResponse> {
    const search_response = await Origin.YouTube.search({}, query);
    if("error" in search_response){
        return {
            "tracks": [],
            "playlists": [],
            "albums": [],
            "artists": []
        }
    }
    return {
        "tracks": search_response.data.videos.map(track => {
            return {
                "uid": generateNewUID(parseRuns(track.title.runs)),
                "title": parseRuns(track.title.runs),
                "artists": [parseRuns(track.shortBylineText.runs)],
                "duration": parseTime(track.lengthText.simpleText),
                "youtube_id": track.videoId,
            }
        }),
        "playlists": [],
        "albums": [],
        "artists": search_response.data.artists.map(artist => {
            return {
                "uri": artist.channelId,
                "name": artist.title.simpleText,
                "profile_thumbnail_uri": artist.thumbnail.thumbnails[0].url,
            }
        })
    }
}

export async function youtube_music_search(query: string): Promise<MusicSearchResponse> {
    const search_response = await Origin.YouTubeMusic.search({}, query);
    if("error" in search_response){
        return {
            "tracks": [],
            "playlists": [],
            "albums": [],
            "artists": []
        }
    }
    return {
        "tracks": [],
        "playlists": [],
        "albums": [],
        "artists": []
    }
}

export async function soundcloud_search(query: string): Promise<MusicSearchResponse> {
    const search_response = await Origin.SoundCloud.search("EVERYTHING", {"query": query});
    if("error" in search_response){
        return {
            "tracks": [],
            "playlists": [],
            "albums": [],
            "artists": []
        }
    }
    const playlists_and_albums = search_response.collection.filter(item => item.kind === "playlist") as Playlist[];
    const playlists = playlists_and_albums.filter(item => item.is_album === false);
    const albums = playlists_and_albums.filter(item => item.is_album === false);
    const users = search_response.collection.filter(item => item.kind === "user") as User[];
    const tracks = search_response.collection.filter(item => item.kind === "track") as Track[];

    return {
        "tracks": tracks.map(track => {
            return {
                "uid": generateNewUID(track.title),
                "title": track.title,
                "artists": [makeTopic(track.user.username)],
                "duration": Math.floor(track.full_duration / 1000),
                "soundcloud_id": String(track.id),
                "soundcloud_permalink": track.permalink_url,
                "soundcloud_thumbnail": track.artwork_url
            }
        }),
        "playlists": playlists.map(playlist => {
            return {
                "title": playlist.title,
                "artist": Array.isArray(playlist.user) ? playlist.user.map(user => makeTopic(user.username)) : [makeTopic(playlist.user.username)],
                "uri": String(playlist.id),
                "year": new Date(playlist.created_at).getFullYear(),
                "thumbnail_uri": playlist.artwork_url
            }
        }),
        "albums": albums.map(album => {
            return {
                "title": album.title,
                "artist": Array.isArray(album.user) ? album.user.map(user => makeTopic(user.username)) : [makeTopic(album.user.username)],
                "uri": String(album.id),
                "year": new Date(album.created_at).getFullYear(),
                "thumbnail_uri": album.artwork_url
            }
        }),
        "artists": users.map(artist => {
            return {
                "name": makeTopic(artist.username),
                "profile_thumbnail_uri": artist.avatar_url,
                "uri": String(artist.id)
            }
        })
    }
}