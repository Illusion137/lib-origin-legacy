import * as sha1 from 'sha1-uint8array'
import { CookieJar } from './utils/cookie_util';
import { generateNewUID, decodeHex } from './utils/util';

export namespace YouTube {
    type YouTubeType = "DESKTOP" | "MOBILE";

    export function getPlaylistIdFromURL(url: string){
        const idRegex = /(https?:\/\/)?(www\.)?youtube\.com\/playlist\?list=/;
        return url.replace(idRegex, '');
    }
    export function getYouTubeSapisidHashAuth(SAPISID: string, ORIGIN = 'https://www.youtube.com'){
        const time_stamp_seconds_str = String(new Date().getTime()).slice(0,10);
        const data_string = [time_stamp_seconds_str, SAPISID, ORIGIN].join(' ');
        const data = Uint8Array.from(Array.from(data_string).map(letter => letter.charCodeAt(0)));
        const sha_digest = sha1.createHash().update(data).digest("hex");
        const SAPISIDHASH = `SAPISIDHASH ${time_stamp_seconds_str}_${sha_digest}`;
        return SAPISIDHASH;
    }
    export function getAdSignalsInfoParams(){
        return [{"key":"dt","value":"1696043921913"},{"key":"flash","value":"0"},{"key":"frm","value":"0"},{"key":"u_tz","value":"-420"},{"key":"u_his","value":"5"},{"key":"u_h","value":"1440"},{"key":"u_w","value":"2560"},{"key":"u_ah","value":"1392"},{"key":"u_aw","value":"2560"},{"key":"u_cd","value":"24"},{"key":"bc","value":"31"},{"key":"bih","value":"1283"},{"key":"biw","value":"1511"},{"key":"brdim","value":"0,0,0,0,2560,0,2560,1392,1528,1283"},{"key":"vis","value":"1"},{"key":"wgl","value":"true"},{"key":"ca_type","value":"image"}];
    }
    export function getHeaders(cookie_jar: CookieJar|undefined = undefined){
        return { 
            'authority': 'www.youtube.com', 
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7', 
            'accept-language': 'en-US,en;q=0.9', 
            'cache-control': 'max-age=0', 
            'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"', 
            'sec-ch-ua-arch': '"x86"', 
            'sec-ch-ua-bitness': '"64"', 
            'sec-ch-ua-full-version': '"117.0.5938.92"', 
            'sec-ch-ua-full-version-list': '"Google Chrome";v="117.0.5938.92", "Not;A=Brand";v="8.0.0.0", "Chromium";v="117.0.5938.92"', 
            'sec-ch-ua-mobile': '?0', 
            'sec-ch-ua-model': '""', 
            'sec-ch-ua-platform': '"Windows"', 
            'sec-ch-ua-platform-version': '"15.0.0"', 
            'sec-ch-ua-wow64': '?0', 
            'sec-fetch-dest': 'document', 
            'sec-fetch-mode': 'navigate', 
            'sec-fetch-site': 'none', 
            'sec-fetch-user': '?1', 
            'service-worker-navigation-preload': 'true', 
            'upgrade-insecure-requests': '1', 
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36', 
            'x-client-data': 'CKS1yQEIh7bJAQiitskBCKmdygEI6NTKAQiQ+soBCJahywEI85jNAQiFoM0BCNy9zQEI38TNAQi5ys0BCMXRzQEI1NTNAQjM1s0BCOLWzQEI+cDUFRi60s0BGOuNpRc=',
            'cookie': cookie_jar?.toString()
          };
    }
    export async function getYouTubeInitialData(url = 'https://www.youtube.com/', jar: CookieJar){
        try {
            const innertubeApiKeyRegex = /"INNERTUBE_API_KEY": ?\"(.+?)\"/s;
            const innertubeContextRegex = /INNERTUBE_CONTEXT": ?({.+?}})/s;
            let config = {
                method: 'GET',
                maxBodyLength: Infinity,
                headers: { 
                'authority': 'www.youtube.com', 
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7', 
                'accept-language': 'en-US,en;q=0.9', 
                'cache-control': 'max-age=0', 
                'cookie': jar.toString(),  
                'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"', 
                'sec-ch-ua-arch': '"x86"', 
                'sec-ch-ua-bitness': '"64"', 
                'sec-ch-ua-full-version': '"117.0.5938.92"', 
                'sec-ch-ua-full-version-list': '"Google Chrome";v="117.0.5938.92", "Not;A=Brand";v="8.0.0.0", "Chromium";v="117.0.5938.92"', 
                'sec-ch-ua-mobile': '?0', 
                'sec-ch-ua-model': '""', 
                'sec-ch-ua-platform': '"Windows"', 
                'sec-ch-ua-platform-version': '"15.0.0"', 
                'sec-ch-ua-wow64': '?0', 
                'sec-fetch-dest': 'document', 
                'sec-fetch-mode': 'navigate', 
                'sec-fetch-site': 'none', 
                'sec-fetch-user': '?1', 
                'service-worker-navigation-preload': 'true', 
                'upgrade-insecure-requests': '1', 
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36', 
                'x-client-data': 'CKS1yQEIh7bJAQiitskBCKmdygEI6NTKAQiQ+soBCJahywEI85jNAQiFoM0BCNy9zQEI38TNAQi5ys0BCMXRzQEI1NTNAQjM1s0BCOLWzQEI+cDUFRi60s0BGOuNpRc='
                }
            };

            const response = await (await fetch(url, config)).text();

            const INNERTUBE_API_KEY = innertubeApiKeyRegex.exec(response)?.[1] ?? "";
            let INNERTUBE_CONTEXT = JSON.parse( ((innertubeContextRegex.exec(response)?.[1] ?? "").replace(/\n\s+/g,'')));
            INNERTUBE_CONTEXT['adSignalsInfo'] = { 'params': getAdSignalsInfoParams() }
            INNERTUBE_CONTEXT['request']['consistencyTokenJars'] = []
            INNERTUBE_CONTEXT['request']['internalExperimentFlags'] = [ { "key": "force_enter_once_in_webview", "value": "true" } ];

            let returnData = {
                'INNERTUBE_API_KEY': INNERTUBE_API_KEY, 
                'INNERTUBE_CONTEXT': INNERTUBE_CONTEXT, 
                'data': response };
            return returnData;
        } catch (error) {
            // console.log(error)
            return null;
        }
    }
    export async function getYoutubePlaylist(url: string) {
        try{
            let body;
            let continue_ = true;
    
            let videos: Track[] = []
            
            let initialData = await getYouTubeInitialData(url);
            if(initialData === null){
                throw new Error("YouTube Initial Data is null")
            }
    
            const apikey = initialData.INNERTUBE_API_KEY
            const clientKey = initialData.INNERTUBE_CONTEXT
    
            const dataRegex  = /var ytInitialData ?= ?\'(.+?)\';<\/script>/gs
            const data2Regex  = /var ytInitialData ?= ?({.+?});<\/script>/gs
            // const continuationTokenRegex = /continuationCommand.+?:\\x22(.+?)\\x22,/
            const trackingParamsRegex = /"clickTrackingParams": ?"(.+?)"/s
            const continuationTokenRegex = /continuationCommand.+?:"(.+?)",/s
            const titleRegex = /<title>(.+?) - YouTube<\/title>/
            // console.log(decodeHex( initialData.data))
            let raw;
            try {
                raw = dataRegex.exec(initialData.data)[1]
                raw = decodeHex(raw)
            } catch (error) {
                raw = data2Regex.exec(initialData.data)[1]
            }
    
            let continuationToken;
            try {
                continuationToken = continuationTokenRegex.exec(initialData.data)[1]
            } catch (error) {
                continue_ = false;
            }
    
            const title = titleRegex.exec(initialData.data)[1]
    
            let data = JSON.parse(raw.replaceAll(/\n\s+/g,''))
            data.apikey = apikey
    
            let playlistVideoRenderers = [...JSON.stringify(data).matchAll(/({"playlistVideoRenderer.+?"}]}}})[^\]]/g)]
            
            for (let i = 0; i < playlistVideoRenderers.length-1; i++){
                try {
                    let parsedVideo = JSON.parse(playlistVideoRenderers[i][1])
                    videos.push(new Track({
                        'video_id': parsedVideo.playlistVideoRenderer.videoId,
                        'video_name': parsedVideo.playlistVideoRenderer.title.runs[0].text,
                        'video_creator': parsedVideo.playlistVideoRenderer.shortBylineText.runs[0].text,
                        'video_duration': durationToInt(parsedVideo.playlistVideoRenderer.lengthText.accessibility.accessibilityData.label),
                    }))
                } catch (error) {
                }
            }
            
            if(continue_){
                let continuedVideos = await getYoutubePlaylistContinuation(apikey, continuationToken, clientKey, url, trackingParamsRegex.exec(raw)[1]);
                videos = videos.concat(continuedVideos);
            }
    
            videos = videos.filter(item => item != undefined)
        
            return {'tracks': videos, 'title': title};
        }
        catch(error){
            // console.log(error)
            return {'tracks': [], 'title': null};
        }
    }
    async function getYoutubePlaylistContinuation(innertube_api_key: string, continuationKey: string, context: any, url: string, trackingParams: any){
        try {
            const videos = [];
            const post_url = `https://www.youtube.com/youtubei/v1/browse?key=${innertube_api_key}&prettyPrint=false`;
            const post_data = {
                "context": {
                    "client": {
                        "hl": context.client.hl,
                        "gl": context.client.gl,
                        "remoteHost": context.client.remoteHost,
                        "deviceMake": "",
                        "deviceModel": "",
                        "visitorData": context.client.visitorData,
                        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36,gzip(gfe)",
                        "clientName": "WEB",
                        "clientVersion": context.client.clientVersion,
                        "osName": "Windows",
                        "osVersion": "10.0",
                        "originalUrl": url,
                        "platform": "DESKTOP",
                        "clientFormFactor": "UNKNOWN_FORM_FACTOR",
                        "configInfo": {
                            "appInstallData": "CKDJ_qgGEMP3rwUQ2cmvBRC3768FEKbs_hIQtMmvBRDT4a8FEKn3rwUQ4tSuBRDzqK8FEJrwrwUQp_evBRDuoq8FENShrwUQ9fmvBRDMrv4SENvYrwUQvbauBRC8668FEPD0_hIQuPuvBRDnuq8FEKT4rwUQvvmvBRCj3q8FEJ_jrwUQu9KvBRCX5_4SELiLrgUQ1-mvBRDZ7q8FEOrDrwUQp-r-EhDF-68FEMHqrwUQvPmvBRDd6P4SEJTZ_hIQieiuBRCu-q8FEKXC_hIQ65OuBRC1pq8FEOPyrwUQ-r6vBRDp6P4SELfq_hIQiOOvBRDbr68FEOSz_hIQrLevBRCD368FEI75rwUQzN-uBRDV5a8FEOvo_hIQ2--vBRDs4a8F"
                        },
                        "userInterfaceTheme": "USER_INTERFACE_THEME_DARK",
                        "timeZone": "America/Phoenix",
                        "browserName": "Chrome",
                        "browserVersion": "117.0.0.0",
                        "acceptHeader": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                        "deviceExperimentId": "ChxOekk0TmpjeU16Y3pNVEkxTURNeU9ESTJPUT09EKDJ_qgGGKDJ_qgG",
                        "screenWidthPoints": 1636,
                        "screenHeightPoints": 1283,
                        "screenPixelDensity": 1,
                        "screenDensityFloat": 1,
                        "utcOffsetMinutes": -420,
                        "connectionType": "CONN_CELLULAR_4G",
                        "memoryTotalKbytes": "8000000",
                        "mainAppWebInfo": {
                            "graftUrl": url,
                            "pwaInstallabilityStatus": "PWA_INSTALLABILITY_STATUS_CAN_BE_INSTALLED",
                            "webDisplayMode": "WEB_DISPLAY_MODE_BROWSER",
                            "isWebNativeShareAvailable": true
                        }
                    },
                    "user": {
                        "lockedSafetyMode": false
                    },
                    "request": {
                        "useSsl": true,
                        "internalExperimentFlags": [
                            {
                                "key": "force_enter_once_in_webview",
                                "value": "true"
                            }
                        ],
                        "consistencyTokenJars": []
                    },
                    "clickTracking": {
                        "clickTrackingParams":trackingParams
                    },
                    "adSignalsInfo": context.adSignalsInfo
                },
                "continuation": continuationKey
            }
            let SAPISID = Prefs.cookiesToJson(Prefs.prefs.external_services.youtube_cookies)['SAPISID']
            let SAPISIDHASH = getYouTubeSapisidHashAuth(SAPISID);
    
            let headers = {
                "accept": "*/*",
                'user-agent': "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36,gzip(gfe)", 
                "accept-language": "en-US,en;q=0.9",
                "authorization": SAPISIDHASH,
                "content-type": "application/json",
                "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
                "sec-ch-ua-arch": "\"x86\"",
                "sec-ch-ua-bitness": "\"64\"",
                "sec-ch-ua-full-version": "\"117.0.5938.132\"",
                "sec-ch-ua-full-version-list": "\"Google Chrome\";v=\"117.0.5938.132\", \"Not;A=Brand\";v=\"8.0.0.0\", \"Chromium\";v=\"117.0.5938.132\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-model": "\"\"",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-ch-ua-platform-version": "\"15.0.0\"",
                "sec-ch-ua-wow64": "?0",
                "x-client-data": "CKS1yQEIh7bJAQiitskBCKmdygEI6NTKAQiQ+soBCJWhywEI85jNAQiFoM0BCNy9zQEI38TNAQi5ys0BCMXRzQEIzNbNAQji1s0BCKjYzQEIttjNAQj5wNQVGLrSzQEYyNjNARjrjaUX",
                "x-goog-authuser": "0",
                "x-goog-visitor-id": "CgtVbmR5bk9HMFZ1ayjd0v2oBjIICgJVUxICGgA%3D",
                "x-origin": "https://www.youtube.com",
                "x-youtube-bootstrap-logged-in": "true",
                "x-youtube-client-name": "1",
                "x-youtube-client-version": "2.20231003.02.01",
                "Cookies": Prefs.prefs.external_services.youtube_cookies,
                "Referer": url,
            }
            
            let body = await axios({'method': 'POST', 'url': postURL, 'headers': headers, 'data': postData})
            let contents = body.data;
            // console.log(JSON.stringify(contents))
            let continuationTokenGood = false;
            let continutationToken = undefined;
            let continuationItems = undefined;
            try {
                continuationItems = contents.onResponseReceivedActions[0].appendContinuationItemsAction.continuationItems;
                continutationToken = continuationItems[continuationItems.length-1].continuationItemRenderer.continuationEndpoint.continuationCommand.token;
                continuationTokenGood = true;
            } catch (error) {
                console.log(error);
            }
    
            let playlistVideoRenderers = continuationItems.slice(0,continuationItems.length-1)
    
            for (let i = 0; i < playlistVideoRenderers.length-1; i++){
                try {
                    let video = playlistVideoRenderers[i];
                    videos.push(new Track({
                        'video_id': video.playlistVideoRenderer.videoId,
                        'video_name': video.playlistVideoRenderer.title.runs[0].text,
                        'video_creator': video.playlistVideoRenderer.shortBylineText.runs[0].text,
                        'video_duration': durationToInt(video.playlistVideoRenderer.lengthText.accessibility.accessibilityData.label),
                    }))
                } catch (error) {
                    console.log(error);
                }
            }
    
            if(continuationTokenGood){
                videos = videos.concat(await getYoutubePlaylistContinuation(innertube_api_key, continutationToken, context, url, trackingParams));
            }
    
            return videos;
    
        } catch (error) {
            console.log(error)
            return []
        }
    }

    export async function getAllYoutubePlaylistsFromAccount(jar: CookieJar){
        try {
            const response = await (await fetch("https://www.youtube.com/feed/library", {'method': 'GET', 'headers': {
                'cookie': jar.toString()
            }})).text();
            const decoded_response = decodeHex(response);

            const yt_initial_data_regex = /var ytInitialData = (.+?);.+?<\/script>/gs;
            const yt_initial_data_executed = yt_initial_data_regex.exec(decoded_response);
            if(yt_initial_data_executed === null) throw "Couldn't Obtain yt_initial_data";
            const yt_initial_data_string = yt_initial_data_executed[1].replace(/\n\s+/g,'');
            let yt_initial_data_stringified = JSON.stringify(yt_initial_data_string);
            yt_initial_data_stringified = yt_initial_data_stringified.slice(2, yt_initial_data_stringified.length - 2);
            const yt_initial_data = JSON.parse(decodeHex(yt_initial_data_stringified));
            
            const playlist_names_data = yt_initial_data.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[2].shelfRenderer.content.verticalListRenderer.items
            const playlist_names_map = new Map<string, string>();
            for(const playlist_name_data of playlist_names_data){
                try {
                    playlist_names_map.set(playlist_name_data.compactPlaylistRenderer.title.runs[0].text, playlist_name_data.compactPlaylistRenderer.shareUrl)
                } catch (error) {}
            }
            return playlist_names_map;
        } catch (error) { return { "error": String(error) }; }
    }

    export async function insertIntoYouTubePlaylist(playlistName: string, tracks: Track[]){
        try {
            let baseData = await getYouTubeInitialData('https://youtube.com');
            try {
                let body = {
                    "context": baseData.INNERTUBE_CONTEXT,
                    "title": playlistName + " - Illusi Export",
                    "privacyStatus": "UNLISTED",
                    "videoIds": tracks.map(({video_id}) => video_id)
                };
                let SAPISID = Prefs.cookiesToJson(Prefs.prefs.external_services.youtube_cookies)['SAPISID'];
                let headers = {
                    'Access-Control-Allow-Origin' : '*',
                    'x-youtube-client-name': 1,
                    'x-youtube-client-version': '2.20230925.02.00',
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Mobile Safari/537.36',
                    'Cookies': Prefs.prefs.external_services.youtube_cookies,
                    "accept": "*/*",
                    "accept-language": "en-US,en;q=0.9",
                    "authorization": getYouTubeSapisidHashAuth(SAPISID),
                    "content-type": "application/json",
                    "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
                    "sec-ch-ua-arch": "\"x86\"",
                    "sec-ch-ua-bitness": "\"64\"",
                    "sec-ch-ua-full-version": "\"117.0.5938.149\"",
                    "sec-ch-ua-full-version-list": "\"Google Chrome\";v=\"117.0.5938.149\", \"Not;A=Brand\";v=\"8.0.0.0\", \"Chromium\";v=\"117.0.5938.149\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-model": "\"\"",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-ch-ua-platform-version": "\"15.0.0\"",
                    "sec-ch-ua-wow64": "?0",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "same-origin",
                    "sec-fetch-site": "same-origin",
                    "x-client-data": "CKS1yQEIh7bJAQiitskBCKmdygEI6NTKAQiQ+soBCJShywEI85jNAQiFoM0BCNy9zQEIkcrNAQi5ys0BCMXRzQEIzNbNAQji1s0BCKjYzQEIttjNAQj5wNQVGLrSzQEYyNjNARjrjaUX",
                    "x-goog-authuser": "0",
                    "x-goog-visitor-id": "CgtVbmR5bk9HMFZ1ayjaiYmpBjIICgJVUxICGgA%3D",
                    "x-origin": "https://www.youtube.com",
                    "x-youtube-bootstrap-logged-in": "true",
                    "Referer": "https://www.youtube.com/",
                    "Referrer-Policy": "strict-origin-when-cross-origin"
                }
        
                let ban = await axios({'method': 'POST', 'url': `https://www.youtube.com/youtubei/v1/playlist/create?key=${baseData.INNERTUBE_API_KEY}&prettyPrint=false`, 
                'headers': headers, 'data': body
                });
                // console.log(ban.data)
            } catch (error) {
                Alert.alert('Error', error)
            }
            Alert.alert("Finished Transfering Playlist")
        } catch (error) {
            // Alert.alert(error)
        }
    }

    function durationToInt(duration_string: string){
        const split_duration = duration_string.split(',');
        let duration = 0;
        
        for(let i = 0; i < split_duration.length; i++){
            if(split_duration[i].includes('hour') || split_duration[i].includes('hours'))
                duration += parseInt ( RegExp(/\d+/).exec(split_duration[i])?.[0] ?? "0" ) * 3600
            else if(split_duration[i].includes('minute') || split_duration[i].includes('minutes'))
                duration += parseInt ( RegExp(/\d+/).exec(split_duration[i])?.[0] ?? "0" ) * 60
            else if(split_duration[i].includes('second') || split_duration[i].includes('seconds'))
                duration += parseInt ( RegExp(/\d+/).exec(split_duration[i])?.[0] ?? "0" )
        }
        return duration;
    }
    export function parseYTDuration(text_duration: string){
        const text_duration_split = text_duration.split(':')
        let j = 0;
        let duration = 0;
        for(let i = text_duration_split.length-1; i >= 0; i--)
            duration += (parseInt(text_duration_split[i]) * Math.pow(60,j++));
        return duration;
    }

    async function SearchYouTube(search_query: string, proxy = null){
        try{
            if(search_query.trim() === ''){ return []; }
            const search_url = 'https://m.youtube.com/results?videoEmbeddable=true&search_query=' + encodeURI(search_query);
    
            const headers = {
                'Access-Control-Allow-Origin' : '*',
                'x-youtube-client-name': '1',
                'x-youtube-client-version': '2.20200911.04.00',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Mobile Safari/537.36'
            }
            const data_regex  = /var\ ytInitialData\ \=\ \'(.*)\'\;<\/script>/
            const api_regex  = /"innertubeApiKey":"(.*?)"/
            
            const body: string = proxy === null ? await (await fetch(search_url, { 'headers': headers })).text() : "";
            const raw = data_regex.exec(body)?.[1] ?? '{}';
            const apikey = api_regex.exec(body)?.[1] ?? '';
            
            const yt_initial_data = JSON.parse(decodeHex(raw).replace(/\n\s+/g, '').replace(/\n/g,''));
         
            let itemSectionRendererIndex = 0;
    
            for(const contentIndex in yt_initial_data.contents.sectionListRenderer.contents as object[]){
                if(yt_initial_data.contents.sectionListRenderer.contents[contentIndex]['itemSectionRenderer'] != undefined){
                    itemSectionRendererIndex = contentIndex as unknown as number
                }
            }
            let contents = yt_initial_data.contents.sectionListRenderer.contents[itemSectionRendererIndex].itemSectionRenderer.contents
            yt_initial_data.apikey = apikey;
            let apiKey = yt_initial_data.apiKey;
            // let searchData = [...JSON.stringify(ytInitialData).matchAll(/"videoId":"(.+?)",.+?TimeStatusRenderer":.+?\[{"text":"(.+?)"}.+?accessibilityData":{"label":"([^{}]+) by ([^{}]+) [0-9,]+ views?.+?ago/g)]
    //"videoId":"(.+?)",.+?accessibilityData":{"label":"([^{}]+) by ([^{}]+) [0-9,]+ views?.+?ago.+?lengthText.+?simpleText":"(.+?)"
            const videos: {
                'video_id': string,
                'video_name': string,
                'video_creator': string,
                'video_duration': number,
            }[] = [];
            
            for (const video of contents) {
                try {				
                    videos.push({
                        'video_id': video.videoWithContextRenderer.videoId,
                        'video_name': video.videoWithContextRenderer.headline.runs[0].text,
                        'video_creator': video.videoWithContextRenderer.shortBylineText.runs[0].text,
                        'video_duration': parseYTDuration(video.videoWithContextRenderer.lengthText.runs[0].text),
                    })
                } catch (error) {}
            }
            return videos;
        }
        catch(error) { return { "error": String(error) }; }
    }

    // export async function ContinueYouTubeSearch(continueData){
    //     try {
    //         let response = await axios.post(`https://www.youtube.com/youtubei/v1/search?key=${continueData.apiKey}`,{context : {
    //                 client: {
    //                 utcOffsetMinutes: 0,
    //                 gl: continueData.options.gl, // DefaultGLobalLocation = 'US'
    //                 hl: continueData.options.hl, // DefaultLanguage = 'en'
    //                 clientName: continueData.options.clientName, // DefaultClientName = 'WEB'
    //                 clientVersion: continueData.clientVersion, //Reference = '2.20221122.06.00'
    //                 },
    //                 user: {},
    //                 request: {},
    //             },
    //             continuation: continueData.token
    //         })
    //         let innerJSON = response.data.onResponseReceivedCommands[0].appendContinuationItemsAction.continuationItems;
    //         let newToken = innerJSON[1].continuationItemRenderer.continuationEndpoint.continuationCommand.token;
    
    //         let data = []
    //         for(const track of innerJSON[0].itemSectionRenderer.contents){
    //             data.push({
    //                 "video_duration": durationToInt(track.compactVideoRenderer.lengthText.runs[0].text.split(':')),
    //                 "video_name": track.compactVideoRenderer.title.runs[0].text,
    //                 "video_creator": track.compactVideoRenderer.longBylineText.runs[0].text,
    //                 "video_id": track.compactVideoRenderer.videoId,
    //             })
    //         };
    //         return {
    //             token: newToken,
    //             data: data
    //         };
    //     } catch (error) {
    //     }
    // }

    // export default async function getYouTubeMixTracks(video_id: string): Promise<Track[]> {
    //     const youtube_mix_url = `https://www.youtube.com/watch?v=${video_id}&start_radio=1&list=RD${video_id}`
    
    //     const response = (await axios({'url': youtube_mix_url, 'method': 'GET', 'headers': {
    //         'Access-Control-Allow-Origin' : '*',
    //         'x-youtube-client-name': 1,
    //         'x-youtube-client-version': '2.20200911.04.00',
    //         'User-Agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Mobile Safari/537.36',
    //     }})).data;
    //     const yt_initial_data = JSON.parse(((/ytInitialData ?= ?'(.+?})'/s).exec(decodeHex(response))[1]).replaceAll(/\n\s+/g,''))
    
    //     const tracks: Track[] = []
    //     for(const track of yt_initial_data.contents.singleColumnWatchNextResults.playlist.playlist.contents){
    //         try {
    //             const title = track.playlistPanelVideoRenderer.title.runs[0].text;
    //             const uid = GenerateNewUID(title);
    //             const t = new Track({
    //                 'video_id': track.playlistPanelVideoRenderer.videoId,
    //                 'video_name': title,
    //                 'video_creator': track.playlistPanelVideoRenderer.shortBylineText.runs[0].text,
    //                 'video_duration': parseYTDuration(track.playlistPanelVideoRenderer.lengthText.runs[0].text),
    //                 'youtube': true,
    //                 'uid': uid,
    //             })
    //             t['successful'] = false;
    //             t['added'] = false;
    //             tracks.push(t);
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     tracks.splice(0,1);
    //     return tracks;
    // }
}