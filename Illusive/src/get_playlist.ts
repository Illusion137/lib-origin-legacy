import * as Origin from '../../index'
import { MusicServicePlaylist, MusicServicePlaylistContinuation, Track } from './types'
import { emptyUndefined, extractStringFromPattern, generateNewUID, getMainKey, makeTopic, parseRuns, parseTime, urlToId } from '../../src/utils/util';
import * as SCSearch from '../../src/soundcloud/types/Search';
import { Prefs } from './prefs';
import { CookieJar } from '../../src/utils/cookie_util';
import * as YT_YTCFG from '../../src/youtube/types/YTCFG';
import * as YT_CONTINUATION from "../../src/youtube/types/Continuation";
import * as YTMUSIC_YTCFG from '../../src/youtube_music/types/YTCFG';
import * as YTMUSIC_CONTINUATION from "../../src/youtube_music/types/Continuation";
import { parsePlaylistContinuationContents } from '../../src/youtube/parser';
import { YouTubeTrack } from '../../src/youtube/types/PlaylistResults_0';
import { YouTubeMusicPlaylistTrack } from '../../src/youtube_music/types/PlaylistResults_0';
import { PlaylistResults_1 } from '../../src/youtube_music/types/PlaylistResults_1';
import { ContentItem } from '../../src/spotify/types/UserPlaylist';
import { Item4 } from '../../src/spotify/types/Album';
import { CollectionItem } from '../../src/spotify/types/Collection';
import { AmazonTrack } from '../../src/amazon_music/types/ShowHomeCreateAndBindMethod';
import { AppleTrack } from '../../src/apple_music/types/TrackListSection';
import { AppleUserPlaylistTrack } from '../../src/apple_music/types/UserPlaylist';

export async function musi_get_playlist(url: string): Promise<MusicServicePlaylist> {
    const playlist_response = await Origin.Musi.getPlaylist(url);
    if("error" in playlist_response) return {"title": "", "tracks": [], "playlist_continuation": null};
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
        }),
        "playlist_continuation": null
    };
}

type YouTubePlaylistContinuation = {"ytcfg": YT_YTCFG.YTCFG, "continuation": YT_CONTINUATION.Continuation};
function parse_youtube_playlist_track(track: YouTubeTrack): Track{
    return {
        "uid": generateNewUID(parseRuns(track.title.runs)),
        "title": parseRuns(track.title.runs),
        "artists": [parseRuns(track.shortBylineText.runs)],
        "duration": parseInt(track.lengthSeconds),
        "youtube_id": track.videoId,
    };
}
export async function youtube_get_playlist(url: string): Promise<MusicServicePlaylist> {
    const cookie_jar: CookieJar = Prefs.getPref("youtube_cookie_jar");
    const playlist_id = urlToId(url, "youtube.com/playlist?list=");
    const playlist_response = await Origin.YouTube.getPlaylist({"cookie_jar": cookie_jar}, playlist_id);
    if("error" in playlist_response) return {"title": "", "tracks": [], "playlist_continuation": null};
    return {
        "title": parseRuns(playlist_response.data.playlist_data.title.runs),
        "creator": playlist_response.data.playlist_data.ownerText.runs.map(text => text.text),
        "description": parseRuns(playlist_response.data.playlist_data.descriptionText.runs),
        "tracks": playlist_response.data.tracks.map(track => parse_youtube_playlist_track(track)),
        "playlist_continuation": playlist_response.data.continuation === null ? null : {"ytcfg": playlist_response.icfg.ytcfg, "continuation": playlist_response.data.continuation} as YouTubePlaylistContinuation
    }
}
export async function youtube_get_playlist_continuation(opts: YouTubePlaylistContinuation): Promise<MusicServicePlaylistContinuation>{
    const cookie_jar: CookieJar = Prefs.getPref("youtube_cookie_jar");
    const playlist_response = await Origin.YouTube.getContinuation({"cookie_jar": cookie_jar}, opts.ytcfg, opts.continuation);
    if("error" in playlist_response) return {"tracks": [], "playlist_continuation": null};
    const parsed_playlist = parsePlaylistContinuationContents(playlist_response);
    return {"tracks": parsed_playlist.tracks.map(track => parse_youtube_playlist_track(track as unknown as YouTubeTrack)), "playlist_continuation": {"ytcfg": opts.ytcfg, "continuation": parsed_playlist.continuation} as YouTubePlaylistContinuation}
}

