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