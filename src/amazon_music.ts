import axios from "axios";
import { ResponseError } from "./utils/types";

export namespace AmazonMusic {    
    export async function getAmznMusicData(url: string, cookies: string | undefined = undefined): Promise<ResponseError>{
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
                "Cookies": cookies as string
            };
            let amznMusic = {};
            {

                let configBody = ( await axios.get(url, {"headers": headers as any}) ).data
               
                const amznMusicRegex = /window.amznMusic = ({.+});/s
        
                //Fixing the shitty json
                let amznMusicText = amznMusicRegex.exec(configBody)[1]
                amznMusicText = amznMusicText.replaceAll(/\n\s+/g,'')
                                    .replace("appConfig", "\"appConfig\"")
                                    .replace("ssr:", "\"ssr\":")
                                    .replace("isInContainerApp: true,","\"isInContainerApp\": true")
                                    .replace("isInContainerApp: false,","\"isInContainerApp\": false")
                amznMusic = JSON.parse(amznMusicText);
            }
            return amznMusic;
        } catch (error) { return { "error": String(error) }; }
    }
    
    export async function getAmazonMusicShowHomeData(amznMusic: any, url: string){
        try {
            let trimmedURL = url.replace("https://",'').replace("music.amazon.com",'')
            let deeplink = {
                "interface": "DeeplinkInterface.v1_0.DeeplinkClientInformation",
                "deeplink": trimmedURL
            }
            let x_amzn_authentication = {
                "interface": "ClientAuthenticationInterface.v1_0.ClientTokenElement",
                "accessToken": amznMusic.appConfig.accessToken
            }
            let x_amzn_csrf = {
                "interface": "CSRFInterface.v1_0.CSRFHeaderElement",
                "token": amznMusic.appConfig.csrf.token,
                "timestamp": amznMusic.appConfig.csrf.ts,
                "rndNonce": amznMusic.appConfig.csrf.rnd
            }
            let headers = {
                "x-amzn-authentication": JSON.stringify(x_amzn_authentication),
                "x-amzn-device-model": "WEBPLAYER",
                "x-amzn-device-width": "1920",
                "x-amzn-device-family": "WebPlayer",
                "x-amzn-device-id": amznMusic.appConfig.deviceId,
                "x-amzn-user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
                "x-amzn-session-id": amznMusic.appConfig.sessionId,
                "x-amzn-device-height": "1080",
                "x-amzn-request-id": "dfefb1b8-4ae6-4d38-973b-a4964eefbd76",
                "x-amzn-device-language": amznMusic.appConfig.displayLanguage,
                "x-amzn-currency-of-preference": "USD",
                "x-amzn-os-version": "1.0",
                "x-amzn-application-version": amznMusic.appConfig.version,
                "x-amzn-device-time-zone": "America/Phoenix",
                "x-amzn-timestamp": amznMusic.appConfig.csrf.ts,
                "x-amzn-csrf": JSON.stringify(x_amzn_csrf),
                "x-amzn-music-domain": "music.amazon.com",
                "x-amzn-referer": "",
                "x-amzn-affiliate-tags": "",
                "x-amzn-ref-marker": "",
                "x-amzn-page-url": url,
                "x-amzn-weblab-id-overrides": "",
                "x-amzn-video-player-token": "",
                "x-amzn-feature-flags": "hd-supported,uhd-supported"
            }
            let body = JSON.stringify({"deeplink": JSON.stringify(deeplink), "headers": JSON.stringify(headers)})
            let showHomeData = await axios({'method': 'POST', 'url': "https://na.mesk.skill.music.a2z.com/api/showHome", 'headers': {
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
            return showHomeData.data
        } catch (error) {
            console.log(error)
        }
    }
    export function getXAmznAuth(amznMusic: any){
        return {
            "interface": "ClientAuthenticationInterface.v1_0.ClientTokenElement",
            "accessToken": amznMusic.appConfig.accessToken
        }
    } 
    export function getAmznCsrf(amznMusic: any){
        return {
            "interface": "CSRFInterface.v1_0.CSRFHeaderElement",
            "token": amznMusic.appConfig.csrf.token,
            "timestamp": amznMusic.appConfig.csrf.ts,
            "rndNonce": amznMusic.appConfig.csrf.rnd
        }
    }
    export function getAmznVideoPlayerToken(authHeader: any){
        return {
            "interface": authHeader.interface,
            "token": authHeader.token,
            "expirationMS": authHeader.expirationMS
        }
    }
    export function getAmznMusicHeaders(){
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
        }
    }
    export function getAmznMusicRequestHeaders(xAmznAuth: any, amznMusic: any, xAmznCsrf: any, xAmznVideoPlayerToken: any, playlistURL = "https://music.amazon.com/my/library"){
        return {
            "x-amzn-authentication": JSON.stringify(xAmznAuth),
            "x-amzn-device-model": "WEBPLAYER",
            "x-amzn-device-width": "1920",
            "x-amzn-device-family": "WebPlayer",
            "x-amzn-device-id": amznMusic.appConfig.deviceId,
            "x-amzn-user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
            "x-amzn-session-id": amznMusic.appConfig.sessionId,
            "x-amzn-device-height": "1080",
            "x-amzn-request-id": "449fef43-8891-44ab-896c-6ed4c9ec1e77",
            "x-amzn-device-language": amznMusic.appConfig.displayLanguage,
            "x-amzn-currency-of-preference": "USD",
            "x-amzn-os-version": "1.0",
            "x-amzn-application-version": amznMusic.appConfig.version,
            "x-amzn-device-time-zone": "America/Phoenix",
            "x-amzn-timestamp": amznMusic.appConfig.csrf.ts,
            "x-amzn-csrf": JSON.stringify(xAmznCsrf),
            "x-amzn-music-domain": "music.amazon.com",
            "x-amzn-referer": "",
            "x-amzn-affiliate-tags": "",
            "x-amzn-ref-marker": "",
            "x-amzn-page-url": playlistURL,
            "x-amzn-weblab-id-overrides": "",
            "x-amzn-video-player-token": JSON.stringify(xAmznVideoPlayerToken),
            "x-amzn-feature-flags": "hd-supported,uhd-supported"
        }
    }
    export function getUserHash(){
        return {'level': 'SONIC_RUSH_MEMBER'}
    }
    export async function getAllPlaylistsFromAccount(){
        try {
            let amznMusic = await getAmazonMusicAmznMusicData("https://music.amazon.com/my/library")
            let showHomeData = await getAmazonMusicShowHomeData(amznMusic, "https://music.amazon.com/my/library");
    
            let xAmznAuth = getXAmznAuth(amznMusic);
            let xAmznCsrf = getAmznCsrf(amznMusic);
            let authHeader = JSON.parse(showHomeData.methods[0].header);
            let xAmznVideoPlayerToken = getAmznVideoPlayerToken(authHeader);
            let rqHeaders = getAmznMusicRequestHeaders(xAmznAuth,amznMusic,xAmznCsrf,xAmznVideoPlayerToken);
            let userHash = getAmazonMusicUserHash();
            let requestPayload = {'headers': JSON.stringify(rqHeaders), 'userHash': JSON.stringify(userHash)};
            let showLibraryData = (await axios({'method': 'POST', 'url': "https://na.mesk.skill.music.a2z.com/api/showLibraryHome", 'headers': getAmznMusicHeaders(),
                'data': requestPayload
            })).data;
            let playlists = showLibraryData.methods[0].template.widgets[1].items
            let mappedData = new Map<string, string>();
            for(let i = 0; i < playlists.length-1; i++){
                try {
                    mappedData.set(
                        playlists[i].primaryText.observer.defaultValue.text, 
                        `https://music.amazon.com${playlists[i].primaryLink.deeplink}`
                    )
                } catch (error) {
                    // console.log(error)
                }
            }
    
            return mappedData;
          } catch (error) {
            Alert.alert("Amazon Playlist Finder Error", error)
            return new Map<string, string>();
          }
    }

    export async function getPlaylist(url: string) : Promise<ResponseError>{
        try {
            const amznMusic = await getAmazonMusicAmznMusicData(url);
                                
            let trimmedURL = url.replace("https://",'').replace("music.amazon.com",'');
        
            let playlistData = await getAmazonMusicShowHomeData(amznMusic, url);
        
            let templateListIndex = -1;
            for(let i = 0; i < playlistData.methods.length; i++){
                if(playlistData.methods[i].interface == "TemplateListInterface.v1_0.CreateAndBindTemplateMethod"){
                    templateListIndex = i;
                }
            }
        
            let amznTrackData = playlistData.methods[templateListIndex].template.widgets[0].items;
            const tracks = [];
        
            for(let i = 0; i < amznTrackData.length; i++){
                tracks.push({
                    'id': amznTrackData[i].primaryLink.deeplink.replace(/.+?trackAsin=/,''),
                    'video_name': amznTrackData[i].primaryText,
                    'video_creator': amznTrackData[i].secondaryText1,
                })
            }
            let proxies = await getProxyList();
                
            async function searchYT(title, artist, proxy = null, amznTData = null){
                let search_query = `${artist} - ${title}`;
                let ytSearchResult = await SearchYouTube(search_query, 0, proxy)
                let result = ytSearchResult.data[0]
                result['exid'] = JSON.stringify([
                    {"service": "amazon", "exid": amznTData}
                ])
                return result
            }
            
            const ytTracks = [];
            for(let i = 0; i < tracks.length; i++){
                ytTracks.push(
                    searchYT(tracks[i].video_name, tracks[i].video_creator, proxies[getRandomIndex(proxies.length)], 
                    {"id": tracks[i].id,
                    "title": tracks[i].video_name,
                    "artist": tracks[i].video_creator})
                )
            }
            let results = await Promise.all(ytTracks)
    
            results = results.filter(item => item != undefined)
            for(let i = 0; i < results.length; i++){
                results[i]['saved'] = false;
                if(await SQLActions.checkIfVideoIdExists(results[i].video_id))
                    results[i]['saved'] = true;
            }
            return {tracks: results, title: playlistData.methods[templateListIndex].template.headerImageAltText}
          } catch (error) {
            return { "error": String(error) };
          }
    }
}