import * as sha1 from 'sha1-uint8array'
import { Cookie, CookieJar } from "../utils/cookie_util";
import { encodeParams, extractStringFromPattern, getMainKey, googleQuery, parseRuns } from "../utils/util";
import { YTCFG } from "./types/YTCFG";
import * as Parser from "./parser";
import { Continuation } from "./types/Continuation";
import { ContinuedResults_0 } from './types/ContinuedResults_0';
import { ResponseError } from '../utils/types';
import { InitialData } from './types/types';
import { Content4, MusicCarouselShelfRenderer } from './types/ArtistResults_0';
import { ArtistResults_1 } from './types/ArtistResults_1';

export namespace YouTube {
    type Opts = { cookie_jar?: CookieJar };
    type Privacy = "PUBLIC" | "UNLISTED" | "PRIVATE";
    interface ICFG {
        initial_data: InitialData,
        ytcfg: YTCFG
    };

    export function getSapisidHashAuth0(SAPISID: string, epoch: Date, ORIGIN = 'https://www.youtube.com') {
        const time_stamp_seconds_str = String(epoch.getTime()).slice(0, 10);
        const data_string = [time_stamp_seconds_str, SAPISID, ORIGIN].join(' ');
        const data = Uint8Array.from(Array.from(data_string).map(letter => letter.charCodeAt(0)));
        const sha_digest = sha1.createHash().update(data).digest("hex");
        const SAPISIDHASH = `SAPISIDHASH ${time_stamp_seconds_str}_${sha_digest}`
        return SAPISIDHASH;
    }
    export function getSapisidHashAuth1(SAPISID: string, epoch: Date, ORIGIN = 'https://www.youtube.com') {
        const time_stamp_seconds_str = String(epoch.getTime()).slice(0, 10);
        const data_string = [time_stamp_seconds_str, SAPISID, ORIGIN].join(' ');
        const data = Uint8Array.from(Array.from(data_string).map(letter => letter.charCodeAt(0)));
        const sha_digest = sha1.createHash().update(data).digest("hex");
        const SAPISIDHASH = `SAPISIDHASH ${time_stamp_seconds_str}_${sha_digest} SAPISID1PHASH ${time_stamp_seconds_str}_${sha_digest} SAPISID3PHASH ${time_stamp_seconds_str}_${sha_digest}`
        return SAPISIDHASH;
    }

