import { ResponseError } from "../utils/types";
import { CookieJar } from "../utils/cookie_util";
import { AmznMusic } from "./types/AmznMusic";
import { ShowHome } from "./types/ShowHome";
import { ShowLibraryHome } from "./types/ShowLibraryHome";
import { CreateAndBindMethod } from "./types/ShowHomeCreateAndBindMethod";
import { SearchResult } from "./types/SearchResult";

export namespace AmazonMusic {
    interface AuthHeader {
        interface: string,
        token: string,
        expirationMS: number
    }
    type Opts = { cookie_jar?: CookieJar, client?: AmznMusic };

    export async function getAmznMusicData(url: string, opts: Opts): Promise<AmznMusic|ResponseError>{
        try {
            const headers = {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "max-age=0",
                "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "none",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
                "cookie": opts.cookie_jar?.toString() as string
            };
            const result = await fetch("https://music.amazon.com/", {
                headers,
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": null,
                "method": "GET"
            });

            const config_body = await result.text();
            
            const amzn_music_regex = /window.amznMusic = ({.+});/s
            //Fixing the shitty json
            const amzn_music_regex_exec = amzn_music_regex.exec(config_body);
            if(amzn_music_regex_exec == null) throw "Couldn't parse AmznMusic body"; 
            const amzn_music_text = amzn_music_regex_exec[1].replace(/\n\s+/g,'')
                                .replace("appConfig", "\"appConfig\"")
                                .replace("ssr:", "\"ssr\":")
                                .replace("isInContainerApp: true,","\"isInContainerApp\": true")
                                .replace("isInContainerApp: false,","\"isInContainerApp\": false");
            const amzn_music = JSON.parse(amzn_music_text);
            return amzn_music;
        } catch (error) { return { "error": String(error) }; }
    }

