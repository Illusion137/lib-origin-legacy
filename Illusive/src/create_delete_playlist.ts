import * as Origin from '../../index'

export async function spotify_create_playlist(playlist_name: string) {
    const creation_response = await Origin.Spotify.createPlaylist({"playlist_name": playlist_name});
    if("error" in creation_response) return false;
    return creation_response.ok;
}
export async function spotify_delete_playlist(playlist_uri: string) {
    const deletion_response = await Origin.Spotify.deletePlaylist({"playlist_uri": playlist_uri});
    if("error" in deletion_response) return false;
    return deletion_response.ok;
}

export async function amazon_music_create_playlist(playlist_name: string) {
    const creation_response = await Origin.AmazonMusic.createPlaylist(playlist_name, {});
    if("error" in creation_response) return false;
    return creation_response.ok;
}
export async function amazon_music_delete_playlist(playlist_url: string) {
    const deletion_response = await Origin.AmazonMusic.deletePlaylist(playlist_url, {});
    if("error" in deletion_response) return false;
    return deletion_response.ok;
}

export async function youtube_create_playlist(playlist_name: string) {
    const home = await Origin.YouTube.getHome({});
    if("error" in home) return false;
    const creation_response = await Origin.YouTube.createPlaylist({}, home.icfg.ytcfg, playlist_name, "UNLISTED");
    return creation_response;
}
export async function youtube_delete_playlist(playlist_url: string) {
    const home = await Origin.YouTube.getHome({});
    if("error" in home) return false;
    const playlist_id = Origin.YouTube.playlistURLToID(playlist_url)
    const deletion_response = await Origin.YouTube.deletePlaylist({}, home.icfg.ytcfg, playlist_id);
    return deletion_response;
}

export async function youtube_music_create_playlist(playlist_name: string) {
    const home = await Origin.YouTubeMusic.getHome({});
    if("error" in home) return false;
    const creation_response = await Origin.YouTubeMusic.createPlaylist({}, home.icfg.ytcfg, playlist_name, "UNLISTED");
    return creation_response;
}
export async function youtube_music_delete_playlist(playlist_url: string) {
    const home = await Origin.YouTubeMusic.getHome({});
    if("error" in home) return false;
    const playlist_id = Origin.YouTubeMusic.playlistURLToID(playlist_url)
    const deletion_response = await Origin.YouTubeMusic.deletePlaylist({}, home.icfg.ytcfg, playlist_id);
    return deletion_response;
}