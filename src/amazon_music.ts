import axios from "axios";
import { ResponseError } from "./utils/types";
import { CookieJar } from "./utils/cookie_util";

export namespace AmazonMusic {
    interface AmznMusic {
        appConfig: {
            accessToken: string,
            deviceId: string,
            sessionId: string,
            displayLanguage: string,
            version: string,
            csrf: {
                token: string,
                ts: number,
                rnd: string
            }
        }
    }

    interface ShowHome {
        methods: {
            interface: "TemplateListInterface.v1_0.CreateAndBindTemplateMethod",
            header: string,
            template:{
                headerImageAltText: string,
                widgets: {
                    items: {
                        primaryLink: {
                            deeplink: string
                        }
                        primaryText: string,
                        secondaryText1: string
                    }[]
                }[]
            }
        }[],
    }
    interface AuthHeader {
        interface: string,
        token: string,
        expirationMS: number
    }
    export async function getAmznMusicData(url: string, cookie_jar: (CookieJar | undefined) = undefined): Promise<AmznMusic|ResponseError>{
        try {
            const headers = getAmznMusicHeaders(cookie_jar);
            const config_body = ( await axios.get(url, {"headers": headers as any}) ).data
               
            const amzn_music_regex = /window.amznMusic = ({.+});/s
            //Fixing the shitty json
            const amzn_music_regex_exec = amzn_music_regex.exec(config_body);
            if(amzn_music_regex_exec == null) throw "Couldn't parse AmznMusic body"; 
            const amzn_music_text = amzn_music_regex_exec[0].replace(/\n\s+/g,'')
                                .replace("appConfig", "\"appConfig\"")
                                .replace("ssr:", "\"ssr\":")
                                .replace("isInContainerApp: true,","\"isInContainerApp\": true")
                                .replace("isInContainerApp: false,","\"isInContainerApp\": false")
            const amzn_music = JSON.parse(amzn_music_text);
            return amzn_music;
        } catch (error) { return { "error": String(error) }; }
    }
    
