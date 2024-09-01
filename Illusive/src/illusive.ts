import { amazon_music_add_tracks_to_playlist, amazon_music_delete_tracks_from_playlist, spotify_add_tracks_to_playlist, spotify_delete_tracks_from_playlist, youtube_add_tracks_to_playlist, youtube_delete_tracks_from_playlist, youtube_music_add_tracks_to_playlist, youtube_music_delete_tracks_from_playlist } from "./add_delete_tracks_from_playlist";
import { amazon_music_create_playlist, amazon_music_delete_playlist, spotify_create_playlist, spotify_delete_playlist, youtube_create_playlist, youtube_delete_playlist, youtube_music_create_playlist, youtube_music_delete_playlist } from "./create_delete_playlist";
import { soundcloud_download_from_id, youtube_download_from_id } from "./download_from_id";
import { amazon_music_get_playlist, api_get_playlist, apple_music_get_playlist, apple_music_get_playlist_continuation, illusi_get_playlist, musi_get_playlist, soundcloud_get_playlist, soundcloud_get_playlist_continuation, spotify_get_playlist, spotify_get_playlist_continuation, youtube_get_playlist, youtube_get_playlist_continuation, youtube_music_get_playlist, youtube_music_get_playlist_continuation } from "./get_playlist";
import { amazon_music_get_user_playlists, apple_music_get_user_playlists, spotify_get_user_playlists, youtube_get_user_playlists, youtube_music_get_user_playlists } from "./get_user_playlist";
import { Prefs } from "./prefs";
import { amazon_music_search, soundcloud_search, spotify_search, youtube_music_search, youtube_search } from "./search";
import { MusicService, MusicServiceType } from "./types";

