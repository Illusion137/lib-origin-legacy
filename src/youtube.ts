import * as sha1 from 'sha1-uint8array'
import { CookieJar } from './utils/cookie_util';

export namespace YouTube {
    type YouTubeType = "DESKTOP" | "MOBILE";

    export function getPlaylistIdFromURL(url: string){
        const idRegex = /(https?:\/\/)?(www\.)?youtube\.com\/playlist\?list=/;
        return url.replace(idRegex, '');
    }
    export function getYouTubeSapisidHashAuth(SAPISID: string, ORIGIN = 'https://www.youtube.com'){
        let timeStampSecondsStr = String(new Date().getTime()).slice(0,10);
        let dataString = [timeStampSecondsStr, SAPISID, ORIGIN].join(' ');
        let data = Uint8Array.from(Array.from(dataString).map(letter => letter.charCodeAt(0)));
        let shaDigest = sha1.createHash().update(data).digest("hex");
        let SAPISIDHASH = `SAPISIDHASH ${timeStampSecondsStr}_${shaDigest}`;
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
            'Cookies': cookie_jar?.toString()
          };
    }
    
    async function getYoutubePlaylistContinuation(innertube_api_key: string, continuationKey: string, context: any, url: string, trackingParams: any){
        try {
            let videos: Track[] = [];
    
            let postURL = `https://www.youtube.com/youtubei/v1/browse?key=${innertube_api_key}&prettyPrint=false`
            let postData = {
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

    export async function getAllYoutubePlaylistsFromAccount(){
        try {
            let response = (await axios({'url': "https://www.youtube.com/feed/library", 'method': 'GET', 'headers': {
                'Cookies': Prefs.prefs.external_services.youtube_cookies
            }})).data
            response = decodeHex(response);

            const ytInitialDataRegex = /var ytInitialData = (.+?);.+?<\/script>/gs;
            let ytInitialDataStr = ytInitialDataRegex.exec(response)[1]
            ytInitialDataStr = ytInitialDataStr.replaceAll(/\n\s+/g,'')
            ytInitialDataStr = JSON.stringify(ytInitialDataStr)
            ytInitialDataStr = ytInitialDataStr.slice(2, ytInitialDataStr.length - 2)
            const ytInitialData = JSON.parse(decodeHex(ytInitialDataStr));
            
            let playlistNamesData = ytInitialData.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[2].shelfRenderer.content.verticalListRenderer.items
            // console.log(JSON.stringify(playlistNamesData))
            let playlistNames = new Map<string, string>();
            for(const playlistName of playlistNamesData){
                try {
                    playlistNames.set(playlistName.compactPlaylistRenderer.title.runs[0].text, playlistName.compactPlaylistRenderer.shareUrl)
                } catch (error) {
                    // console.log(error)
                }
            }
            if(playlistNames.size == 0 || playlistNames == undefined)
                return undefined;
            return playlistNames
    
        } catch (error) {
            Alert.alert("Account Playlist Finder Error:", error)
            return undefined;
        }
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

    async function SearchYouTube(searchTerms, limit = 0, proxy = null){ //returns first video
        if(searchTerms.trim === ''){
            return {data: []}
        }
        let body;
        try{
            let urlstring = 'https://m.youtube.com/results?videoEmbeddable=true&search_query=' + encodeURI(searchTerms)
    
            const videos = []
            
            const headers = {
                'Access-Control-Allow-Origin' : '*',
                'x-youtube-client-name': 1,
                'x-youtube-client-version': '2.20200911.04.00',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Mobile Safari/537.36'
            }
            const dataRegex  = /var\ ytInitialData\ \=\ \'(.*)\'\;<\/script>/
            const apiRegex  = /"innertubeApiKey":"(.*?)"/
            if(proxy == null){
                body = (await axios({'url':urlstring, 'headers': headers })).data
            }
            else{
                body = (await axios({'url':urlstring, 'headers':headers, 'proxy': {
                    protocol: 'http',
                    host: proxy.ip,
                    port: proxy.port,
                }})).data
            }
            const raw = dataRegex.exec(body)?.[1] ?? '{}'
            const apikey = apiRegex.exec(body)[1] ?? ''
            
            let ytInitialData = JSON.parse(decodeHex(raw).replaceAll(/\n\s+/g,'').replaceAll('\n',''))
         
            let itemSectionRendererIndex = 0;
    
            for(const contentIndex in ytInitialData.contents.sectionListRenderer.contents as object[]){
                if(ytInitialData.contents.sectionListRenderer.contents[contentIndex]['itemSectionRenderer'] != undefined){
                    itemSectionRendererIndex = contentIndex as unknown as number
                }
            }
            let contents = ytInitialData.contents.sectionListRenderer.contents[itemSectionRendererIndex].itemSectionRenderer.contents
            ytInitialData.apikey = apikey
            let apiKey = ytInitialData.apiKey
            // let searchData = [...JSON.stringify(ytInitialData).matchAll(/"videoId":"(.+?)",.+?TimeStatusRenderer":.+?\[{"text":"(.+?)"}.+?accessibilityData":{"label":"([^{}]+) by ([^{}]+) [0-9,]+ views?.+?ago/g)]
    //"videoId":"(.+?)",.+?accessibilityData":{"label":"([^{}]+) by ([^{}]+) [0-9,]+ views?.+?ago.+?lengthText.+?simpleText":"(.+?)"
            const pushData: Track[] = []
            
            for (const video of contents) {
                try {				
                    let uid = GenerateNewUID(video.videoWithContextRenderer.headline.runs[0].text)
                    pushData.push(new Track({
                    'video_id': video.videoWithContextRenderer.videoId,
                    'video_name': video.videoWithContextRenderer.headline.runs[0].text,
                    'video_creator': video.videoWithContextRenderer.shortBylineText.runs[0].text,
                    'video_duration': parseYTDuration(video.videoWithContextRenderer.lengthText.runs[0].text),
                    'youtube': true,
                    'uid': uid
                    }))
                    pushData[pushData.length - 1].artwork = getTrackArtworkRP(pushData[pushData.length - 1]);
                } catch (error) {
                }
            }
    
            return {data: pushData}
        }
        catch(error){
            console.log(error)
            return {data: []}
        }
    }

    export async function ContinueYouTubeSearch(continueData){
        try {
            let response = await axios.post(`https://www.youtube.com/youtubei/v1/search?key=${continueData.apiKey}`,{context : {
                    client: {
                    utcOffsetMinutes: 0,
                    gl: continueData.options.gl, // DefaultGLobalLocation = 'US'
                    hl: continueData.options.hl, // DefaultLanguage = 'en'
                    clientName: continueData.options.clientName, // DefaultClientName = 'WEB'
                    clientVersion: continueData.clientVersion, //Reference = '2.20221122.06.00'
                    },
                    user: {},
                    request: {},
                },
                continuation: continueData.token
            })
            let innerJSON = response.data.onResponseReceivedCommands[0].appendContinuationItemsAction.continuationItems;
            let newToken = innerJSON[1].continuationItemRenderer.continuationEndpoint.continuationCommand.token;
    
            let data = []
            for(const track of innerJSON[0].itemSectionRenderer.contents){
                data.push({
                    "video_duration": durationToInt(track.compactVideoRenderer.lengthText.runs[0].text.split(':')),
                    "video_name": track.compactVideoRenderer.title.runs[0].text,
                    "video_creator": track.compactVideoRenderer.longBylineText.runs[0].text,
                    "video_id": track.compactVideoRenderer.videoId,
                })
            };
            return {
                token: newToken,
                data: data
            };
        } catch (error) {
        }
    }

    export default async function getYouTubeMixTracks(video_id: string): Promise<Track[]> {
        const youtube_mix_url = `https://www.youtube.com/watch?v=${video_id}&start_radio=1&list=RD${video_id}`
    
        const response = (await axios({'url': youtube_mix_url, 'method': 'GET', 'headers': {
            'Access-Control-Allow-Origin' : '*',
            'x-youtube-client-name': 1,
            'x-youtube-client-version': '2.20200911.04.00',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Mobile Safari/537.36',
        }})).data;
        const yt_initial_data = JSON.parse(((/ytInitialData ?= ?'(.+?})'/s).exec(decodeHex(response))[1]).replaceAll(/\n\s+/g,''))
    
        const tracks: Track[] = []
        for(const track of yt_initial_data.contents.singleColumnWatchNextResults.playlist.playlist.contents){
            try {
                const title = track.playlistPanelVideoRenderer.title.runs[0].text;
                const uid = GenerateNewUID(title);
                const t = new Track({
                    'video_id': track.playlistPanelVideoRenderer.videoId,
                    'video_name': title,
                    'video_creator': track.playlistPanelVideoRenderer.shortBylineText.runs[0].text,
                    'video_duration': parseYTDuration(track.playlistPanelVideoRenderer.lengthText.runs[0].text),
                    'youtube': true,
                    'uid': uid,
                })
                t['successful'] = false;
                t['added'] = false;
                tracks.push(t);
            } catch (error) {
                console.log(error)
            }
        }
        tracks.splice(0,1);
        return tracks;
    }
}