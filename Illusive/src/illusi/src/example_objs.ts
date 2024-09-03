import { Playlist, Track } from "../../types";

export namespace ExampleObj {
    export const track_example0: Track =
    {
        "uid": "",
        "title": "",
        "artists": [],
        "duration": 0,
        "explicit": false,
        "album": "",
        "plays": 0,
        "imported_id": "",
        "illusi_id": "",
        "youtube_id": "",
        "youtubemusic_id": "",
        "soundcloud_id": "",
        "soundcloud_permalink": "",
        "spotify_id": "",
        "amazonmusic_id": "",
        "applemusic_id": "",
        "service_thumbnail": "",
        "thumbnail_uri": "",
        "media_uri": "",
        "lyrics_uri": "",
        "meta": {} as any,
        "playback": undefined as any,
        "downloading_data": undefined as any,
    }
    export const playlist_example0: Playlist = 
    {
        "id": 0,
        "title": "",
        "inherited_playlists": [],
        "linked_playlists": [],
        "pinned": false,
        "public": false,
        "public_uid": "",
        "sort": "ALPHABETICAL",
        "thumbnail_uri": "",
        "visual_data": {}
    }
}