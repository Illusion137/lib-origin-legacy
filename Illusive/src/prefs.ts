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
    }
    let prefs: typeof default_prefs = {} as typeof default_prefs
    
    type PrefOptions = keyof (typeof default_prefs);
    export async function load_prefs(){
        // const p: Record<string, string> = {}
        // for(const key of p){
    
        // }
    }
    
    export function getPref(pref_key: PrefOptions): any { return prefs[pref_key]; }
    export async function savePref(pref: PrefOptions, value: string) {
    
    }
}
