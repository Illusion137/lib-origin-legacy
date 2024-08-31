import { CookieJar } from "../utils/cookie_util";
import { encodeParams, extractStringFromPattern } from "../utils/util";
import { MyPlaylists } from "./types/MyPlaylists";
import { Playlist } from "./types/Playlist";
import { SerializedServerData } from "./types/type";

export namespace AppleMusic {
    type Opts = { "cookie_jar"?: CookieJar };
    export async function extractSerializedServerData(html: string, opts: Opts) {
        const serialized_server_data_regex = /<script type=\"application\/json\" id=\"serialized-server-data\">(.+?)<\/script>/s;
        const extraction = extractStringFromPattern(html, serialized_server_data_regex);
        if (typeof extraction === "object") return extraction;
        const bearer_path = extractStringFromPattern(html, /<script type=\"module\" crossorigin src=\"(.+?)\"><\/script>/);
        if (typeof bearer_path === "object") return bearer_path;
        const bearer = await getBearer(bearer_path, opts);
        if(typeof bearer === "object") return bearer;
        return {"data": JSON.parse(extraction) as SerializedServerData, "authorization": bearer};
    }
    async function getResponse(url: string, opts: Opts) {
        const response = await fetch(url, {
            "headers": {
                "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "max-age=0",
                "priority": "u=0, i",
                "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Google Chrome\";v=\"127\", \"Chromium\";v=\"127\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "none",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
                "cookie": opts.cookie_jar?.toString() as string
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "credentials": "include",
            "body": null,
            "method": "GET"
        });
        return response;
    }
    export async function getSerializedServerData(url: string, opts: Opts) {
        const response = await getResponse(url, opts);
        if (!response.ok) return { "error": String(response.status) };
        return await extractSerializedServerData(await response.text(), opts);
    }
    function getAPIHeaders(bearer: string, opts: Opts) {
        const cookie_jar = opts.cookie_jar as CookieJar;
        const media_user_token_cookie = cookie_jar.getCookie("media-user-token");
        const media_user_token = media_user_token_cookie?.getData().value as string;
        return {
            'accept': '*/*',
            'accept-language': 'en-US,en;q=0.9',
            'authorization': 'Bearer ' + bearer,
            'cookie': cookie_jar.toString(),
            'media-user-token': media_user_token,
            'origin': 'https://music.apple.com',
            'priority': 'u=1, i',
            'referer': 'https://music.apple.com/',
            'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
        }
    }
    export async function getBearer(path: string, opts: Opts) {
        const response = await fetch(`https://music.apple.com${path}`, {
            "headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9",
                "priority": "u=1",
                "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Google Chrome\";v=\"127\", \"Chromium\";v=\"127\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "script",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "Referer": "https://music.apple.com/",
                "Referrer-Policy": "strict-origin",
                "cookie": opts.cookie_jar?.toString() as string,
            },
            "body": null,
            "method": "GET"
        });
        if (!response.ok) return { "error": String(response.status) };
        const js = await response.text();
        const bearer = extractStringFromPattern(js, /const dl ?= ?\"(.+?)\"/);
        return bearer;
    }
    async function apiCheckResponse(opts: Opts, bearer: string, path: string, params: object) {
        try {
            if (opts.cookie_jar === undefined) throw "CookieJar is empty";
            const url = `https://amp-api.music.apple.com/v1/${path}?${encodeParams(params)}`;
            const response = await fetch(url, { method: "GET", "body": null, "credentials": "include", "referrerPolicy": "strict-origin", headers: getAPIHeaders(bearer, opts) });
            return response;
        } catch (error) { return { "error": String(error) } }
    }
    export async function getPlaylist(playlist_url: string, opts: Opts) {
        const playlist_response = await getSerializedServerData(playlist_url, opts);
        if ("error" in playlist_response) return playlist_response;
        const playlist = playlist_response.data as Playlist;
        return {"data": playlist[0].data, "authorization": playlist_response.authorization};
    }
    export async function getPlaylistContinuation(opts: Opts){
        const data = await getSerializedServerData("https://music.apple.com/us/library/all-playlists/", opts);
        if("error" in data) return data;
        const params = {
            "art%5Blibrary-music-videos%3Aurl%5D": "c,f",
            "art%5Burl%5D": "f",
            "extend": "hasCollaboration,isCollaborativeHost",
            "extend%5Blibrary-playlists%5D": "tags",
            "fields%5Bmusic-videos%5D": "artistUrl,artwork,durationInMillis,url",
            "fields%5Bsongs%5D": "artistUrl,artwork,durationInMillis,url",
            "format%5Bresources%5D": "map",
            "include": "catalog,artists,tracks",
            "include%5Blibrary-playlists%5D": "catalog,tracks,playlists",
            "include%5Bplaylists%5D": "curator",
            "include%5Bsongs%5D": "artists",
            "l": "en-US",
            "omit%5Bresource%5D": "autos",
            "platform": "web",
        };
        const playlists_response = await apiCheckResponse(opts, data.authorization, "me/library/playlists/p.7Pkeq4PcVPLK7Ae", params);
        if ("error" in playlists_response) return playlists_response;
        return await playlists_response.json() as Playlist;
    }
    export async function getAllPlaylistsFromAccount(opts: Opts) {
        const data = await getSerializedServerData("https://music.apple.com/us/library/all-playlists/", opts);
        if("error" in data) return data;
        const params = {
            "art%5Burl%5D": "f",
            "extend": "hasCollaboration",
            "extend%5Blibrary-playlists%5D": "tags",
            "fields%5Bplaylists%5D": "curatorName",
            "format%5Bresources%5D": "map",
            "include": "catalog",
            "l": "en-US",
            "offset": 0,
            "omit%5Bresource%5D": "autos",
            "platform": "web"
        }
        const playlists_response = await apiCheckResponse(opts, data.authorization, "me/library/playlist-folders/p.playlistsroot/children", params);
        if ("error" in playlists_response) return playlists_response;
        return await playlists_response.json() as MyPlaylists;
    }
    export async function addTracksToPlaylist(opts: Opts) {

    }
    export async function removeTracksFromPlaylist(opts: Opts) {

    }
    export async function createPlaylist(opts: Opts) {

    }
    export async function deletePlaylist(opts: Opts) {

    }
}