    //Note opts.client does nothing here
    export async function getShowHomeData(amzn_music: AmznMusic, url: string, opts: Opts): Promise<ShowHome|ResponseError>{
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
                "x-amzn-user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
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

            const show_home_body = await fetch("https://na.mesk.skill.music.a2z.com/api/showHome", {'method': 'POST', 'headers': {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "content-type": "text/plain;charset=UTF-8",
                "priority": "u=1, i",
                "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "cross-site",
                "Referer": "https://music.amazon.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
                },
                'body': body
            });
            const show_home: ShowHome = await show_home_body.json();
            return show_home;
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
            "cookie": cookie_jar?.toString() as string,
        }
    }
    export async function getAmznMusicRequestHeadersDefault(amzn_music: AmznMusic, playlist_url: string, opts: Opts){
        try {
            const show_home = await getShowHomeData(amzn_music, playlist_url, opts);
            if("error" in show_home) throw show_home.error;
            if(show_home.methods[0].interface !== "VideoPlayerAuthenticationInterface.v1_0.SetVideoPlayerTokenMethod")
                throw "SetVideoPlayerTokenMethod not found in Show Home method interface";
            if("header" in show_home.methods[0]){
                const auth_header = JSON.parse(show_home.methods[0].header);
                const x_amzn_auth = getXAmznAuth(amzn_music);
                const amzn_csrf = getAmznCsrf(amzn_music);
                const x_amzn_video_player_token = getAmznVideoPlayerToken(auth_header);
                const request_headers = getAmznMusicRequestHeaders(x_amzn_auth, amzn_music, amzn_csrf, x_amzn_video_player_token, playlist_url);
                return request_headers;
            }
            else throw "Couldn't find header in in show_home.methods[0]"
        } catch (error) { return { "error": String(error) }; }
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
    export async function getAllPlaylistsFromAccount(opts: Opts): Promise<Map<string, string>|ResponseError>{
        try {
            const amzn_music = opts.client ?? await getAmznMusicData("https://music.amazon.com/my/library", opts);
            if("error" in amzn_music) throw amzn_music.error;
            const request_headers = await getAmznMusicRequestHeadersDefault(amzn_music, "https://music.amazon.com/my/library", opts);
            if("error" in  request_headers) throw request_headers.error;
            const user_hash = getUserHash();
            const request_payload = {'headers': JSON.stringify(request_headers), 'userHash': JSON.stringify(user_hash)};
            const show_library: ShowLibraryHome = await (await fetch("https://na.mesk.skill.music.a2z.com/api/showLibraryHome", {'method': 'POST', 'headers': getAmznMusicHeaders(opts.cookie_jar),
                'body': JSON.stringify(request_payload)
            })).json();
            if(show_library.methods[0].interface !== "TemplateListInterface.v1_0.BindTemplateMethod")
                throw "TemplateListInterface not found in Show Library Home method interface";
            const playlists = show_library.methods[0].template.widgets[1].items;
            const mapped_data = new Map<string, string>();
            for(let i = 0; i < playlists.length-1; i++){
                try {
                    mapped_data.set(
                        playlists[i].imageAltText as string, //TODO: FIX TYPES
                        `https://music.amazon.com${playlists[i].primaryLink.deeplink}`
                    )
                } catch (error) { }
            }
    
            return mapped_data;
        } catch (error) { return { "error": String(error) }; }
    }

    export function getTrackID(track: {"primaryLink": {"deeplink": string}}){
        return track.primaryLink.deeplink.replace(/\/.+?\/.+?\?trackAsin=/, '');
    }

    export async function getPlaylist(playlist_url: string, opts: Opts){
        try {
            const amzn_music = opts.client ?? await getAmznMusicData(playlist_url, opts);
            if("error" in amzn_music) throw amzn_music.error;
            const show_home = await getShowHomeData(amzn_music, playlist_url, opts);
            if("error" in show_home) throw show_home.error;
        
            const template_list_index = show_home.methods.findIndex(method => method.interface === "TemplateListInterface.v1_0.CreateAndBindTemplateMethod");
            if (template_list_index === -1) throw "Unable to find TemplateListInterface.v1_0.CreateAndBindTemplateMethod";
            const amzn_track_data = (show_home.methods[template_list_index] as CreateAndBindMethod).template.widgets[0].items;
           
            return {"title": (show_home.methods[template_list_index] as CreateAndBindMethod).template.headerImageAltText, "tracks": amzn_track_data};
        } catch (error) { return { "error": String(error) }; }
    }

    export async function search(query: string, opts: Opts){
        try {		
            const url = `https://music.amazon.com/search/${query.replace(/\s+/g, '+').replace(/[^A-Za-z0-9+]+/g, '')}`
            const filter = {'IsLibrary': ["false"]}
            const keyword = {
                "interface": "Web.TemplatesInterface.v1_0.Touch.SearchTemplateInterface.SearchKeywordClientInformation",
                "keyword": ""
            }
            
            const amzn_music = opts.client ?? await getAmznMusicData(url, opts);
            if("error" in amzn_music) throw amzn_music.error;
        
            const user_hash = getUserHash();
            const request_headers = await getAmznMusicRequestHeadersDefault(amzn_music, url, opts);
            if("error" in  request_headers) throw request_headers.error;

            const request_payload = {
                "filter":JSON.stringify(filter),
                "keyword": JSON.stringify(keyword),
                "suggestedKeyword": query,
                "userHash":	JSON.stringify(user_hash),
                "headers": JSON.stringify(request_headers)
            }
            const response: SearchResult = await (await fetch("https://na.mesk.skill.music.a2z.com/api/showSearch", {'method': 'POST', 'headers': getAmznMusicHeaders(opts.cookie_jar), 'body': JSON.stringify(request_payload)})).json();
            
            let song_widgets_index = 2;
            const widgets = response.methods[0].template.widgets
            for(let i = 0; i < widgets.length; i++){
                if(widgets[i].header == "Songs"){
                    song_widgets_index = i;
                }
            }
            const tracks = response.methods[0].template.widgets[song_widgets_index].items;
            return tracks;
        } catch (error) { return {"error": String(error)}; }
    }
    export async function addToPlaylist(playlist_url: string, playlist_name: string, uids: string[], opts: Opts){
        try {
            const playlist_id = playlist_url.replace(/(https?:\/\/)?(www\.)?music\.amazon\.com\/my\/playlists\//, '');
        
            const amzn_music = opts.client ?? await getAmznMusicData(playlist_url, opts);
            if("error" in amzn_music) throw amzn_music.error;
        
            const user_hash = getUserHash();
            const request_headers = await getAmznMusicRequestHeadersDefault(amzn_music, playlist_url, opts);
            if("error" in request_headers) throw request_headers.error;
            
            const selected_ids = {
                "interface": "Web.PageInterface.v1_0.SelectedItemsClientInformation",
                "ids": uids
            };
    
            const request_payload = {
                "headers": JSON.stringify(request_headers),
                "playlistId": playlist_id,
                "playlistTitle": playlist_name,
                "rejectDuplicate": "true",
                "selectedIds": JSON.stringify(selected_ids),
                "userHash": JSON.stringify(user_hash),
                "version": "14",
            };
            const response = await fetch("https://na.mesk.skill.music.a2z.com/api/addTracksToPlaylist", {'method': 'POST', 'headers': getAmznMusicHeaders(opts.cookie_jar),
                'body': JSON.stringify(request_payload)
            });
            return response;
        } catch (error) { return { "error": error }; }
    }
    function pause(ms: number) { return new Promise( resolve => setTimeout(resolve, ms) ); }
    export async function deleteFromPlaylist(playlist_url: string, track_ids: string[], delay: number, opts: Opts){
        try {
            const playlist_id = playlist_url.replace(/(https?:\/\/)?(www\.)?music\.amazon\.com\/my\/playlists\//, '');
        
            const amzn_music = opts.client ?? await getAmznMusicData(playlist_url, opts);
            if("error" in amzn_music) throw amzn_music.error;

            const playlist = await getPlaylist(playlist_url, {"client": amzn_music});
            if("error" in playlist) throw playlist.error;
            
            const user_hash = getUserHash();
            const request_headers = await getAmznMusicRequestHeadersDefault(amzn_music, playlist_url, opts);
            if("error" in request_headers) throw request_headers.error;
            
            let result = {"ok": true};
            for(const track_id in track_ids){
                try {
                    const playlist_item = playlist.tracks.find((item) => getTrackID(item) === track_id);
                    const request_payload = {
                        "headers": JSON.stringify(request_headers),
                        "playlistId": playlist_id,
                        "trackEntryId": playlist_item?.id,
                        "trackId": track_id,
                        "userHash": JSON.stringify(user_hash),
                    };
                    const response = await fetch("https://na.mesk.skill.music.a2z.com/api/removeTrackFromPlaylist", {'method': 'POST', 'headers': getAmznMusicHeaders(opts.cookie_jar),
                        'body': JSON.stringify(request_payload)
                    });
                    if(!response.ok) result.ok = false;
                } catch (error) { result.ok = false; }
                finally { if(delay > 0) pause(delay); }
            }
            return result;
        } catch (error) { return { "error": error }; }
    }
    export async function createPlaylist(playlist_name: string, opts: Opts){
        const url = "https://music.amazon.com/my/library";
        const amzn_music = opts.client ?? await getAmznMusicData(url, opts);
        if("error" in amzn_music) throw amzn_music.error;
    
        const user_hash = getUserHash();
        const request_headers = await getAmznMusicRequestHeadersDefault(amzn_music, url, opts);
        if("error" in request_headers) throw request_headers.error;
        
        const playlist_info = { "interface":"Web.TemplatesInterface.v1_0.Touch.PlaylistTemplateInterface.PlaylistClientInformation", "name": playlist_name, "path":"/my/library" };

        const request_payload = {
            "headers": JSON.stringify(request_headers),
            "playlistInfo": JSON.stringify(playlist_info),
            "userHash": JSON.stringify(user_hash)
        };
        const response = await fetch("https://na.mesk.skill.music.a2z.com/api/createPlaylist", {'method': 'POST', 'headers': getAmznMusicHeaders(opts.cookie_jar),
            'body': JSON.stringify(request_payload)
        });
        return response;
    }
    export async function deletePlaylist(playlist_url: string, opts: Opts){
        const amzn_music = opts.client ?? await getAmznMusicData(playlist_url, opts);
        if("error" in amzn_music) throw amzn_music.error;
    
        const user_hash = getUserHash();
        const request_headers = await getAmznMusicRequestHeadersDefault(amzn_music, playlist_url, opts);
        if("error" in request_headers) throw request_headers.error;

        const playlist_id = playlist_url.replace("https://", "").replace("www.", "music.amazon.com/").replace("my/playlists/", "");
        
        const request_payload = {
            "headers": JSON.stringify(request_headers),
            "id": playlist_id,
            "userHash": JSON.stringify(user_hash)
        };
        const response = await fetch("https://na.mesk.skill.music.a2z.com/api/removePlaylist", {'method': 'POST', 'headers': getAmznMusicHeaders(opts.cookie_jar),
            'body': JSON.stringify(request_payload)
        });
        return response;
    }
}