    export function getAdSignalParams(epoch: Date) {
        return {
            "params": [
                { "key": "dt", "value": String(epoch.getTime()) }, // Epoch Time
                { "key": "flash", "value": "0" },
                { "key": "frm", "value": "0" },
                { "key": "u_tz", "value": "-420" },
                { "key": "u_his", "value": "11" },
                { "key": "u_h", "value": "1080" }, // Monitor Height
                { "key": "u_w", "value": "1920" }, // Monitor With
                { "key": "u_ah", "value": "1032" },
                { "key": "u_aw", "value": "1920" },
                { "key": "u_cd", "value": "24" },
                { "key": "bc", "value": "31" },
                { "key": "bih", "value": "911" },
                { "key": "biw", "value": "963" },
                { "key": "brdim", "value": "2560,0,2560,0,1920,0,1920,1032,980,911" },
                { "key": "vis", "value": "1" },    // Visibility%
                { "key": "wgl", "value": "true" }, // WEBGL
                { "key": "ca_type", "value": "image" }
            ]
        };
    }
    export function playlistURLToID(playlist_url: string){
        return playlist_url.replace("https://", "").replace("www.", "").replace("youtube.com/playlist?list=", "");
    }
    export function getPostHeaders(cookie_jar: CookieJar, epoch: Date){
        const SAPISID = cookie_jar.getCookie("SAPISID")?.getData().value;
        if (SAPISID === undefined) throw "SAPISID doesn't exist";
        console.log(SAPISID);
        return {
            "User-Agent": 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Mobile Safari/537.36',
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "authorization": getSapisidHashAuth0(SAPISID, epoch),
            "content-type": "application/json",
            "priority": "u=1, i",
            "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
            "sec-ch-ua-arch": "\"x86\"",
            "sec-ch-ua-bitness": "\"64\"",
            "sec-ch-ua-form-factors": "\"Desktop\"",
            "sec-ch-ua-full-version": "\"126.0.6478.127\"",
            "sec-ch-ua-full-version-list": "\"Not/A)Brand\";v=\"8.0.0.0\", \"Chromium\";v=\"126.0.6478.127\", \"Google Chrome\";v=\"126.0.6478.127\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-model": "\"\"",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-ch-ua-platform-version": "\"15.0.0\"",
            "sec-ch-ua-wow64": "?0",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "same-origin",
            "sec-fetch-site": "same-origin",
            "x-client-data": "CIa2yQEIpLbJAQipncoBCPvuygEIlqHLAQj0mM0BCIWgzQEIqp7OAQj/oM4BCKeizgEI46XOAQjep84BCJqozgEIg6zOARihnc4BGPGnzgEY642lFw==",
            "x-goog-authuser": "0",
            "x-goog-visitor-id": "CgtVVWsxR3NiMXh1USjZp_G0BjIKCgJVUxIEGgAgWw%3D%3D",
            "x-origin": "https://www.youtube.com",
            "x-youtube-bootstrap-logged-in": "true",
            "x-youtube-client-name": "67",
            "x-youtube-client-version": "1.20240717.01.00",
            "cookie": cookie_jar?.toString() as string,
            "Referer": "https://www.youtube.com",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        }
    }
    function getPayloadContext(ytcfg: YTCFG, epoch: Date){
        return { 
            adSignalsInfo: getAdSignalParams(epoch),
            request: ytcfg.INNERTUBE_CONTEXT.request,
            client: ytcfg.INNERTUBE_CONTEXT.client,
            user: ytcfg.INNERTUBE_CONTEXT.user
        };
    }
    function extractInitialData(html: string) {
        const initial_data_regex0 = /var ytInitialData ?= ?('.+?');/gs;
        const initial_data_regex1 = /var ytInitialData ?= ?({.+?});/gs;
        let extracted = extractStringFromPattern(html, initial_data_regex0);
        if(typeof extracted === "object") {
            extracted = extractStringFromPattern(html, initial_data_regex1);
            let evaluated;
            const initial_data: InitialData = eval("evaluated = " + extracted);
            return initial_data;
        }
        let evaluated;
        const initial_data: string = eval("evaluated = " + extracted);
        return JSON.parse(initial_data) as InitialData;
    }
    function extractYTCFG(html: string): YTCFG {
        const ytcfg_data_regex = /ytcfg.set\((\{.+?\})\);/gs;
        const extracted = extractStringFromPattern(html, ytcfg_data_regex);
        let evaluated;
        const ytcfg: YTCFG = eval("evaluated = " + extracted);
        return ytcfg;
    }
    async function getInitialDataConfig(opts: Opts, url: string): Promise<ICFG | ResponseError> {
        try {
            const page_response = await fetch(url, {
                "headers": {
                    "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                    "accept-language": "en-US,en;q=0.9",
                    "cache-control": "max-age=0",
                    "priority": "u=0, i",
                    "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Google Chrome\";v=\"127\", \"Chromium\";v=\"127\"",
                    "sec-ch-ua-arch": "\"x86\"",
                    "sec-ch-ua-bitness": "\"64\"",
                    "sec-ch-ua-form-factors": "\"Desktop\"",
                    "sec-ch-ua-full-version": "\"127.0.6533.120\"",
                    "sec-ch-ua-full-version-list": "\"Not)A;Brand\";v=\"99.0.0.0\", \"Google Chrome\";v=\"127.0.6533.120\", \"Chromium\";v=\"127.0.6533.120\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-model": "\"\"",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-ch-ua-platform-version": "\"15.0.0\"",
                    "sec-ch-ua-wow64": "?0",
                    "sec-fetch-dest": "document",
                    "sec-fetch-mode": "navigate",
                    "sec-fetch-site": "none",
                    "sec-fetch-user": "?1",
                    "service-worker-navigation-preload": "true",
                    "upgrade-insecure-requests": "1",
                    "x-client-data": "CIa2yQEIpLbJAQipncoBCPvuygEIlqHLAQj0mM0BCIWgzQEIqp7OAQjkr84BCOW1zgEIwrbOAQjZt84BCJ66zgEInrvOARi9rs4BGJyxzgE=",
                    "cookie": opts.cookie_jar?.toString() as string,
                },
                "credentials": "include",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": null,
                "method": "GET"
            });
            const page_html = await page_response.text();
            return {
                initial_data: extractInitialData(page_html),
                ytcfg: extractYTCFG(page_html)
            };
        } catch (error) { return { "error": String(error) }; }
    }
    async function parseInitial(opts: Opts, init_url: string, parser: (contents: any) => any): Promise<any | ResponseError> {
        try {
            const icfg = await getInitialDataConfig(opts, init_url);
            if ("error" in icfg) throw icfg.error;
            return {
                "icfg": icfg,
                "data": parser(icfg.initial_data)
            };
        } catch (error) { return { "error": String(error) }; }
    }
    type ICFGData<T> = { icfg: ICFG, data: T };
    type Endpoint = { "query": string, "params": string };
    export async function getHome(opts: Opts)   : Promise<ICFGData<ReturnType<typeof Parser.parseHomeContents>>>                           { return await parseInitial(opts, "https://www.youtube.com/", Parser.parseHomeContents); }
    export async function getExplore(opts: Opts): Promise<ICFGData<ReturnType<typeof Parser.parseExploreContents>>>                        { return await parseInitial(opts, "https://www.youtube.com/explore", Parser.parseExploreContents); }
    export async function getPlaylist(opts: Opts, playlist_id: string): Promise<ICFGData<ReturnType<typeof Parser.parsePlaylistContents>>> { return await parseInitial(opts, `https://www.youtube.com/playlist?list=${playlist_id}`, Parser.parsePlaylistContents); }
    export async function getArtist(opts: Opts, artist_id: string): Promise<ICFGData<ReturnType<typeof Parser.parseArtistContents>>>       { return await parseInitial(opts, `https://www.youtube.com/channel/${artist_id}`, Parser.parseArtistContents); }
    export async function search(opts: Opts, search_query: string): Promise<ICFGData<ReturnType<typeof Parser.parseSearchContents>>>       { return await parseInitial(opts, `https://www.youtube.com/results?search_query=${googleQuery(search_query)}`, Parser.parseSearchContents); }
    export async function getYouTubeMix(opts: Opts, video_id: string): Promise<ICFGData<ReturnType<typeof Parser.parseMixContents>>>       { return await parseInitial(opts, `https://www.youtube.com/watch?v=${video_id}&start_radio=1&list=RD${video_id}`, Parser.parseMixContents); }
    export async function getLibrary(opts: Opts): Promise<ICFGData<ReturnType<typeof Parser.parseLibraryContents>>|ResponseError>          { return await parseInitial(opts, "https://www.youtube.com/feed/playlists", Parser.parseLibraryContents); }
    export async function getContinuation(opts: Opts, ytcfg: YTCFG, next_con: Continuation) {
        try {
            const query_params = {
                ctoken: next_con.continuationEndpoint.continuationCommand.token,
                continutation: next_con.continuationEndpoint.continuationCommand.token,
                type: "next",
                itct: next_con.continuationEndpoint.clickTrackingParams,
                prettyPrint: false
            };
            const payload = {};
            const response = await postCheckResponse(opts, ytcfg, `browse?${encodeParams(query_params)}`, payload);
            if("error" in response) throw response.error;
            return (await response.json()) as ContinuedResults_0;
        } catch (error) { return { "error": String(error) } }
    }
    async function postCheckResponse(opts: Opts, ytcfg: YTCFG, path: string, payload: object){
        try {
            if (opts.cookie_jar === undefined) throw "CookieJar is empty";
            const epoch = new Date();
            const merged_payload = {...payload, ...{context: getPayloadContext(ytcfg, epoch)}}
            const url = `https://www.youtube.com/youtubei/v1/${path}`;
            const response = await fetch(url, { method: "POST", credentials: "include", headers: getPostHeaders(opts.cookie_jar, epoch), body: JSON.stringify(merged_payload) });
            return response;
        } catch (error) { return { "error": String(error) } }
    }
    async function postCheckSucceed(opts: Opts, ytcfg: YTCFG, path: string, payload: object){
        const response = await postCheckResponse(opts, ytcfg, path, payload);
        if("error" in response) return false;
        return response.ok;
    } 
    export async function postLike(opts: Opts, ytcfg: YTCFG, video_id: string, like_path: string){
        const payload = {
            target: { videoId: video_id },
        }
        return await postCheckSucceed(opts, ytcfg, `${like_path}?prettyPrint=false`, payload);
    }
    export async function postEditPlaylist(opts: Opts, ytcfg: YTCFG, playlist_id: string, actions: object[]){
        const payload = {
            actions: actions,
            playlistId: playlist_id
        }
        return await postCheckSucceed(opts, ytcfg, "browse/edit_playlist?prettyPrint=false", payload);
    }
    export async function likeTrack(opts: Opts, ytcfg: YTCFG, video_id: string)    { return await postLike(opts, ytcfg, video_id, "like/like");       }
    export async function dislikeTrack(opts: Opts, ytcfg: YTCFG, video_id: string) { return await postLike(opts, ytcfg, video_id, "like/dislike");    }
    export async function unlikeTrack(opts: Opts, ytcfg: YTCFG, video_id: string)  { return await postLike(opts, ytcfg, video_id, "like/removelike"); }
    export async function createPlaylist(opts: Opts, ytcfg: YTCFG, title: string, privacy: Privacy){
        const payload = {
            title: title,
            privacyStatus: privacy
        }
        return await postCheckSucceed(opts, ytcfg, "playlist/create?prettyPrint=false", payload);
    }
    export async function deletePlaylist(opts: Opts, ytcfg: YTCFG, playlist_id: string){
        const payload = {
            playlistId: playlist_id
        }
        return await postCheckSucceed(opts, ytcfg, "playlist/delete?prettyPrint=false", payload);
    }
    export async function addTracksToPlaylist(opts: Opts, ytcfg: YTCFG, playlist_id: string, video_ids: string[]){
        const actions = video_ids.map((video_id) => { return { "addedVideoId": video_id, "action": "ACTION_ADD_VIDEO", "dedupeOption": "DEDUPE_OPTION_CHECK" } });
        return await postEditPlaylist(opts, ytcfg, playlist_id, actions);
    }
    export async function removeTracksToPlaylist(opts: Opts, ytcfg: YTCFG, playlist_id: string, video_ids: string[]){
        const actions = video_ids.map((video_id) => { return { "removedVideoId": video_id, "action": "ACTION_REMOVE_VIDEO" } });
        return await postEditPlaylist(opts, ytcfg, playlist_id, actions);
    }
    export async function editPlaylistData(opts: Opts, ytcfg: YTCFG, playlist_id: string, playlist_data: {
        name: string,
        description: string,
        privacy: Privacy
    }){
        const actions = [ 
            { "action": "ACTION_SET_PLAYLIST_PRIVACY",     "playlistPrivacy": playlist_data.privacy }, 
            { "action": "ACTION_SET_PLAYLIST_NAME",        "playlistName": playlist_data.name }, 
            { "action": "ACTION_SET_PLAYLIST_DESCRIPTION", "playlistDescription": playlist_data.description}
        ];
        return await postEditPlaylist(opts, ytcfg, playlist_id, actions);
    }
}