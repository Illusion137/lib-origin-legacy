import axios from "axios";

export namespace Spotify {
    type ResponseError = { error: string };
    interface ClientSession {

    }
    interface ClientToken {

    }
    interface Client { 
        session: ClientSession, 
        client_token: ClientToken 
    }

    export async function getInitialData(url: string, cookies: (string | undefined) = undefined) : Promise< Client|ResponseError >{
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
                'Access-Control-Allow-Origin' : '*',
                "content-type": "application/json",
                "Referer": "https://open.spotify.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin",
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
                "Cookies": cookies as string,
            }
    
            const body = (await axios({'method': 'GET', 'url': url, 'headers': headers})).data
    
            const session_regex = /<script id="session" data-testid="session" type="application\/json">(.+?)<\/script>/is
            const session_exec = session_regex.exec(body);
            if(session_exec === null) throw "Couldn't get Client-Session"; 
            const session = session_exec[1];
    
            const session_json = JSON.parse(session);
            
            let client_token = await fetch("https://clienttoken.spotify.com/v1/clienttoken", {
                headers,
                "body": "{\"client_data\":{\"client_version\":\"1.2.21.625.gab84de47\",\"client_id\":\"" + session_json.clientId + "\",\"js_sdk_data\":{\"device_brand\":\"unknown\",\"device_model\":\"unknown\",\"os\":\"windows\",\"os_version\":\"NT 10.0\",\"device_id\":\"null\",\"device_type\":\"computer\"}}}",
                "method": "POST"
            });
            client_token = await client_token.json();
            return { 'session': session_json, 'client_token': client_token };
        } catch (error) {
            return { "error": String(error) } as ResponseError;
        }
    }

    export async function getPlaylist(url: string, cookies: (string | undefined) = undefined, limit: number = 100) {
        try {
            const playlist_id = url.replace(/https:\/\/open\.spotify\.com\/(album|playlist|collection)\//,'')
    
            const initialData = await getInitialData(url);
            
            let clientToken = initialData.client_token
            let sessionJson = initialData.session
            let playlistData;
            let tracks = [];
    
            if(url.includes("/album/")){
                playlistData = await fetch(`https://api-partner.spotify.com/pathfinder/v1/query?operationName=getAlbum&variables=%7B%22uri%22%3A%22spotify%3Aalbum%3A${playlistUID}%22%2C%22locale%22%3A%22%22%2C%22offset%22%3A0%2C%22limit%22%3A${limit}%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%2246ae954ef2d2fe7732b4b2b4022157b2e18b7ea84f70591ceb164e4de1b5d5d3%22%7D%7D`, {
                    "headers": {
                      "accept": "application/json",
                      "accept-language": "en",
                      "app-platform": "WebPlayer",
                      "authorization": "Bearer "+ sessionJson.accessToken,
                      "client-token": clientToken.granted_token.token,
                      "content-type": "application/json;charset=UTF-8",
                      "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
                      "sec-ch-ua-mobile": "?0",
                      "sec-ch-ua-platform": "\"Windows\"",
                      "sec-fetch-dest": "empty",
                      "sec-fetch-mode": "cors",
                      "sec-fetch-site": "same-site",
                      "spotify-app-version": "1.2.21.625.gab84de47",
                      "Referer": "https://open.spotify.com/",
                      "Referrer-Policy": "strict-origin-when-cross-origin",
                      "Cookies": Prefs.prefs.external_services.spotify_cookies
                    },
                    "body": null,
                    "method": "GET"
                });
                playlistData = await playlistData.json();
                let trackItems = playlistData.data.albumUnion.tracks.items;
        
                for(let i = 0; i < trackItems.length; i++){
                    tracks.push({
                        // 'video_id': trackItems[i].uid,
                        'video_name': trackItems[i].track.name,
                        'video_creator': trackItems[i].track.artists.items[0].profile.name,
                        // 'video_duration': Math.floor(trackItems[i].track.duration.totalMilliseconds / 1000),
                    })
                }
            } else if(url.includes("/playlist/")){
                playlistData = (await axios({"url": `https://api-partner.spotify.com/pathfinder/v1/query?operationName=fetchPlaylist&variables=%7B%22uri%22%3A%22spotify%3Aplaylist%3A${playlistUID}%22%2C%22offset%22%3A0%2C%22limit%22%3A${limit}%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%2273a3b3470804983e4d55d83cd6cc99715019228fd999d51429cc69473a18789d%22%7D%7D`, "headers": {
                    "accept": "application/json",
                    "accept-language": "en",
                    "app-platform": "WebPlayer",
                    "authorization": "Bearer "+ sessionJson.accessToken,
                    "client-token": clientToken.granted_token.token,
                    "content-type": "application/json;charset=UTF-8",
                    "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "spotify-app-version": "1.2.21.628.g8daa917a",
                    "Referer": "https://open.spotify.com/",
                    "Referrer-Policy": "strict-origin-when-cross-origin",
                    "Cookies": Prefs.prefs.external_services.spotify_cookies
                  }})).data;
                let trackItems = playlistData.data.playlistV2.content.items;
        
                for(let i = 0; i < trackItems.length; i++){
                    tracks.push({
                        'video_name': trackItems[i].itemV2.data.name,
                        'video_creator': trackItems[i].itemV2.data.artists.items[0].profile.name,
                    })
                }
            } else if(url.includes('/collection/')){
                playlistData = (await axios({"url": `https://api-partner.spotify.com/pathfinder/v1/query?operationName=fetchLibraryTracks&variables=%7B%22offset%22%3A0%2C%22limit%22%3A${limit}%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%228474ec383b530ce3e54611fca2d8e3da57ef5612877838b8dbf00bd9fc692dfb%22%7D%7D`, "headers": {
                    "accept": "application/json",
                    "accept-language": "en",
                    "app-platform": "WebPlayer",
                    "authorization": "Bearer "+ sessionJson.accessToken,
                    "client-token": clientToken.granted_token.token,
                    "content-type": "application/json;charset=UTF-8",
                    "sec-ch-ua": "\"Chromium\";v=\"116\", \"Not)A;Brand\";v=\"24\", \"Google Chrome\";v=\"116\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "spotify-app-version": "1.2.21.628.g8daa917a",
                    "Referer": "https://open.spotify.com/",
                    "Referrer-Policy": "strict-origin-when-cross-origin",
                    "Cookies": Prefs.prefs.external_services.spotify_cookies
                }})).data;
                let trackItems = playlistData.data.me.library.tracks.items;
                for(let i = 0; i < trackItems.length; i++){
                    tracks.push({
                        'video_name': trackItems[i].track.data.name,
                        'video_creator': trackItems[i].track.data.artists.items[0].profile.name,
                    })
                }
            }
            
            let proxies = await getProxyList();
            
            async function searchYT(title, artist, proxy = null){
                let search_query = `${artist} - ${title}`;
                let ytSearchResult = await SearchYouTube(search_query, 0, proxy)
                return ytSearchResult.data[0]
            }
            
            const ytTracks = [];
            for(let i = 0; i < tracks.length; i++){
                ytTracks.push(
                    searchYT(tracks[i].video_name, tracks[i].video_creator, proxies[getRandomIndex(proxies.length)])
                )
            }
            let results = await Promise.all(ytTracks)
            results = results.filter(item => item != undefined)
    
            return {
                'tracks': results,
                'title': playlistData.data?.albumUnion?.name ?? playlistData.data?.playlistV2?.name
            }
    
        } catch (error) {
            return { 'tracks': [], 'title': undefined }
        }
    
    }

    export async function getAllPlaylistsFromAccount(){
        try {
            let initialData = await getSpotifyInitialData("https://open.spotify.com/");
            let clientToken = initialData.clientToken
            let sessionJson = initialData.session
        
            const limit = Prefs.prefs.settings.spotify_library_limit
        
            let response = await fetch(`https://api-partner.spotify.com/pathfinder/v1/query?operationName=libraryV3&variables=%7B%22filters%22%3A%5B%22Playlists%22%5D%2C%22order%22%3Anull%2C%22textFilter%22%3A%22%22%2C%22features%22%3A%5B%22LIKED_SONGS%22%2C%22YOUR_EPISODES%22%5D%2C%22limit%22%3A${limit}%2C%22offset%22%3A0%2C%22flatten%22%3Afalse%2C%22expandedFolders%22%3A%5B%5D%2C%22folderUri%22%3Anull%2C%22includeFoldersWhenFlattening%22%3Atrue%2C%22withCuration%22%3Afalse%7D&extensions=%7B%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%2217d801ba80f3a3d7405966641818c334fe32158f97e9e8b38f1a92f764345df9%22%7D%7D`, {
            "headers": {
                "accept": "application/json",
                "accept-language": "en",
                "app-platform": "WebPlayer",
                "authorization": `Bearer ${sessionJson.accessToken}`,
                "client-token": clientToken.granted_token.token,
                "content-type": "application/json;charset=UTF-8",
                "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "spotify-app-version": "1.2.22.532.g9e6e8af9",
                "Referer": "https://open.spotify.com/",
                "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            "body": null,
            "method": "GET"
            });
            let responseJson = await response.json();
            let playlistItems = responseJson.data.me.libraryV3.items
            let mappedData = new Map();
            for(const playlist of playlistItems){
                try {                
                    let uri = playlist.item._uri
                    let splitUri = uri.split(':')
                    mappedData.set(playlist.item.data.name, `https://open.spotify.com/${splitUri[1]}/${splitUri[2]}`)
                } catch (error) {
                }
            }
            // mappedData.set()
            return mappedData;
        } catch (error) {
            console.log(error)
        }
    }

}