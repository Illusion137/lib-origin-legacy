import AsyncStorage from '@react-native-async-storage/async-storage';
import { CookieJar } from "../../src/utils/cookie_util";

export namespace Prefs {
    type PrefType = "COOKIE_JAR" | "DATE" | "NUMBER" | "BOOLEAN"
    interface Pref<T> {
        default_value: T
        current_value: T
        type: PrefType
    }
    const prefs = {
        "youtube_cookie_jar":                    {default_value: new CookieJar([]), current_value: new CookieJar([]), type: "COOKIE_JAR"} as Pref<CookieJar>,
        
        "youtube_music_cookie_jar":              {default_value: new CookieJar([]), current_value: new CookieJar([]), type: "COOKIE_JAR"} as Pref<CookieJar>,
        
        "soundcloud_cookie_jar":                 {default_value: new CookieJar([]), current_value: new CookieJar([]), type: "COOKIE_JAR"} as Pref<CookieJar>,
        "soundcloud_playlist_limit":             {default_value: 20, current_value: 20, type: "NUMBER"} as Pref<number>,
        
        "spotify_cookie_jar":                    {default_value: new CookieJar([]), current_value: new CookieJar([]), type: "COOKIE_JAR"} as Pref<CookieJar>,
        "spotify_playlist_limit":                {default_value: 100, current_value: 100, type: "NUMBER"} as Pref<number>,
        
        "apple_music_cookie_jar":                {default_value: new CookieJar([]), current_value: new CookieJar([]), type: "COOKIE_JAR"} as Pref<CookieJar>,
        
        "amazon_music_cookie_jar":               {default_value: new CookieJar([]), current_value: new CookieJar([]), type: "COOKIE_JAR"} as Pref<CookieJar>,

        "keep_prefs":                            {default_value: true, current_value: true, type: "BOOLEAN"}  as Pref<boolean>,
        "auto_cache_thumbnails":                 {default_value: false, current_value: false, type: "BOOLEAN"} as Pref<boolean>,
        "use_cookies_on_download":               {default_value: false, current_value: false, type: "BOOLEAN"} as Pref<boolean>,
        "only_play_downloaded":                  {default_value: false, current_value: false, type: "BOOLEAN"} as Pref<boolean>,
        "always_shuffle":                        {default_value: true, current_value: true, type: "BOOLEAN"} as Pref<boolean> ,
        "get_account_playlists_in_get_playlist": {default_value: false, current_value: false, type: "BOOLEAN"} as Pref<boolean>,
        "recently_played_max_size":              {default_value: 100, current_value: 100, type: "NUMBER"} as Pref<number>,
        "default_playlist_max_size":             {default_value: 200, current_value: 200, type: "NUMBER"} as Pref<number>,
        "download_queue_max_length":             {default_value: 5, current_value: 5, type: "NUMBER"} as Pref<number>,
    }

    
    type PrefOptions = keyof typeof prefs;
    export function get_pref(pref_key: PrefOptions): any { return prefs[pref_key].current_value; }

    export async function load_prefs(){
        const keys: (keyof typeof prefs)[] = Object.keys(prefs) as (keyof typeof prefs)[];
        const all_keys = await AsyncStorage.getAllKeys();
        for(const key of keys){
            if(all_keys.includes(key))
            switch(prefs[key].type){
                case "BOOLEAN":    prefs[key].current_value = Boolean(await AsyncStorage.getItem(key)); break;
                case "NUMBER":     prefs[key].current_value = parseInt((await AsyncStorage.getItem(key))!); break;
                case "COOKIE_JAR": prefs[key].current_value = CookieJar.fromString((await AsyncStorage.getItem(key))!); break;
                // case "DATE":       prefs[key].current_value = new Date((await AsyncStorage.getItem(key))!); break;
            }
        }
    }
    
    export async function save_pref(pref: PrefOptions, value: any) {
        switch(prefs[pref].type){
            case "BOOLEAN":    await AsyncStorage.setItem(pref, String(value as boolean)); break;
            case "NUMBER":     await AsyncStorage.setItem(pref, String(value as number)); break;
            case "COOKIE_JAR": await AsyncStorage.setItem(pref, (value as CookieJar).toString()); break;
            // case "DATE":       await AsyncStorage.setItem(pref, (value as Date).toDateString()); break;
        }
        await load_prefs();
    }
    export async function reset_prefs(){
        await AsyncStorage.clear();
    }

    export const dark_theme = {
        dark: true,
        colors: {
            primary: '#7400fe',
            secondary: '#fc00c9',
            background: '#0d1016',
            card: '#131213',
            text: '#ffffff',
            subtext: '#8c939d',
            border: '#222222',
            notification: '#1313ff',
            shelf: '#161B22',
            tabInactive: '#cad1d8',
            line: '#303040',
            searchInput: '#404254',
            searchPlaceholder: '#8080a0',
            inactive: '#8080a0',
            red: '#FF0000',
            green: '#00FF00',
            playingSong: '#141722',
            playScreen: '#141722',
            track: '#141722',
            highlightPressColor: '#bbaaff'
        },
    }

}
