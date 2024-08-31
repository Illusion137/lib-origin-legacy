import * as Origin from '../../index'
import { generateNewUID } from '../../src/utils/util';
import { MusicServicePlaylistTitle, MusicServicePlaylistURL } from './types';

export async function spotify_get_user_playlists(): Promise<Map<MusicServicePlaylistTitle, MusicServicePlaylistURL>> {
    const user_playlists_response = await Origin.Spotify.getAllPlaylistsFromAccount({});
    if("error" in user_playlists_response) {
        return new Map();
    }
    return user_playlists_response;
}

export async function amazon_music_get_user_playlists(): Promise<Map<MusicServicePlaylistTitle, MusicServicePlaylistURL>> {
    const user_playlists_response = await Origin.AmazonMusic.getAllPlaylistsFromAccount({});
    if("error" in user_playlists_response) {
        return new Map();
    }
    return user_playlists_response;
}

export async function youtube_get_user_playlists(): Promise<Map<MusicServicePlaylistTitle, MusicServicePlaylistURL>>{
    const user_playlists_response = await Origin.YouTube.getLibrary({});
    if("error" in user_playlists_response) return new Map<string, string>();
    const map = new Map<string, string>();
    user_playlists_response.data.forEach(item => {
        map.set(item.title, `https://www.youtube.com/playlist?list=${item.endpoint}`);
    });
    return map;
}

export async function youtube_music_get_user_playlists(): Promise<Map<MusicServicePlaylistTitle, MusicServicePlaylistURL>>{
    const user_playlists_response = await Origin.YouTubeMusic.getLibrary({});
    if("error" in user_playlists_response) return new Map<string, string>();
    const map = new Map<string, string>();
    user_playlists_response.data.forEach(item => {
        map.set(item.title, `https://music.youtube.com/playlist?list=${item.endpoint}`);
    });
    return map;
}

export async function apple_music_get_user_playlists(): Promise<Map<MusicServicePlaylistTitle, MusicServicePlaylistURL>>{
    const user_playlists_response = await Origin.AppleMusic.getAllPlaylistsFromAccount({});
    if("error" in user_playlists_response) return new Map<string, string>();
    const map = new Map<string, string>();
    Object.values(user_playlists_response.resources['library-playlists']).forEach(item => {
        map.set(item.attributes.name, `https://music.apple.com/us/library/playlist/${item.id}?l=en-US`);
    });
    return map;
}