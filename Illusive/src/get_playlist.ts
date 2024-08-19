import * as Origin from '../../index'
import { MusicServicePlaylist } from './types'
import { extractStringFromPattern, generateNewUID, parseRuns, parseTime } from '../../src/utils/util';

export async function musi_get_playlist(url: string): Promise<MusicServicePlaylist> {
    const playlist_response = await Origin.Musi.getPlaylist(url);
    if("error" in playlist_response) return {"title": "", "tracks": []};
    return {
        "title": playlist_response.success.data.title,
        "tracks": playlist_response.success.data.data.map((track) => {
            return {
                "uid": generateNewUID(track.video_name),
                "title": track.video_name,
                "artists": [track.video_creator],
                "duration": track.video_duration,
                "youtube_id": track.video_id
            }
        })
    };
}

// export async function youtube_get_playlist(url: string): Promise<MusicServicePlaylist> {

// }

export async function youtube_music_get_playlist(url: string): Promise<MusicServicePlaylist> {
    const playlist_response = await Origin.YouTubeMusic.getPlaylist({}, url);
    if(url.includes("OLAK5uy_")) { // Album
        return {
            "title": parseRuns(playlist_response.data.playlist_data.title.runs),
            "creator": playlist_response.data.playlist_data.straplineTextOne.runs.map(run => run.text),
            "thumbnail_uri": playlist_response.data.playlist_data.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails[0].url,
            "year": parseInt(playlist_response.data.playlist_data.subtitle.runs[2].text),
            "tracks": playlist_response.data.tracks.map(track => { return {
                "uid": generateNewUID(parseRuns(track.musicResponsiveListItemRenderer.flexColumns[0].musicResponsiveListItemFlexColumnRenderer.text.runs ?? [])),
                "title": parseRuns(track.musicResponsiveListItemRenderer.flexColumns[0].musicResponsiveListItemFlexColumnRenderer.text.runs ?? []),
                "artists": playlist_response.data.playlist_data.straplineTextOne.runs.map(run => run.text),
                "duration": parseTime(parseRuns(track.musicResponsiveListItemRenderer.flexColumns[3].musicResponsiveListItemFlexColumnRenderer.text.runs ?? [])),
                "album": parseRuns(playlist_response.data.playlist_data.title.runs),
                "explicit": track.musicResponsiveListItemRenderer.badges.length >= 1 && track.musicResponsiveListItemRenderer.badges[0].musicInlineBadgeRenderer.icon.iconType == "MUSIC_EXPLICIT_BADGE",
                "youtube_id": track.musicResponsiveListItemRenderer.playlistItemData.videoId,
                "youtubemusic_id": track.musicResponsiveListItemRenderer.playlistItemData.playlistSetVideoId
            }}),
        };
    }
    return { //Playlist
        "title": parseRuns(playlist_response.data.playlist_data.title.runs),
        "creator": playlist_response.data.playlist_data.straplineTextOne.runs.map(run => run.text),
        "thumbnail_uri": playlist_response.data.playlist_data.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails[0].url,
        "year": parseInt(playlist_response.data.playlist_data.subtitle.runs[2].text),
        "tracks": playlist_response.data.tracks.map(track => { return {
            "uid": generateNewUID(parseRuns(track.musicResponsiveListItemRenderer.flexColumns[0].musicResponsiveListItemFlexColumnRenderer.text.runs ?? [])),
            "title": parseRuns(track.musicResponsiveListItemRenderer.flexColumns[0].musicResponsiveListItemFlexColumnRenderer.text.runs ?? []),
            "artists": parseRuns(track.musicResponsiveListItemRenderer.flexColumns[1].musicResponsiveListItemFlexColumnRenderer.text.runs ?? []).split(" & "),
            "duration": parseTime(parseRuns(track.musicResponsiveListItemRenderer.flexColumns[3].musicResponsiveListItemFlexColumnRenderer.text.runs ?? [])),
            "album": parseRuns(playlist_response.data.playlist_data.title.runs),
            "explicit": track.musicResponsiveListItemRenderer.badges.length >= 1 && track.musicResponsiveListItemRenderer.badges[0].musicInlineBadgeRenderer.icon.iconType == "MUSIC_EXPLICIT_BADGE",
            "youtube_id": track.musicResponsiveListItemRenderer.playlistItemData.videoId,
            "youtubemusic_id": track.musicResponsiveListItemRenderer.playlistItemData.playlistSetVideoId
        }})
    };
}