type Runs = {text: string}[];
type YouTubeMusicPlaylistContinuation = {"ytcfg": YTMUSIC_YTCFG.YTCFG, "continuation": YTMUSIC_CONTINUATION.Continuation, "type": "ALBUM" | "PLAYLIST", "artist"?: Runs, "album"?: Runs};
function parse_youtube_music_album_track(track: YouTubeMusicPlaylistTrack, artists: Runs, album: Runs): Track{
    return {
        "uid": generateNewUID(parseRuns(track.flexColumns[0].musicResponsiveListItemFlexColumnRenderer.text.runs)),
        "title": parseRuns(track.flexColumns[0].musicResponsiveListItemFlexColumnRenderer.text.runs),
        "artists": artists.map(run => run.text),
        "duration": parseTime(parseRuns(track.fixedColumns[0].musicResponsiveListItemFixedColumnRenderer.text.runs)),
        "album": emptyUndefined(parseRuns(album)),
        "explicit": track.badges.length >= 1 && track.badges[0].musicInlineBadgeRenderer.icon.iconType == "MUSIC_EXPLICIT_BADGE",
        "youtube_id": track.playlistItemData.videoId,
        "youtubemusic_id": track.playlistItemData.playlistSetVideoId
    }
}
function parse_youtube_music_playlist_track(track: YouTubeMusicPlaylistTrack): Track{
    return {
        "uid": generateNewUID(parseRuns(track.flexColumns[0].musicResponsiveListItemFlexColumnRenderer.text.runs)),
        "title": parseRuns(track.flexColumns[0].musicResponsiveListItemFlexColumnRenderer.text.runs),
        "artists": parseRuns(track.flexColumns[1].musicResponsiveListItemFlexColumnRenderer.text.runs).split(" & "),
        "duration": parseTime(parseRuns(track.fixedColumns[0].musicResponsiveListItemFixedColumnRenderer.text.runs)),
        "album": emptyUndefined(parseRuns(track.flexColumns[2].musicResponsiveListItemFlexColumnRenderer.text.runs)) ,
        "explicit": track.badges.length >= 1 && track.badges[0].musicInlineBadgeRenderer.icon.iconType == "MUSIC_EXPLICIT_BADGE",
        "youtube_id": track.playlistItemData.videoId,
        "youtubemusic_id": track.playlistItemData.playlistSetVideoId
    }
}
export async function youtube_music_get_playlist(url: string): Promise<MusicServicePlaylist> {
    const playlist_response = await Origin.YouTubeMusic.getPlaylist({}, url);
    if("error" in playlist_response) return {"title": "", "tracks": [], "playlist_continuation": null};
    if(url.includes("OLAK5uy_")) { // Album
        return {
            "title": parseRuns(playlist_response.data.playlist_data.title.runs),
            "creator": playlist_response.data.playlist_data.straplineTextOne.runs.map(run => run.text),
            "thumbnail_uri": playlist_response.data.playlist_data.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails[0].url,
            "year": parseInt(playlist_response.data.playlist_data.subtitle.runs[2].text),
            "tracks": playlist_response.data.tracks.map(track => parse_youtube_music_album_track(track, playlist_response.data.playlist_data.straplineTextOne.runs, playlist_response.data.playlist_data.title.runs)),
            "playlist_continuation": playlist_response.data.continuation === null ? null : {"ytcfg": playlist_response.icfg.ytcfg, "continuation": playlist_response.data.continuation, "type": "ALBUM", "artist": playlist_response.data.playlist_data.straplineTextOne.runs, "album": playlist_response.data.playlist_data.title.runs} as YouTubeMusicPlaylistContinuation
        };
    }
    return { //Playlist
        "title": parseRuns(playlist_response.data.playlist_data.title.runs),
        "creator": playlist_response.data.playlist_data.straplineTextOne.runs.map(run => run.text),
        "thumbnail_uri": playlist_response.data.playlist_data.thumbnail.musicThumbnailRenderer.thumbnail.thumbnails[0].url,
        "year": parseInt(playlist_response.data.playlist_data.subtitle.runs[2].text),
        "tracks": playlist_response.data.tracks.map(track => parse_youtube_music_playlist_track(track)),
        "playlist_continuation": playlist_response.data.continuation === null ? null : {"ytcfg": playlist_response.icfg.ytcfg, "continuation": playlist_response.data.continuation, "type": "PLAYLIST"} as YouTubeMusicPlaylistContinuation
    };
}
export async function youtube_music_get_playlist_continuation(opts: YouTubeMusicPlaylistContinuation): Promise<MusicServicePlaylistContinuation>{
    const cookie_jar: CookieJar = Prefs.getPref("youtube_music_cookie_jar");
    const playlist_response = await Origin.YouTubeMusic.getContinuation({"cookie_jar": cookie_jar}, opts.ytcfg, opts.continuation);
    if("error" in playlist_response) return {"tracks": [], "playlist_continuation": null};
    const parsed_playlist = playlist_response as unknown as PlaylistResults_1;
    return {
        "tracks": parsed_playlist.continuationContents.musicPlaylistShelfContinuation.contents.map(track => 
            opts.type === "PLAYLIST" ? parse_youtube_music_playlist_track(track.musicResponsiveListItemRenderer as unknown as YouTubeMusicPlaylistTrack) :
                parse_youtube_music_album_track(track.musicResponsiveListItemRenderer as unknown as YouTubeMusicPlaylistTrack, opts.artist as Runs, opts.album as Runs)
        ), 
        "playlist_continuation": {
            "ytcfg": opts.ytcfg, 
            "continuation": parsed_playlist.continuationContents.musicPlaylistShelfContinuation.continuations === undefined ? null :
                parsed_playlist.continuationContents.musicPlaylistShelfContinuation.continuations,
            "type": opts.type,
            "artist": opts.artist,
            "album": opts.album
        } as YouTubeMusicPlaylistContinuation
    };
}

