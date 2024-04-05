export namespace YouTubeMusic {
    async function getYoutubeMusicPlaylistContinuation(ogURL: string, client: any ,innertube_api_key: string, continuation: string, itct: string){
        try {
            let videos = [];
            let postURL = `https://music.youtube.com/youtubei/v1/browse?ctoken=${continuation}&continuation=${continuation}&type=next&itct=${itct}&key=${innertube_api_key}&prettyPrint=false`
    
            client['adSignalsInfo'] = {
                "params": [
                    {
                        "key": "dt",
                        "value": "1696647857201"
                    },
                    {
                        "key": "flash",
                        "value": "0"
                    },
                    {
                        "key": "frm",
                        "value": "0"
                    },
                    {
                        "key": "u_tz",
                        "value": "-420"
                    },
                    {
                        "key": "u_his",
                        "value": "3"
                    },
                    {
                        "key": "u_h",
                        "value": "1440"
                    },
                    {
                        "key": "u_w",
                        "value": "2560"
                    },
                    {
                        "key": "u_ah",
                        "value": "1392"
                    },
                    {
                        "key": "u_aw",
                        "value": "2560"
                    },
                    {
                        "key": "u_cd",
                        "value": "24"
                    },
                    {
                        "key": "bc",
                        "value": "31"
                    },
                    {
                        "key": "bih",
                        "value": "1283"
                    },
                    {
                        "key": "biw",
                        "value": "1624"
                    },
                    {
                        "key": "brdim",
                        "value": "0,0,0,0,2560,0,2560,1392,1636,1283"
                    },
                    {
                        "key": "vis",
                        "value": "1"
                    },
                    {
                        "key": "wgl",
                        "value": "true"
                    },
                    {
                        "key": "ca_type",
                        "value": "image"
                    }
                ]
            }
    
            client['request'] = {
                "useSsl": true,
                "internalExperimentFlags": [],
                "consistencyTokenJars": []
            }
    
            let postData = {"context": client}
    
            let SAPISID = Prefs.cookiesToJson(Prefs.prefs.external_services.youtube_music_cookies)['SAPISID']
    
            let SAPISIDHASH = getYouTubeSapisidHashAuth(SAPISID, "https://music.youtube.com")
    
            let contents = (await axios({'method': 'POST', 'url': postURL, 'headers': {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Mobile Safari/537.36',
                "Cookies": Prefs.prefs.external_services.youtube_music_cookies,
                "authorization": SAPISIDHASH,
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
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
                "x-goog-visitor-id": "CgtVbmR5bk9HMFZ1ayiwlYOpBjIICgJVUxICGgA%3D",
                "x-origin": "https://music.youtube.com",
                "x-youtube-bootstrap-logged-in": "true",
                "x-youtube-client-name": "67",
                "x-youtube-client-version": "1.20230927.00.01",
                "Referer": "https://music.youtube.com/playlist?list=PLnIB0XeUqT-hlVYRC3mf1Yc1tSuOwmEf2",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            }, 'data': postData})).data
            let continuationTokenGood = false;
            let continutationToken = undefined;
            let continuationItems = undefined;
            try {
                continuationItems = contents.continuationContents.musicPlaylistShelfContinuation.contents;
                continutationToken = contents.continuationContents.musicPlaylistShelfContinuation.continuations[0].nextContinuationData.continuation;
                continuationTokenGood = true;
            } catch (error) {
            }
    
            for (const track of continuationItems){
                try {
                    let video_duration;
                    try {
                        video_duration = track.musicResponsiveListItemRenderer.fixedColumns[0].musicResponsiveListItemFixedColumnRenderer.text.runs[0].text
                    } catch (error) {
                        video_duration = track.musicResponsiveListItemRenderer.flexColumns[3].musicResponsiveListItemFlexColumnRenderer.text.runs[0].text
                    }
                    videos.push({
                        'video_id':       track.musicResponsiveListItemRenderer.playlistItemData.videoId,
                        'video_name':     track.musicResponsiveListItemRenderer.flexColumns[0].musicResponsiveListItemFlexColumnRenderer.text.runs[0].text,
                        'video_creator':  track.musicResponsiveListItemRenderer.flexColumns[1].musicResponsiveListItemFlexColumnRenderer.text.runs[0].text,
                        'video_duration': parseYTMusicDuration(video_duration),
                    })
                } catch (error) {
                }
            }
    
            if(continuationTokenGood){
                videos = videos.concat(await getYoutubeMusicPlaylistContinuation(ogURL, client, innertube_api_key, continutationToken, ""));
            }
            return videos
    
        } catch (error) {
            // console.log(error)
        }
    }
    
    //REQUIRES COOKIES
    export async function getYoutubeMusicPlaylist(url: string): Promise<MusicServiceImport>{
        if(!Prefs.hasYouTubeMusicCookies())
            return  {'tracks': [], 'title': 'cnull'};
        try 
        {
            let continue_ = true
            let response = (await axios({"method": 'GET', 'url': url,
                'headers': { 
                    'authority': 'music.youtube.com', 
                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7', 
                    'accept-language': 'en-US,en;q=0.9', 
                    'cache-control': 'max-age=0', 
                    'Cookies': Prefs.prefs.external_services.youtube_music_cookies,  
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
                  },
            })).data;
            const initialDataRegex = /initialData\.push.+?initialData\.push.+?data: '(.+?)'.+?ytcfg.set/gs;
            const innertubeApiKeyRegex = /\"INNERTUBE_API_KEY\": ?\"(.+?)\"/;
            const innertubeContextRegex = /\"INNERTUBE_CONTEXT\": ?({.+?}}).+?INNERTUBE_CONTEXT_CLIENT_NAME/s;
            const continuationAndTrackingRegex = /nextContinuationData\\x22:\\x7b\\x22continuation\\x22:\\x22(.+?)\\x22,\\x22clickTrackingParams\\x22:\\x22(.+?)\\x22/s;
    
            let decodedResponse = decodeHex(response)
            
            //[1].replaceAll(/\n\s+/g,'')
            const INNERTUBE_API_KEY = innertubeApiKeyRegex.exec(decodedResponse)[1];
            const INNERTUBE_CONTEXT = JSON.parse(innertubeContextRegex.exec(decodedResponse)[1].replaceAll(/\n\s+/g,''));
            
            let continuationAndTracking;
            let CONTINUATION;
            let TRACKING;
            try {
                continuationAndTracking = continuationAndTrackingRegex.exec(response)
        
                CONTINUATION = continuationAndTracking[1];
                TRACKING = continuationAndTracking[2];
            } catch (error) {
                continue_ = false
            }
    
            let initialData = decodeHex(initialDataRegex.exec(response)[1]);
            
            initialData = JSON.parse(initialData)
            let initialDataTracks = initialData.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].musicPlaylistShelfRenderer.contents
            
            let playlistTitle = "YT Music Playlist"; 
            try {
                playlistTitle = initialData.header.musicEditablePlaylistDetailHeaderRenderer.header.musicDetailHeaderRenderer.title.runs[0].text
            } catch (error) {
                playlistTitle = initialData.header.musicDetailHeaderRenderer.title.runs[0].text
            }
            let tracks = [];
            
            for(const track of initialDataTracks){
                try {
                    let durationStr = "";
                    try {
                        durationStr = track.musicResponsiveListItemRenderer.flexColumns[3].musicResponsiveListItemFlexColumnRenderer.text.runs[0].text
                    } catch (error) {
                        durationStr = track.musicResponsiveListItemRenderer.fixedColumns[0].musicResponsiveListItemFixedColumnRenderer.text.runs[0].text;
                    }
    
                    tracks.push({
                        'video_id': track.musicResponsiveListItemRenderer.playlistItemData.videoId,
                        'video_name': track.musicResponsiveListItemRenderer.flexColumns[0].musicResponsiveListItemFlexColumnRenderer.text.runs[0].text,
                        'video_creator': track.musicResponsiveListItemRenderer.flexColumns[1].musicResponsiveListItemFlexColumnRenderer.text.runs[0].text,
                        'video_duration': parseYTMusicDuration(durationStr),
                    })
                } catch (error) {
                }
            }
            if(continue_) 
                tracks = tracks.concat(await getYoutubeMusicPlaylistContinuation(url,INNERTUBE_CONTEXT, INNERTUBE_API_KEY, CONTINUATION, TRACKING));
            
            tracks = tracks.filter(item => item != undefined)
            for(let i = 0; i < tracks.length; i++){
                tracks[i]['saved'] = false;
                if(await SQLActions.checkIfVideoIdExists(tracks[i].video_id))
                    tracks[i]['saved'] = true;
            }
            return {'tracks': tracks, 'title': playlistTitle}
        } catch (error) {
            return  {'tracks': [], 'title': 'null'};
        }
    
    }

    export async function getAllYTMusicPlaylistsFromAccount(){
        try {        
            let dataMap = await getAllYoutubePlaylistsFromAccount();
            let newMap = new Map<string, string>();
            const keys = [...dataMap.keys()];
            for(const key of keys){
                let value = `https://music.youtube.com/playlist?list=${getYTPlaylistIdFromURL(dataMap.get(key))}`;
                if(value.slice(value.length-2, value.length) == 'LL') {
                    value = 'https://music.youtube.com/playlist?list=LM';
                }
                newMap.set(key, value)
            }
            return newMap;
        } catch (error) {
            console.log(error)
        }
    }
    
}