export async function spotify_get_playlist(url: string): Promise<MusicServicePlaylist> {
    let playlist_response;
    switch(extractStringFromPattern(url, /a/g)){
        case "playlist":   playlist_response = await Origin.Spotify.getPlaylist(url, {"limit": 200}); break;
        case "album":      playlist_response = await Origin.Spotify.getAlbum(url, {"limit": 200}); break;
        case "collection": playlist_response = await Origin.Spotify.getCollection(url, {"limit": 200}); break;
        default: return {"title": "", "tracks": []};
    }
    if(playlist_response === undefined || "error" in playlist_response) return {"title": "", "tracks": []};
    if("playlistV2" in playlist_response.data){
        return {
            "title": playlist_response.data.playlistV2.name,
            "creator": [playlist_response.data.playlistV2.ownerV2.data.username],
            "description": playlist_response.data.playlistV2.description,
            "tracks": playlist_response.data.playlistV2.content.items.map((track) => {
                return {
                    "uid": generateNewUID(track.itemV2.data.name),
                    "title": track.itemV2.data.name,
                    "artists": track.itemV2.data.artists.items.map(artist => artist.profile.name),
                    "plays": parseInt(track.itemV2.data.playcount),
                    "album": track.itemV2.data.albumOfTrack.name,
                    "duration": Math.floor(track.itemV2.data.trackDuration.totalMilliseconds/1000),
                    "explicit": track.itemV2.data.contentRating.label === "EXPLICIT",
                    "spotify_id": track.itemV2.data.uri
                }
            }),
        }
    }
    else if("albumUnion" in playlist_response.data){
        const album_name = playlist_response.data.albumUnion.name;
        return {
            "title": album_name,
            "creator": playlist_response.data.albumUnion.artists.items.map(artist => artist.profile.name),
            "thumbnail_uri": playlist_response.data.albumUnion.coverArt.sources[0].url,
            "year": new Date(playlist_response.data.albumUnion.date.isoString).getFullYear(),
            "tracks": playlist_response.data.albumUnion.tracks.items.map(track => {
                return {
                    "uid": generateNewUID(track.track.name),
                    "title": track.track.name,
                    "artists": track.track.artists.items.map(artist => artist.profile.name),
                    "plays": parseInt(track.track.playcount),
                    "album": album_name,
                    "duration": Math.floor(track.track.duration.totalMilliseconds/1000),
                    "explicit": track.track.contentRating.label === "EXPLICIT",
                    "spotify_id": track.track.uri
                }
            })
        }
    }
    else{
        return {
            "title": "spotify-lib",
            "tracks": playlist_response.data.me.library.tracks.items.map(track => {
                return {
                    "uid": generateNewUID(track.track.data.name),
                    "title": track.track.data.name,
                    "artists": track.track.data.artists.items.map(artist => artist.profile.name),
                    "album": track.track.data.albumOfTrack.name,
                    "duration": Math.floor(track.track.data.duration.totalMilliseconds/1000),
                    "explicit": track.track.data.contentRating.label === "EXPLICIT",
                    "spotify_id": track.track._uri
                }
            })
        }
    }
}

export async function amazon_music_get_playlist(url: string): Promise<MusicServicePlaylist> {
    const playlist_response = await Origin.AmazonMusic.getPlaylist(url, {});
    if("error" in playlist_response) return {"title": "", "tracks": []};
    const album_regex = /([a-zA-Z?><{}|!@#$%^&*]+\s?[a-zA-Z?><{}|!@#$%^&*])+/;
    return {
        "title": playlist_response.title,
        "tracks": playlist_response.tracks.map((track) => { 
            return {
                "uid": generateNewUID(track.primaryText),
                "title": track.primaryText,
                "artists": [track.secondaryText1],
                "duration": parseTime(track.secondaryText3),
                "album": album_regex.exec(track.secondaryText2)?.[0],
                "explicit": track.secondaryText2.includes("[Explicit]"),
                "amazonmusic_id": track.primaryLink.deeplink
            }
        })
    };
}

// export async function apple_music_get_playlist(url: string): Promise<MusicServicePlaylist> {

// }

// export async function soundcloud_get_playlist(url: string): Promise<MusicServicePlaylist> {

// }

// export async function pandora_get_playlist(url: string): Promise<MusicServicePlaylist> {

// }