type SpotifyPlaylistContinuation = {"client": Origin.Spotify.Client, "id": string, "current": number, "total": number, "limit": number, "type": "ALBUM" | "PLAYLIST" | "COLLECTION"};
function parse_spotify_playlist_track(track: ContentItem): Track{
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
}
function parse_spotify_album_track(track: Item4, album_name: string): Track{
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
}
function parse_spotify_collection_track(track: CollectionItem): Track{
    return {
        "uid": generateNewUID(track.track.data.name),
        "title": track.track.data.name,
        "artists": track.track.data.artists.items.map(artist => artist.profile.name),
        "album": track.track.data.albumOfTrack.name,
        "duration": Math.floor(track.track.data.duration.totalMilliseconds/1000),
        "explicit": track.track.data.contentRating.label === "EXPLICIT",
        "spotify_id": track.track._uri
    }
}
export async function spotify_get_playlist(url: string): Promise<MusicServicePlaylist> {
    let playlist_response;
    const cookie_jar: CookieJar = Prefs.getPref("spotify_cookie_jar");
    const playlist_limit: number = Prefs.getPref("spotify_playlist_limit");
    const client = await Origin.Spotify.getClient(url, cookie_jar);
    if("error" in client) return {"title": "", "tracks": [], "playlist_continuation": null};
    const playlist_id = urlToId(url, "open.spotify.com/", "playlist/", "album/", "collection/");
    const playlist_type = urlToId(url, "open.spotify.com/").replace(/.+?\//, '');
    switch(playlist_type){
        case "playlist":   playlist_response = await Origin.Spotify.getPlaylist(playlist_id, {"cookie_jar": cookie_jar, "client": client, "limit": playlist_limit}); break;
        case "album":      playlist_response = await Origin.Spotify.getAlbum(playlist_id, {"cookie_jar": cookie_jar, "client": client, "limit": playlist_limit}); break;
        case "collection": playlist_response = await Origin.Spotify.getCollection({"cookie_jar": cookie_jar, "client": client, "limit": playlist_limit}); break;
        default: return {"title": "", "tracks": [], "playlist_continuation": null};
    }
    if(playlist_response === undefined || "error" in playlist_response) return {"title": "", "tracks": [], "playlist_continuation": null};
    if("playlistV2" in playlist_response.data){
        return {
            "title": playlist_response.data.playlistV2.name,
            "creator": [playlist_response.data.playlistV2.ownerV2.data.username],
            "description": playlist_response.data.playlistV2.description,
            "tracks": playlist_response.data.playlistV2.content.items.map((track) => parse_spotify_playlist_track(track)),
            "playlist_continuation": playlist_limit >= playlist_response.data.playlistV2.content.totalCount ? null : 
                {"client": client, "id": playlist_id, "current": playlist_limit, "total": playlist_response.data.playlistV2.content.totalCount, "limit": playlist_limit, "type": "PLAYLIST" } as SpotifyPlaylistContinuation
        }
    }
    else if("albumUnion" in playlist_response.data){
        const album_name = playlist_response.data.albumUnion.name;
        return {
            "title": album_name,
            "creator": playlist_response.data.albumUnion.artists.items.map(artist => artist.profile.name),
            "thumbnail_uri": playlist_response.data.albumUnion.coverArt.sources[0].url,
            "year": new Date(playlist_response.data.albumUnion.date.isoString).getFullYear(),
            "tracks": playlist_response.data.albumUnion.tracks.items.map(track => parse_spotify_album_track(track, album_name)),
            "playlist_continuation": playlist_limit >= playlist_response.data.albumUnion.tracks.totalCount ? null : 
                {"client": client, "id": playlist_id, "current": playlist_limit, "total": playlist_response.data.albumUnion.tracks.totalCount, "limit": playlist_limit, "type": "ALBUM" } as SpotifyPlaylistContinuation
        }
    }
    else{
        return {
            "title": "spotify-lib",
            "tracks": playlist_response.data.me.library.tracks.items.map(track => parse_spotify_collection_track(track)),
            "playlist_continuation": playlist_limit >= playlist_response.data.me.library.tracks.totalCount ? null : 
                {"client": client, "id": playlist_id, "current": playlist_limit, "total": playlist_response.data.me.library.tracks.totalCount, "limit": playlist_limit, "type": "COLLECTION" } as SpotifyPlaylistContinuation
        }
    }
}
export async function spotify_get_playlist_continuation(opts: SpotifyPlaylistContinuation): Promise<MusicServicePlaylistContinuation>{
    let playlist_response;
    const cookie_jar: CookieJar = Prefs.getPref("spotify_cookie_jar");
    switch(opts.type){
        case "PLAYLIST":   playlist_response = await Origin.Spotify.getPlaylist(opts.id, {"cookie_jar": cookie_jar, "client": opts.client, "limit": opts.limit, "offset": opts.current}); break;
        case "ALBUM":      playlist_response = await Origin.Spotify.getAlbum(opts.id, {"cookie_jar": cookie_jar, "client": opts.client, "limit": opts.limit, "offset": opts.current}); break;
        case "COLLECTION": playlist_response = await Origin.Spotify.getCollection({"cookie_jar": cookie_jar, "client": opts.client, "limit": opts.limit, "offset": opts.current}); break;
        default: return {"tracks": [], "playlist_continuation": null};
    }
    if(playlist_response === undefined || "error" in playlist_response) return {"tracks": [], "playlist_continuation": null};
    if("playlistV2" in playlist_response.data){
        return {
            "tracks": playlist_response.data.playlistV2.content.items.map((track) => parse_spotify_playlist_track(track)),
            "playlist_continuation": opts.current + opts.limit >= playlist_response.data.playlistV2.content.totalCount ? null : 
                {"client": opts.client, "id": opts.id, "current": opts.current + opts.limit, "total": playlist_response.data.playlistV2.content.totalCount, "limit": opts.limit, "type": "PLAYLIST" } as SpotifyPlaylistContinuation
        }
    }
    else if("albumUnion" in playlist_response.data){
        const album_name = playlist_response.data.albumUnion.name;
        return {
            "tracks": playlist_response.data.albumUnion.tracks.items.map(track => parse_spotify_album_track(track, album_name)),
            "playlist_continuation": opts.current + opts.limit >= playlist_response.data.albumUnion.tracks.totalCount ? null : 
                {"client": opts.client, "id": opts.id, "current": opts.current + opts.limit, "total": playlist_response.data.albumUnion.tracks.totalCount, "limit": opts.limit, "type": "ALBUM" } as SpotifyPlaylistContinuation
        }
    }
    else{
        return {
            "tracks": playlist_response.data.me.library.tracks.items.map(track => parse_spotify_collection_track(track)),
            "playlist_continuation": opts.current + opts.limit >= playlist_response.data.me.library.tracks.totalCount ? null : 
                {"client": opts.client, "id": opts.id, "current": opts.current + opts.limit, "total": playlist_response.data.me.library.tracks.totalCount, "limit": opts.limit, "type": "COLLECTION" } as SpotifyPlaylistContinuation
        }
    }
}

function parse_amazon_music_playlist_track(track: AmazonTrack): Track{
    const album_regex = /([a-zA-Z?><{}|!@#$%^&*]+\s?[a-zA-Z?><{}|!@#$%^&*])+/;
    return {
        "uid": generateNewUID(track.primaryText),
        "title": track.primaryText,
        "artists": [track.secondaryText1],
        "duration": parseTime(track.secondaryText3),
        "album": album_regex.exec(track.secondaryText2)?.[0],
        "explicit": track.secondaryText2.includes("[Explicit]"),
        "amazonmusic_id": Origin.AmazonMusic.getTrackID(track)
    }
}
export async function amazon_music_get_playlist(url: string): Promise<MusicServicePlaylist> {
    const playlist_response = await Origin.AmazonMusic.getPlaylist(url, {});
    if("error" in playlist_response) return {"title": "", "tracks": [], "playlist_continuation": null};
    return {
        "title": playlist_response.title,
        "tracks": playlist_response.tracks.map(track => parse_amazon_music_playlist_track(track)),
        "playlist_continuation": null
    };
}

type SoundcloudPlaylistContinuation = {"next_href": string|null, "locale_params": {"client_id": string}, "depth": number};
function parse_soundcloud_artist_track(track: SCSearch.Track): Track{
    return {
        "uid": generateNewUID(track.title),
        "title": makeTopic(track.title),
        "artists": [track.user.username],
        "plays": track.playback_count,
        "duration": Math.floor(track.duration / 1000),
        "soundcloud_id": String(track.id),
        "soundcloud_permalink": track.permalink_url,
        "soundcloud_thumbnail": track.artwork_url
    }
}
export async function soundcloud_get_playlist(url: string): Promise<MusicServicePlaylist> {
    const cookie_jar: CookieJar = Prefs.getPref("soundcloud_cookie_jar");
    const playlist_limit: number = Prefs.getPref("soundcloud_playlist_limit");
    if(url.includes("/sets/")){
        const playlist_path = urlToId(url, "soundcloud.com/");
        const playlist_response = await Origin.SoundCloud.getPlaylist({"cookie_jar": cookie_jar, "playlist_path": playlist_path})
        if("error" in playlist_response) return {"title": "", "tracks": [], "playlist_continuation": null};
        return {
            "title": playlist_response.data.title,
            "creator": [playlist_response.data.user.username],
            "description": playlist_response.data.description,
            "thumbnail_uri": playlist_response.data.artwork_url,
            "year": new Date(playlist_response.data.created_at).getFullYear(),
            "tracks": playlist_response.data.tracks.map(track => {
                return {
                    "uid": generateNewUID(track.title),
                    "title": makeTopic(track.title),
                    "artists": [track.user.username],
                    "plays": track.playback_count,
                    "duration": Math.floor(track.duration / 1000),
                    "soundcloud_id": String(track.id)
                }
            }),
            "playlist_continuation": null
        };
    }
    const client_id = await Origin.SoundCloud.getClientID(cookie_jar);
    if(typeof client_id === "object") return {"title": "", "tracks": [], "playlist_continuation": null};
    const artist_id = urlToId(url, "soundcloud.com/");
    const artist_response = await Origin.SoundCloud.getArtist("TRACKS", {"cookie_jar": cookie_jar, "client_id": client_id, "artist_id": artist_id, "limit": playlist_limit});
    if("error" in artist_response) return {"title": "", "tracks": [], "playlist_continuation": null};
    return {
        "title": artist_response.user.data.username,
        "creator": [artist_response.user.data.username],
        "description": artist_response.user.data.description,
        "thumbnail_uri": artist_response.user.data.avatar_url,
        "year": new Date( artist_response.user.data.created_at ).getFullYear(),
        "tracks": artist_response.artist_data.collection.map(track => parse_soundcloud_artist_track(track)),
        "playlist_continuation": {"next_href": artist_response.artist_data.next_href, "locale_params": {"client_id": client_id}, "depth": 1} as SoundcloudPlaylistContinuation
    };
}
export async function soundcloud_get_playlist_continuation(opts: SoundcloudPlaylistContinuation): Promise<MusicServicePlaylistContinuation>{
    const cookie_jar: CookieJar = Prefs.getPref("soundcloud_cookie_jar");
    if(opts.next_href === null) return {"tracks":[], "playlist_continuation": null}
    const artist_response = await Origin.SoundCloud.continuation(opts.next_href, opts.locale_params, {"cookie_jar": cookie_jar}, opts.depth) as unknown as SCSearch.SearchOf<SCSearch.Track>;
    return {
        "tracks": artist_response.collection.map(track => parse_soundcloud_artist_track(track)),
        "playlist_continuation": {"next_href": artist_response.next_href, "locale_params": opts.locale_params, "depth": 1} as SoundcloudPlaylistContinuation
    };
}

type AppleMusicPlaylistContinuation = {"playlist_id": string, "offset": number, "total": number, "authorization": string};
function parse_apple_music_playlist_track(track: AppleTrack): Track{
    return {
        "uid": generateNewUID(track.title),
        "title": track.title,
        "artists": track.subtitleLinks.map(link => link.title),
        "album": track.tertiaryLinks?.[0]?.title,
        "duration": Math.floor(track.duration / 1000),
        "explicit": track.showExplicitBadge,
        "applemusic_id": track.id
    }
}
function parse_apple_music_user_playlist_track(track: AppleUserPlaylistTrack): Track{
    return {
        "uid": generateNewUID(track.attributes.name),
        "title": track.attributes.name,
        "artists": track.attributes.artistName.split(" & "),
        "album": track.attributes.albumName,
        "duration": Math.floor(track.attributes.durationInMillis / 1000),
        "explicit": track.attributes.contentRating !== undefined && track.attributes.contentRating === "explicit",
        "applemusic_id": track.id
    };
}
export async function apple_music_get_playlist(url: string): Promise<MusicServicePlaylist> {
    const cookie_jar: CookieJar = Prefs.getPref("apple_music_cookie_jar");
    const playlist_path = urlToId(url, "music.apple.com/");
    const playlist_response = await Origin.AppleMusic.getPlaylist(playlist_path, {"cookie_jar": cookie_jar});
    if("error" in playlist_response) return {"title": "", "tracks": [], "playlist_continuation": null};
    if("resources" in playlist_response.data){ // User Playlist
        const playlist_data_main_key = getMainKey(playlist_response.data.resources.playlists);
        const playlist_data = playlist_response.data.resources.playlists[playlist_data_main_key];
        const playlist_songs = playlist_response.data.resources['library-songs'];
        const playlist_id = urlToId(playlist_path, "us/", "library/", "playlist/", "?l=en-US");
        const song_keys = Object.keys(playlist_songs);

        const playlist_meta_main_key = getMainKey(playlist_response.data.resources["library-playlists"]);

        return {
            "title": playlist_data.attributes.name,
            "creator": [playlist_data.attributes.curatorName],
            "thumbnail_uri": playlist_data.attributes.artwork.url,
            "description": playlist_data.attributes.description.standard,
            "year": new Date(playlist_data.attributes.lastModifiedDate).getFullYear(),
            "tracks": song_keys.map(key => parse_apple_music_user_playlist_track(playlist_songs[key])), 
            "playlist_continuation": {"playlist_id": playlist_id, "offset": 0 + song_keys.length, "total": playlist_response.data.resources["library-playlists"][playlist_meta_main_key].relationships.tracks.meta.total, "authorization": playlist_response.authorization} as AppleMusicPlaylistContinuation
        };
    }
    else {
        return {
            "title": playlist_response.data.sections[0].items[0].title,
            "creator": playlist_response.data.sections[0].items[0].subtitleLinks.map(link => link.title),
            "thumbnail_uri": playlist_response.data.sections[0].items[0].artwork.dictionary.url,
            "tracks": playlist_response.data.sections[1].items.map(track => parse_apple_music_playlist_track(track)), 
            "playlist_continuation": null
        };
    }
}
export async function apple_music_get_playlist_continuation(opts: AppleMusicPlaylistContinuation): Promise<MusicServicePlaylistContinuation>{
    const cookie_jar: CookieJar = Prefs.getPref("apple_music_cookie_jar");
    if(opts.offset >= opts.total) return { "tracks":[], "playlist_continuation": null };
    const playlist_response = await Origin.AppleMusic.getPlaylistContinuation(opts.playlist_id, opts.offset, opts.authorization, {"cookie_jar": cookie_jar});
    if("error" in playlist_response) return { "tracks":[], "playlist_continuation": null };
    const playlist_songs = playlist_response.resources['library-songs'];
    const song_keys = Object.keys(playlist_songs);
    return {
        "tracks": song_keys.map(key => parse_apple_music_user_playlist_track(playlist_songs[key])),
        "playlist_continuation": {"playlist_id": opts.playlist_id, "offset": opts.offset + song_keys.length, "total": opts.total, "authorization": opts.authorization} as AppleMusicPlaylistContinuation
    }
}

export async function illusi_get_playlist(url: string): Promise<MusicServicePlaylist> {
    const playlist_response = await fetch(url);
    if(!playlist_response.ok) return {"title": "", "tracks": [], "playlist_continuation": null};
    return await playlist_response.json();
}

export async function api_get_playlist(url: string): Promise<MusicServicePlaylist> {
    const playlist_response = await fetch(url);
    if(!playlist_response.ok) return {"title": "", "tracks": [], "playlist_continuation": null};
    return await playlist_response.json();
}