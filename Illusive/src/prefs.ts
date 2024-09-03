import { CookieJar } from "../../src/utils/cookie_util";

export namespace Prefs {
    const default_prefs = {
        "youtube_cookie_jar": new CookieJar([]),
        
        "youtube_music_cookie_jar": new CookieJar([]),
        
        "soundcloud_cookie_jar": new CookieJar([]),
        "soundcloud_playlist_limit": 20,
        
        "spotify_cookie_jar": new CookieJar([]),
        "spotify_playlist_limit": 100,
        
        "apple_music_cookie_jar": new CookieJar([]),
        
        "amazon_music_cookie_jar": new CookieJar([]),

        "keep_prefs": true,
        "auto_cache_thumbnails": false,
        "use_cookies_on_download": false,
        "only_play_downloaded": false,
        "always_shuffle": true,
        "get_account_playlists_in_get_playlist": false,
        "recently_played_max_size": 100,
        "default_playlist_max_size": 200,
        "download_queue_max_length": 5,
    }
    let prefs: typeof default_prefs = {} as typeof default_prefs
    
    type PrefOptions = keyof (typeof default_prefs);
    export async function load_prefs(){
        // const p: Record<string, string> = {}
        // for(const key of p){
    
        // }
    }
    
    export function get_pref(pref_key: PrefOptions): any { return prefs[pref_key]; }
    export async function save_pref(pref: PrefOptions, value: string) {
    
    }
    export async function reset_prefs(){
        
    }
}
