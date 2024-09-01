import { CookieJar } from "../../src/utils/cookie_util"
import { ResponseError } from "../../src/utils/types"

export interface Track {
    uid: string
    title: string
    artists: string[]
    duration: number
    explicit?: boolean
    album?: string
    plays?: number
    illusi_id?: string
    youtube_id?: string
    youtubemusic_id?: string
    soundcloud_id?: string
    soundcloud_permalink?: string
    soundcloud_thumbnail?: string
    spotify_id?: string
    amazonmusic_id?: string
    applemusic_id?: string
    pandora_id?: string
}

export interface CompactPlaylist {
    title: string
    artist: string[]
    uri: string
    thumbnail_uri?: string
    year?: number
    explicit?: boolean
}

export interface CompactArtist {
    name: string
    uri: string
    profile_thumbnail_uri: string
}

export interface MusicServicePlaylist {
    tracks: Track[]
    title: string
    creator?: string[]
    description?: string
    thumbnail_uri?: string
    year?: number
    playlist_continuation: Record<string, any>|null
}
export interface MusicServicePlaylistContinuation {
    tracks: Track[]
    playlist_continuation: Record<string, any>|null
}

export interface MusicSearchResponse {
    tracks: Track[]
    artists: CompactArtist[]
    playlists: CompactPlaylist[]
    albums: CompactPlaylist[]
}

export interface IllusiveExplore {

}

export type MusicServiceType = "Illusi" | "Musi" | "YouTube" | "YouTube Music" | "Spotify" | "Amazon Music" | "Apple Music" | "SoundCloud" | "Pandora" | "API";
export type MusicServicePlaylistTitle = string;
export type MusicServicePlaylistURL = string;

export class MusicService {
    app_icon: string | number
    link_text: string
    valid_playlist_url_regex: RegExp
    required_cookie_credentials: string[]
    cookie_jar_callback?: () => CookieJar
    search?: (query: string) => Promise<MusicSearchResponse>
    explore?: () => Promise<IllusiveExplore>
    create_playlist?: (title: string) => Promise<boolean>
    delete_playlist?: (playlist_uri: string) => Promise<boolean>
    add_tracks_to_playlist?: (tracks: Track[], playlist_uri: string) => Promise<boolean>
    delete_tracks_from_playlist?: (tracks: Track[], playlist_uri: string) => Promise<boolean>
    get_user_playlists?: () => Promise<Map<MusicServicePlaylistTitle, MusicServicePlaylistURL>>
    get_playlist: (url: string) => Promise<MusicServicePlaylist>
    get_playlist_continuation?: (continuation_data: any) => Promise<MusicServicePlaylistContinuation>
    download_from_id?: (id: string) => Promise<string|ResponseError>
    has_credentials(){
        if(this.cookie_jar_callback === undefined) return false;
        for(const required_cookie_credential of this.required_cookie_credentials){
            if(this.cookie_jar_callback().getCookie(required_cookie_credential) === undefined)
                return false;
        }
        return true;
    }
    constructor(s: {
        app_icon: string | number,
        link_text: string,
        valid_playlist_url_regex: RegExp,
        required_cookie_credentials: string[],
        cookie_jar_callback?: () => CookieJar
        search?: (query: string) => Promise<MusicSearchResponse>
        explore?: () => Promise<IllusiveExplore>
        create_playlist?: (title: string) => Promise<boolean>
        delete_playlist?: (playlist_uri: string) => Promise<boolean>
        add_tracks_to_playlist?: (tracks: Track[], playlist_uri: string) => Promise<boolean>
        delete_tracks_from_playlist?: (tracks: Track[], playlist_uri: string) => Promise<boolean>
        get_user_playlists?: () => Promise<Map<MusicServicePlaylistTitle, MusicServicePlaylistURL>>,
        get_playlist: (url: string) => Promise<MusicServicePlaylist>,
        get_playlist_continuation?: (continuation_data: any) => Promise<MusicServicePlaylistContinuation>,
        download_from_id?: (id: string) => Promise<string|ResponseError>
    }){
        this.app_icon = s.app_icon
        this.valid_playlist_url_regex = s.valid_playlist_url_regex;
        this.required_cookie_credentials = s.required_cookie_credentials;
        this.link_text = s.link_text;
        this.cookie_jar_callback = s.cookie_jar_callback;
        this.search = s.search;
        this.explore = s.explore;
        this.create_playlist = s.create_playlist;
        this.delete_playlist = s.delete_playlist;
        this.add_tracks_to_playlist = s.add_tracks_to_playlist;
        this.delete_tracks_from_playlist = s.delete_tracks_from_playlist;
        this.get_user_playlists = s.get_user_playlists;
        this.get_playlist = s.get_playlist;
        this.get_playlist_continuation = s.get_playlist_continuation
        this.download_from_id = s.download_from_id;
    }
}