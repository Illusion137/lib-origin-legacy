import * as Origin from '../../index'
import { Track } from './types';

export async function spotify_add_tracks_to_playlist(tracks: Track[], playlist_uri: string | "LIBRARY") {
    tracks = tracks.filter(track => track.spotify_id !== undefined && track.spotify_id !== "");
    const uris = tracks.map(track => track.spotify_id) as string[];
    let add_response;
    if(playlist_uri == "LIBRARY") add_response = await Origin.Spotify.addTracksToLibrary({"uris": uris});
    else                          add_response = await Origin.Spotify.addTracksToPlaylist({"playlist_uri": playlist_uri, "uris": uris});
    if("error" in add_response) return false;
    return add_response.ok;
}
export async function spotify_delete_tracks_from_playlist(tracks: Track[], playlist_uri: string | "LIBRARY") {
    tracks = tracks.filter(track => track.spotify_id !== undefined && track.spotify_id !== "");
    const uris = tracks.map(track => track.spotify_id) as string[];
    let deletion_response;
    if(playlist_uri == "LIBRARY") deletion_response = await Origin.Spotify.deleteTracksFromLibrary({"uris": uris});
    else                          deletion_response = await Origin.Spotify.deleteTracksFromPlaylist({"playlist_uri": playlist_uri, "uids": uris});
    if("error" in deletion_response) return false;
    return deletion_response.ok;
}

export async function amazon_music_add_tracks_to_playlist(tracks: Track[], playlist_url: string) {
    tracks = tracks.filter(track => track.amazonmusic_id !== undefined && track.amazonmusic_id !== "");
    const uris = tracks.map(track => track.amazonmusic_id) as string[];
    const playlist_response = await Origin.AmazonMusic.getPlaylist(playlist_url, {});
    if("error" in playlist_response) return false;
    const add_response = await Origin.AmazonMusic.addToPlaylist(playlist_url, playlist_response.title, uris, {});
    if("error" in add_response) return false;
    return add_response.ok;
}
export async function amazon_music_delete_tracks_from_playlist(tracks: Track[], playlist_url: string) {
    tracks = tracks.filter(track => track.amazonmusic_id !== undefined && track.amazonmusic_id !== "");
    const uris = tracks.map(track => track.amazonmusic_id) as string[];
    const deletion_response = await Origin.AmazonMusic.deleteFromPlaylist(playlist_url, uris, 0, {});
    if("error" in deletion_response) return false;
    return deletion_response.ok;
}

export async function youtube_add_tracks_to_playlist(tracks: Track[], playlist_url: string) {
    tracks = tracks.filter(track => track.youtube_id !== undefined && track.youtube_id !== "");
    const uris = tracks.map(track => track.youtube_id) as string[];
    const home = await Origin.YouTube.getHome({});
    if("error" in home) return false;
    const add_response = await Origin.YouTube.addTracksToPlaylist({}, home.icfg.ytcfg, Origin.YouTube.playlistURLToID(playlist_url), uris);
    return add_response;
}
export async function youtube_delete_tracks_from_playlist(tracks: Track[], playlist_url: string) {
    tracks = tracks.filter(track => track.youtube_id !== undefined && track.youtube_id !== "");
    const uris = tracks.map(track => track.youtube_id as string );
    const home = await Origin.YouTube.getHome({});
    if("error" in home) return false;
    const deletion_response = await Origin.YouTube.removeTracksToPlaylist({}, home.icfg.ytcfg, Origin.YouTube.playlistURLToID(playlist_url), uris);
    return deletion_response;
}

export async function youtube_music_add_tracks_to_playlist(tracks: Track[], playlist_url: string) {
    tracks = tracks.filter(track => track.youtubemusic_id !== undefined && track.youtubemusic_id !== "");
    const uris = tracks.map(track => track.youtubemusic_id) as string[];
    const home = await Origin.YouTubeMusic.getHome({});
    if("error" in home) return false;
    const add_response = await Origin.YouTubeMusic.addTracksToPlaylist({}, home.icfg.ytcfg, Origin.YouTubeMusic.playlistURLToID(playlist_url), uris);
    return add_response;
}
export async function youtube_music_delete_tracks_from_playlist(tracks: Track[], playlist_url: string) {
    tracks = tracks.filter(track => track.youtubemusic_id !== undefined && track.youtubemusic_id !== "");
    const uris = tracks.map(track => {
        return {
            video_id: track.youtube_id as string,
            set_video_id: track.youtubemusic_id as string
        }
    });
    const home = await Origin.YouTubeMusic.getHome({});
    if("error" in home) return false;
    const deletion_response = await Origin.YouTubeMusic.removeTracksToPlaylist({}, home.icfg.ytcfg, Origin.YouTubeMusic.playlistURLToID(playlist_url), uris);
    return deletion_response;
}