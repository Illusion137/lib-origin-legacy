import { spotify_add_tracks_to_playlist, spotify_delete_tracks_from_playlist } from "./add_delete_tracks_from_playlist";
import { spotify_create_playlist, spotify_delete_playlist } from "./create_delete_playlist";
import { amazon_music_get_playlist, musi_get_playlist, spotify_get_playlist, youtube_music_get_playlist } from "./get_playlist";
import { amazon_music_get_user_playlists, spotify_get_user_playlists } from "./get_user_playlist";
import { amazon_music_search, spotify_search } from "./search";
import { MusicService, MusicServiceType } from "./types";

export namespace Illusive {
    // const illusi = new MusicService(
    //     {
    //         'valid_playlist_url_regex': /(https?:\/\/)illusi\.dev\/playlist\/.+/i,
    //         'link_text': 'https://illusi.dev/playlist/...',
    //         'required_cookie_credentials': [],
    //         'get_user_playlists': undefined,
    //         'get_playlist': undefined,
    //         'search': undefined,
    //         'explore': undefined,
    //         'create_playlist': undefined,
    //         'delete_playlist': undefined,
    //         'add_tracks_to_playlist': undefined,
    //         'delete_tracks_from_playlist': undefined
    //     });
    const musi = new MusicService(
        {
            'valid_playlist_url_regex': /(https?:\/\/)feelthemusi\.com\/playlist\/.+/i,
            'link_text': 'https://feelthemusi.com/playlist/...',
            'required_cookie_credentials': [],
            'get_user_playlists': undefined,
            'get_playlist': musi_get_playlist,
            'cookie_jar_callback': undefined,
            'search': undefined,
            'explore': undefined,
            'create_playlist': undefined,
            'delete_playlist': undefined,
            'add_tracks_to_playlist': undefined,
            'delete_tracks_from_playlist': undefined
        });
    const youtube = new MusicService(
        {
            'valid_playlist_url_regex': /(https?:\/\/)(www\.)?youtube\.com\/playlist\?list=.+/i,
            'link_text': 'https://www.youtube.com/playlist?list=...',
            'required_cookie_credentials': ["LOGIN_INFO"],
            'get_user_playlists': undefined,
            'get_playlist': undefined,
            'cookie_jar_callback': undefined,
            'search': undefined,
            'explore': undefined,
            'create_playlist': undefined,
            'delete_playlist': undefined,
            'add_tracks_to_playlist': undefined,
            'delete_tracks_from_playlist': undefined
        });
    const youtube_music = new MusicService(
        {
            'valid_playlist_url_regex': /(https?:\/\/)(www\.)?music\.youtube\.com\/playlist\?list=.+/i,
            'link_text': 'https://music.youtube.com/playlist?list=...',
            'required_cookie_credentials': ["LOGIN_INFO"],
            'get_user_playlists': undefined,
            'get_playlist': youtube_music_get_playlist,
            'cookie_jar_callback': undefined,
            'search': undefined,
            'explore': undefined,
            'create_playlist': undefined,
            'delete_playlist': undefined,
            'add_tracks_to_playlist': undefined,
            'delete_tracks_from_playlist': undefined
        });
    const spotify = new MusicService(
        {
            'valid_playlist_url_regex': /(https?:\/\/)open\.spotify\.com\/(playlist|album|collection)\/.+/i,
            'link_text': 'https://open.spotify.com/playlist/... or  \n - https://open.spotify.com/album/...',
            'required_cookie_credentials': ["sp_dc"],
            'get_user_playlists': spotify_get_user_playlists,
            'get_playlist': spotify_get_playlist,
            'cookie_jar_callback': undefined,
            'search': spotify_search,
            'explore': undefined,
            'create_playlist': spotify_create_playlist,
            'delete_playlist': spotify_delete_playlist,
            'add_tracks_to_playlist': spotify_add_tracks_to_playlist,
            'delete_tracks_from_playlist': spotify_delete_tracks_from_playlist
        });
    const amazon_music = new MusicService(
        {
            'valid_playlist_url_regex': /(https?:\/\/)music\.amazon\.com\/(playlists|user-playlists)\/.+/i,
            'link_text': 'https://music.amazon.com/user-playlists/... or  \n - https://music.amazon.com/playlists/...',
            'required_cookie_credentials': ["at-main"],
            'get_user_playlists': amazon_music_get_user_playlists,
            'get_playlist': amazon_music_get_playlist,
            'cookie_jar_callback': undefined,
            'search': amazon_music_search,
            'explore': undefined,
            'create_playlist': undefined,
            'delete_playlist': undefined,
            'add_tracks_to_playlist': undefined,
            'delete_tracks_from_playlist': undefined
        });
    // const apple_music = new MusicService(
    //     {
    //         'valid_playlist_url_regex': undefined,
    //         'link_text': undefined,
    //         'required_cookie_credentials': [],
    //         'get_user_playlists': undefined,
    //         'get_playlist': undefined,
    //         'search': undefined,
    //         'explore': undefined,
    //         'create_playlist': undefined,
    //         'delete_playlist': undefined,
    //         'add_tracks_to_playlist': undefined,
    //         'delete_tracks_from_playlist': undefined
    //     });
    // const soundcloud = new MusicService(
    //     {
    //         'valid_playlist_url_regex': undefined,
    //         'link_text': undefined,
    //         'required_cookie_credentials': [],
    //         'get_user_playlists': undefined,
    //         'get_playlist': undefined,
    //         'search': undefined,
    //         'explore': undefined,
    //         'create_playlist': undefined,
    //         'delete_playlist': undefined,
    //         'add_tracks_to_playlist': undefined,
    //         'delete_tracks_from_playlist': undefined
    //     });
    // const pandora = new MusicService(
    //     {
    //         'valid_playlist_url_regex': undefined,
    //         'link_text': undefined,
    //         'required_cookie_credentials': [],
    //         'get_user_playlists': undefined,
    //         'get_playlist': undefined,
    //         'search': undefined,
    //         'explore': undefined,
    //         'create_playlist': undefined,
    //         'delete_playlist': undefined,
    //         'add_tracks_to_playlist': undefined,
    //         'delete_tracks_from_playlist': undefined
    //     });
    // const api = new MusicService(
    //     {
    //         'valid_playlist_url_regex': undefined,
    //         'link_text': undefined,
    //         'required_cookie_credentials': [],
    //         'get_user_playlists': undefined,
    //         'get_playlist': undefined,
    //         'search': undefined,
    //         'explore': undefined,
    //         'create_playlist': undefined,
    //         'delete_playlist': undefined,
    //         'add_tracks_to_playlist': undefined,
    //         'delete_tracks_from_playlist': undefined
    //     });

    export const music_service: Map<MusicServiceType, MusicService> = new Map<MusicServiceType, MusicService>([
        // ["Illusi", illusi],
        ["Musi", musi],
        ["YouTube", youtube],
        ["YouTube Music", youtube_music],
        ["Spotify", spotify],
        ["Amazon Music", amazon_music],
        // ["Apple Music", apple_music],
        // ["SoundCloud", soundcloud],
        // ["Pandora", pandora],
        // ["API", api],
    ]);
}