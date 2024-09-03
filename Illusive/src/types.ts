import { CookieJar } from "../../src/utils/cookie_util"
import { ResponseError } from "../../src/utils/types"

type ArtworkCacheType = 'force-cache';

export interface ImageArtwork {
    uri: string
    cache: ArtworkCacheType
}
export type Artwork = ImageArtwork | number
export type Promises = Promise<any>[]

export type Route<T> = {"key": string, "name": string, "params": T, path: string};

export type SQLType = "INTEGER" | "STRING" | "BOOLEAN";
export type SQLAlter = {"table": string, "action": "DROP",   'column_name': string} | 
                       {"table": string, "action": "RENAME", 'column_name': string, 'new_column_name': string} |
                       {"table": string, "action": "ADD",    'column_name': string, 'type': SQLType}
export type PlayingState = "OFF" | "LOADING" | "ON";
export type EditMode = "NONE" | "DOWNLOAD" | "DELETE" | "EDIT";
export type DownloadTrackResult = "GOOD" | "ERROR";
export type SetState = React.Dispatch<React.SetStateAction<any>>;

export type SortType = "ALPHABETICAL" | "NEWEST" | "OLDEST"

export interface SQLTable {
    name: string
    rootpage: number
    sql: string
    tbl_name: string
    type: string
}

export interface DefaultPlaylist {
    name: string
    track_function: () => Promise<Track[]>
};

export interface IllusiveThumbnail {
    url: string
    height: number
    width: number
}

export interface Downloading {
    uid: string
    progress: number
    execution_id: number
    progress_updater?: SetState
}

export interface TrackDownloadingData {
    progress: number
}

export interface TrackPlaybackData {
    added: boolean
    successful: boolean
    artwork: Artwork
}

export interface TrackMetaData {
    plays: number
    added_date: Date
    last_played_date: Date
}

export interface Basic_Track<T, U> {
    uid: string
    title: string
    artists: T
    duration: number
    explicit?: boolean
    album?: string
    plays?: number
    imported_id?: string
    illusi_id?: string
    youtube_id?: string
    youtubemusic_id?: string
    soundcloud_id?: string
    soundcloud_permalink?: string
    spotify_id?: string
    amazonmusic_id?: string
    applemusic_id?: string
    service_thumbnail?: string
    thumbnail_uri?: string
    media_uri?: string
    lyrics_uri?: string
    meta?: U
    playback?: TrackPlaybackData
    downloading_data?: TrackDownloadingData
}
export type SQLTrack = Basic_Track<string, string>
export type Track = Basic_Track<string[], TrackMetaData>

export type PlaylistInheritanceType = "INCLUDE" | "EXCLUDE" | "MASK";
export interface InheritedPlaylist {
    playlist_id: number
    type: PlaylistInheritanceType 
} 
export type InheritedPlaylists = InheritedPlaylist[]; 
export interface PlaylistVisualData {
    four_track?: Track[]
    track_count?: number
}
export interface Basic_Playlist<T, U, V> {
    id: number
    title: string
    pinned: boolean
    thumbnail_uri: string
    sort: SortType
    public: boolean
    public_uid: string
    inherited_playlists: T
    linked_playlists: U
    visual_data: V
}
export type SQLPlaylist = Basic_Playlist<string, string, string>
export type Playlist = Basic_Playlist<InheritedPlaylists, string[], PlaylistVisualData>

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
    playlist_continuation: Record<string, any> | null
}
export interface MusicServicePlaylistContinuation {
    tracks: Track[]
    playlist_continuation: Record<string, any> | null
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
    web_view_url?: string
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
    download_from_id?: (id: string) => Promise<{ "url": string } | ResponseError>
    get_track_mix?: (id: string) => Promise<{ "tracks": Track[] }>
    has_credentials() {
        if (this.cookie_jar_callback === undefined) return false;
        for (const required_cookie_credential of this.required_cookie_credentials) {
            if (this.cookie_jar_callback().getCookie(required_cookie_credential) === undefined)
                return false;
        }
        return true;
    }
    constructor(s: {
        app_icon: string | number,
        web_view_url?: string,
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
        download_from_id?: (id: string) => Promise<{ "url": string } | ResponseError>
        get_track_mix?: (id: string) => Promise<{ "tracks": Track[] }>
    }) {
        this.app_icon = s.app_icon
        this.web_view_url = s.web_view_url;
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
        this.get_track_mix = s.get_track_mix;
    }
}

export class PQueue<T> {
    elements: Record<number, T>
    head: number
    tail: number
    constructor() {
        this.elements = {};
        this.head = 0;
        this.tail = 0;
    }
    enqueue(element: T): void {
        this.elements[this.tail] = element;
        this.tail++;
    }
    dequeue() {
        const item = this.elements[this.head];
        delete this.elements[this.head];
        this.head++;
        return item;
    }
    peek() { return this.elements[this.head]; }
    get length() { return this.tail - this.head; }
    get isEmpty() { return this.length === 0; }
}