export namespace Illusive {
    const illusi = new MusicService(
        {
            'app_icon': 'https://is2-ssl.mzstatic.com/image/thumb/Purple122/v4/7d/76/2f/7d762f0e-10ab-1ff2-baf7-84cdaca16219/Icon-1x_U007emarketing-0-6-0-85-220.png/350x350.png?',
            'valid_playlist_url_regex': /(https?:\/\/)illusi\.dev\/playlist\/.+/i,
            'link_text': 'https://illusi.dev/playlist/...',
            'required_cookie_credentials': [],
            'get_user_playlists': undefined,
            'get_playlist': illusi_get_playlist,
            'search': undefined,
            'explore': undefined,
            'create_playlist': undefined,
            'delete_playlist': undefined,
            'add_tracks_to_playlist': undefined,
            'delete_tracks_from_playlist': undefined
        });
    const musi = new MusicService(
        {
            'app_icon': 'https://is2-ssl.mzstatic.com/image/thumb/Purple122/v4/7d/76/2f/7d762f0e-10ab-1ff2-baf7-84cdaca16219/Icon-1x_U007emarketing-0-6-0-85-220.png/350x350.png?',
            'valid_playlist_url_regex': /(https?:\/\/)feelthemusi\.com\/playlist\/.+/i,
            'link_text': 'https://feelthemusi.com/playlist/...',
            'required_cookie_credentials': [],
            'get_user_playlists': undefined,
            'get_playlist': musi_get_playlist,
            'search': undefined,
            'explore': undefined,
            'create_playlist': undefined,
            'delete_playlist': undefined,
            'add_tracks_to_playlist': undefined,
            'delete_tracks_from_playlist': undefined
        });
    const youtube = new MusicService(
        {
            'app_icon': 'https://is5-ssl.mzstatic.com/image/thumb/Purple122/v4/fc/c7/18/fcc718a6-bd55-b1aa-93e4-4073a2ad3b13/logo_youtube_color-1x_U007emarketing-0-6-0-85-220.png/350x350.png?',
            'valid_playlist_url_regex': /(https?:\/\/)(www\.)?youtube\.com\/playlist\?list=.+/i,
            'link_text': 'https://www.youtube.com/playlist?list=...',
            'required_cookie_credentials': ["LOGIN_INFO"],
            'get_user_playlists': youtube_get_user_playlists,
            'get_playlist': youtube_get_playlist,
            'get_playlist_continuation': youtube_get_playlist_continuation,
            'cookie_jar_callback': () => Prefs.getPref("youtube_cookie_jar"),
            'search': youtube_search,
            'explore': undefined,
            'create_playlist': youtube_create_playlist,
            'delete_playlist': youtube_delete_playlist,
            'add_tracks_to_playlist': youtube_add_tracks_to_playlist,
            'delete_tracks_from_playlist': youtube_delete_tracks_from_playlist,
            'download_from_id': youtube_download_from_id
        });
    const youtube_music = new MusicService(
        {
            'app_icon': 'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/44/c6/3d/44c63da2-7a82-bd82-821d-1cd01f2b510f/AppIcon-0-1x_U007emarketing-0-0-0-7-0-0-0-85-220-0.png/350x350.png?',
            'valid_playlist_url_regex': /(https?:\/\/)(www\.)?music\.youtube\.com\/playlist\?list=.+/i,
            'link_text': 'https://music.youtube.com/playlist?list=...',
            'required_cookie_credentials': ["LOGIN_INFO"],
            'get_user_playlists': youtube_music_get_user_playlists,
            'get_playlist': youtube_music_get_playlist,
            'get_playlist_continuation': youtube_music_get_playlist_continuation,
            'cookie_jar_callback': () => Prefs.getPref("youtube_music_cookie_jar"),
            'search': youtube_music_search,
            'explore': undefined,
            'create_playlist': youtube_music_create_playlist,
            'delete_playlist': youtube_music_delete_playlist,
            'add_tracks_to_playlist': youtube_music_add_tracks_to_playlist,
            'delete_tracks_from_playlist': youtube_music_delete_tracks_from_playlist
        });
    const spotify = new MusicService(
        {
            'app_icon': 'https://is2-ssl.mzstatic.com/image/thumb/Purple122/v4/63/64/fa/6364fa97-398a-46da-32ac-765e8f328548/AppIcon-0-1x_U007emarketing-0-6-0-0-0-85-220-0.png/350x350.png?',
            'valid_playlist_url_regex': /(https?:\/\/)open\.spotify\.com\/(playlist|album|collection)\/.+/i,
            'link_text': 'https://open.spotify.com/playlist/... or  \n - https://open.spotify.com/album/...',
            'required_cookie_credentials': ["sp_dc"],
            'get_user_playlists': spotify_get_user_playlists,
            'get_playlist': spotify_get_playlist,
            'get_playlist_continuation': spotify_get_playlist_continuation,
            'cookie_jar_callback': () => Prefs.getPref("spotify_cookie_jar"),
            'search': spotify_search,
            'explore': undefined,
            'create_playlist': spotify_create_playlist,
            'delete_playlist': spotify_delete_playlist,
            'add_tracks_to_playlist': spotify_add_tracks_to_playlist,
            'delete_tracks_from_playlist': spotify_delete_tracks_from_playlist
        });
    const amazon_music = new MusicService(
        {
            'app_icon': 'https://is4-ssl.mzstatic.com/image/thumb/Purple122/v4/fc/b8/aa/fcb8aae7-180e-7b29-7c83-255f1c86eba8/AppIcon-1x_U007emarketing-0-10-0-85-220.png/350x350.png?',
            'valid_playlist_url_regex': /(https?:\/\/)music\.amazon\.com\/(playlists|user-playlists)\/.+/i,
            'link_text': 'https://music.amazon.com/user-playlists/... or  \n - https://music.amazon.com/playlists/...',
            'required_cookie_credentials': ["at-main"],
            'get_user_playlists': amazon_music_get_user_playlists,
            'get_playlist': amazon_music_get_playlist,
            'cookie_jar_callback': Prefs.getPref("amazon_music_cookie_jar"),
            'search': amazon_music_search,
            'explore': undefined,
            'create_playlist': amazon_music_create_playlist,
            'delete_playlist': amazon_music_delete_playlist,
            'add_tracks_to_playlist': amazon_music_add_tracks_to_playlist,
            'delete_tracks_from_playlist': amazon_music_delete_tracks_from_playlist
        });
    const apple_music = new MusicService(
        {
            'app_icon': 'https://is1-ssl.mzstatic.com/image/thumb/Purple122/v4/8e/18/bd/8e18bd19-1453-d9be-620d-66930b61e487/AppIcon-0-0-1x_U007emarketing-0-10-0-85-220.png/246x0w.webp',
            'valid_playlist_url_regex': /(https?:\/\/)music\.apple\.com\/.+?\/playlist\/.+?/i,
            'link_text': 'https://music.apple.com/us/playlist/.../... or \n - https://music.apple.com/library/playlist/...',
            'required_cookie_credentials': ["commerce-authorization-token"],
            'get_user_playlists': apple_music_get_user_playlists,
            'get_playlist': apple_music_get_playlist,
            'get_playlist_continuation': apple_music_get_playlist_continuation,
            'cookie_jar_callback': Prefs.getPref("apple_music_cookie_jar"),
            'search': undefined,
            'explore': undefined,
            'create_playlist': undefined,
            'delete_playlist': undefined,
            'add_tracks_to_playlist': undefined,
            'delete_tracks_from_playlist': undefined
        });
    const soundcloud = new MusicService(
        {
            'app_icon': 'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/87/15/59/871559b2-5653-32f3-c9aa-b61a39bb8d84/AppIcon-0-0-1x_U007emarketing-0-7-0-85-220.png/246x0w.webp',
            'valid_playlist_url_regex': /(https?:\/\/)soundcloud\.com\/.+?\/(sets\/.+)?/i,
            'link_text': 'https://soundcloud.com/.../sets/... or \n - https://soundcloud.com/...',
            'required_cookie_credentials': ["sc_anonymous_id"],
            'get_user_playlists': undefined,
            'get_playlist': soundcloud_get_playlist,
            'get_playlist_continuation': soundcloud_get_playlist_continuation,
            'cookie_jar_callback': Prefs.getPref("soundcloud_cookie_jar"),
            'search': soundcloud_search,
            'explore': undefined,
            'create_playlist': undefined,
            'delete_playlist': undefined,
            'add_tracks_to_playlist': undefined,
            'delete_tracks_from_playlist': undefined,
            'download_from_id': soundcloud_download_from_id
        });
    const api = new MusicService(
        {
            'app_icon': '',
            'valid_playlist_url_regex': /.+/,
            'link_text': "...any link that returns an Illusive-Playlist",
            'required_cookie_credentials': [],
            'get_playlist': api_get_playlist,
        });

    export const music_service: Map<MusicServiceType, MusicService> = new Map<MusicServiceType, MusicService>([
        ["Illusi", illusi],
        ["Musi", musi],
        ["YouTube", youtube],
        ["YouTube Music", youtube_music],
        ["Spotify", spotify],
        ["Amazon Music", amazon_music],
        ["SoundCloud", soundcloud],
        ["Apple Music", apple_music],
        ["API", api],
    ]);
}