    export async function getShowHomeData(amzn_music: AmznMusic, url: string): Promise<ShowHome|ResponseError>{
        try {
            const trimmed_url = url.replace("https://",'').replace("music.amazon.com",'');
            const deeplink = {
                "interface": "DeeplinkInterface.v1_0.DeeplinkClientInformation",
                "deeplink": trimmed_url
            };
            const x_amzn_authentication = {
                "interface": "ClientAuthenticationInterface.v1_0.ClientTokenElement",
                "accessToken": amzn_music.appConfig.accessToken
            };
            const x_amzn_csrf = {
                "interface": "CSRFInterface.v1_0.CSRFHeaderElement",
                "token": amzn_music.appConfig.csrf.token,
                "timestamp": amzn_music.appConfig.csrf.ts,
                "rndNonce": amzn_music.appConfig.csrf.rnd
            };
            const headers = {
                "x-amzn-authentication": JSON.stringify(x_amzn_authentication),
                "x-amzn-device-model": "WEBPLAYER",
                "x-amzn-device-width": "1920",
                "x-amzn-device-family": "WebPlayer",
                "x-amzn-device-id": amzn_music.appConfig.deviceId,
                "x-amzn-user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
                "x-amzn-session-id": amzn_music.appConfig.sessionId,
                "x-amzn-device-height": "1080",
                "x-amzn-request-id": "dfefb1b8-4ae6-4d38-973b-a4964eefbd76",
                "x-amzn-device-language": amzn_music.appConfig.displayLanguage,
                "x-amzn-currency-of-preference": "USD",
                "x-amzn-os-version": "1.0",
                "x-amzn-application-version": amzn_music.appConfig.version,
                "x-amzn-device-time-zone": "America/Phoenix",
                "x-amzn-timestamp": amzn_music.appConfig.csrf.ts,
                "x-amzn-csrf": JSON.stringify(x_amzn_csrf),
                "x-amzn-music-domain": "music.amazon.com",
                "x-amzn-referer": "",
                "x-amzn-affiliate-tags": "",
                "x-amzn-ref-marker": "",
                "x-amzn-page-url": url,
                "x-amzn-weblab-id-overrides": "",
                "x-amzn-video-player-token": "",
                "x-amzn-feature-flags": "hd-supported,uhd-supported"
            };
            const body = JSON.stringify({"deeplink": JSON.stringify(deeplink), "headers": JSON.stringify(headers)});
            const show_home = await axios({'method': 'POST', 'url': "https://na.mesk.skill.music.a2z.com/api/showHome", 'headers': {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "text/plain;charset=UTF-8",
                "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site",
                "Referer": "https://music.amazon.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin",
                },
                'data': body
            });
            return show_home.data;
        } catch (error) { return { "error": String(error) }; }
    }
    export function getXAmznAuth(amzn_music: AmznMusic){
        return {
            "interface": "ClientAuthenticationInterface.v1_0.ClientTokenElement",
            "accessToken": amzn_music.appConfig.accessToken
        }
    } 
    export function getAmznCsrf(amzn_music: AmznMusic){
        return {
            "interface": "CSRFInterface.v1_0.CSRFHeaderElement",
            "token": amzn_music.appConfig.csrf.token,
            "timestamp": amzn_music.appConfig.csrf.ts,
            "rndNonce": amzn_music.appConfig.csrf.rnd
        }
    }
    export function getAmznVideoPlayerToken(auth_header: AuthHeader){
        return {
            "interface": auth_header.interface,
            "token": auth_header.token,
            "expirationMS": auth_header.expirationMS
        }
    }
    export function getAmznMusicHeaders(cookie_jar: CookieJar | undefined = undefined){
        return {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "text/plain;charset=UTF-8",
            "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "cross-site",
            "Referer": "https://music.amazon.com/",
            "Referrer-Policy": "strict-origin-when-cross-origin",
            "cache-control": "max-age=0",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "Cookies": cookie_jar?.toString(),
        }
    }
    export function getAmznMusicRequestHeaders(x_amzn_auth: ReturnType<typeof getXAmznAuth>, amzn_music: AmznMusic, x_amzn_csrf: ReturnType<typeof getAmznCsrf>, x_amzn_video_player_token: ReturnType<typeof getAmznVideoPlayerToken>, playlist_url = "https://music.amazon.com/my/library"){
        return {
            "x-amzn-authentication": JSON.stringify(x_amzn_auth),
            "x-amzn-device-model": "WEBPLAYER",
            "x-amzn-device-width": "1920",
            "x-amzn-device-family": "WebPlayer",
            "x-amzn-device-id": amzn_music.appConfig.deviceId,
            "x-amzn-user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
            "x-amzn-session-id": amzn_music.appConfig.sessionId,
            "x-amzn-device-height": "1080",
            "x-amzn-request-id": "449fef43-8891-44ab-896c-6ed4c9ec1e77",
            "x-amzn-device-language": amzn_music.appConfig.displayLanguage,
            "x-amzn-currency-of-preference": "USD",
            "x-amzn-os-version": "1.0",
            "x-amzn-application-version": amzn_music.appConfig.version,
            "x-amzn-device-time-zone": "America/Phoenix",
            "x-amzn-timestamp": amzn_music.appConfig.csrf.ts,
            "x-amzn-csrf": JSON.stringify(x_amzn_csrf),
            "x-amzn-music-domain": "music.amazon.com",
            "x-amzn-referer": "",
            "x-amzn-affiliate-tags": "",
            "x-amzn-ref-marker": "",
            "x-amzn-page-url": playlist_url,
            "x-amzn-weblab-id-overrides": "",
            "x-amzn-video-player-token": JSON.stringify(x_amzn_video_player_token),
            "x-amzn-feature-flags": "hd-supported,uhd-supported"
        }
    }
    export function getUserHash(){
        return {'level': 'SONIC_RUSH_MEMBER'}
    }
    export async function getAllPlaylistsFromAccount(cookie_jar: CookieJar|undefined = undefined): Promise<Map<string, string>|ResponseError>{
        try {
            const amzn_music = await getAmznMusicData("https://music.amazon.com/my/library", cookie_jar);
            if("error" in amzn_music) throw amzn_music.error;
            const show_home = await getShowHomeData(amzn_music, "https://music.amazon.com/my/library");
            if("error" in show_home) throw show_home.error;
    
            const x_amzn_auth = getXAmznAuth(amzn_music);
            const x_amzn_csrf = getAmznCsrf(amzn_music);
            const auth_header: AuthHeader = JSON.parse(show_home.methods[0].header);
            const x_amzn_video_player_token = getAmznVideoPlayerToken(auth_header);
            const request_headers = getAmznMusicRequestHeaders(x_amzn_auth,amzn_music, x_amzn_csrf, x_amzn_video_player_token);
            const user_hash = getUserHash();
            const request_payload = {'headers': JSON.stringify(request_headers), 'userHash': JSON.stringify(user_hash)};
            const show_library: ShowHome = (await axios({'method': 'POST', 'url': "https://na.mesk.skill.music.a2z.com/api/showLibraryHome", 'headers': getAmznMusicHeaders(),
                'data': request_payload
            })).data;
            const playlists = show_library.methods[0].template.widgets[1].items;
            const mapped_data = new Map<string, string>();
            for(let i = 0; i < playlists.length-1; i++){
                try {
                    mapped_data.set(
                        (playlists[i].primaryText as any).observer.defaultValue.text, //TODO: FIX TYPES
                        `https://music.amazon.com${playlists[i].primaryLink.deeplink}`
                    )
                } catch (error) {}
            }
    
            return mapped_data;
        } catch (error) { return { "error": String(error) }; }
    }

    export async function getPlaylist(url: string){
        try {
            const amzn_music = await getAmznMusicData(url);
            if("error" in amzn_music) throw amzn_music.error;
            const show_home = await getShowHomeData(amzn_music, url);
            if("error" in show_home) throw show_home.error;
        
            const template_list_index = show_home.methods.findIndex(method => method.interface === "TemplateListInterface.v1_0.CreateAndBindTemplateMethod");
            const amzn_track_data = show_home.methods[template_list_index].template.widgets[0].items;
           
            return amzn_track_data;
        } catch (error) { return { "error": String(error) }; }
    }
}