import * as Origin from '../../index'

export async function spotify_create_playlist(playlist_name: string) {
    const creation_response = await Origin.Spotify.createPlaylist({"playlist_name": playlist_name});
    if("error" in creation_response) {
        return false;
    }
    return creation_response.ok;
}
export async function spotify_delete_playlist(playlist_uri: string) {
    const deletion_response = await Origin.Spotify.deletePlaylist({"playlist_uri": playlist_uri});
    if("error" in deletion_response) {
        return false;
    }
    return deletion_response.ok;
}

export async function amazon_music_create_playlist(playlist_name: string) {
    const creation_response = await Origin.AmazonMusic.createPlaylist({"playlist_name": playlist_name});
    if("error" in creation_response) {
        return false;
    }
    return creation_response.ok;
}
export async function amazon_music_delete_playlist(playlist_uri: string) {
    const deletion_response = await Origin.AmazonMusic.deletePlaylist({"playlist_uri": playlist_uri});
    if("error" in deletion_response) {
        return false;
    }
    return deletion_response.ok;
}