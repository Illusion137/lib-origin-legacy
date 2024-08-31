import * as Origin from '../../index'
import { generateNewUID, parseRuns, parseTime } from '../../src/utils/util';
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
                "artist": [playlist.data.ownerV2.data.name],
            }
        }),
        "albums": search_response.data.searchV2.albumsV2.items.map(album => {
            return {
                "title": album.data.name,
                "artist": [album.data.artists.items[0].profile.name],
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
                "uid": generateNewUID(parseRuns(track.videoWithContextRenderer.headline.runs)),
                "title": parseRuns(track.videoWithContextRenderer.headline.runs),
                "artists": [parseRuns(track.videoWithContextRenderer.shortBylineText.runs)],
                "duration": parseTime(parseRuns(track.videoWithContextRenderer.lengthText.runs)),
                "youtube_id": track.videoWithContextRenderer.videoId,
            }
        }),
        "playlists": search_response.data.playlists.map(playlist => {
            return {
                "title": parseRuns(playlist.compactPlaylistRenderer.title.runs),
                "artist":[parseRuns(playlist.compactPlaylistRenderer.shortBylineText.runs)],
                "uri": playlist.compactPlaylistRenderer.playlistId,
                "thumbnail_uri": playlist.compactPlaylistRenderer.thumbnail.thumbnails[0].url,
            }
        }),
        "albums": [],
        "artists": search_response.data.artists.map(artist => {
            return {
                "uri": artist.compactChannelRenderer.channelId,
                "name": parseRuns(artist.compactChannelRenderer.title.runs),
                "profile_thumbnail_uri": artist.compactChannelRenderer.thumbnail.thumbnails[0].url,
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
    const search_response = await Origin.SoundCloud.search("TRACKS", {"query": query});
    if("error" in search_response){
        return {
            "tracks": [],
            "playlists": [],
            "albums": [],
            "artists": []
        }
    }
    const playlists_and_albums = search_response.collection.filter(item => item.kind === "playlist");
    const playlists = playlists_and_albums.filter(item => item.is_album === false);
    const albums = playlists_and_albums.filter(item => item.is_album === false);
    const users = search_response.collection.filter(item => item.kind === "user");
    const tracks = search_response.collection.filter(item => item.kind === "track");

    return {
        "tracks": tracks.map(track => {
            return {
                "uid": generateNewUID(track.title),
                "title": track.title,
                "artists": [track.user.username],
                "duration": Math.floor(track.full_duration / 1000),
                "soundcloud": track.id
            }
        }),
        "playlists": playlists.map(playlist => {
            return {
                "title": playlist.title,
                "artist": Array.isArray(playlist.user) ? playlist.user.map(user => user.username) : [playlist.user.username],
                "uri": String(playlist.id),
                "year": new Date(playlist.created_at).getFullYear(),
                "thumbnail_uri": playlist.artwork_url
            }
        }),
        "albums": albums.map(album => {
            return {
                "title": album.title,
                "artist": Array.isArray(album.user) ? album.user.map(user => user.username) : [album.user.username],
                "uri": String(album.id),
                "year": new Date(album.created_at).getFullYear(),
                "thumbnail_uri": album.artwork_url
            }
        }),
        "artists": users.map(artist => {
            return {
                "name": artist.username,
                "profile_thumbnail_uri": artist.avatar_url,
                "uri": String(artist.id)
            }
        })
    }
}