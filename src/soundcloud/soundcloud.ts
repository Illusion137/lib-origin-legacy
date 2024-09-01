import { CookieJar } from "../utils/cookie_util";
import { encodeParams } from "../utils/util";
import { ArtistUser, Playlist, Search, SearchOf, Track, User } from "./types/Search";
import { HydratablePlaylist, HydratableUser, Hydration } from "./types/Hydration";
import { UserTracks } from "./types/UserTracks";
import { ResponseError } from "../utils/types";

export namespace SoundCloud {
    type Opts = { cookie_jar?: CookieJar, client_id?: (string|ResponseError) }

    function pageMethodOptions(): RequestInit {
        return {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-language": "en-US,en;q=0.9",
                "cache-control": "max-age=0",
                "priority": "u=0, i",
                "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Google Chrome\";v=\"127\", \"Chromium\";v=\"127\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "upgrade-insecure-requests": "1",
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET"
        }
    }
    function apiMethodOptions(cookie_jar?: CookieJar): RequestInit {
        return {
            "headers": {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "accept-language": "en-US,en;q=0.9",
                "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Google Chrome\";v=\"127\", \"Chromium\";v=\"127\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\"",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "x-datadome-clientid": "j_Vtc5X7JmFPUCDDx5lSldScBT3_0zcdp8H6PoWRW6XaorT0533jAUxoqgz1_XOQ5hj12vnN1swQTWJq2zlKP~6~ApE~TyFbFsP~OziT1fE5ejQJdwlzGU4E2IrM9VdM",
                "Referer": "https://soundcloud.com/",
                "Referrer-Policy": "origin",
                "cookie": cookie_jar?.toString() as string
            },
            "body": null,
            "method": "GET"
        }
    }
    export async function getClientID(cookie_jar?: CookieJar) {
        try {
            const response = await fetch("https://a-v2.sndcdn.com/assets/0-948a9c9d.js", apiMethodOptions(cookie_jar));
            if (!response.ok) throw "Not OK Client-ID";

            const text = await response.text();
            const client_id_regex = /client_id: ?"(.+?)"/si;

            const exec = client_id_regex.exec(text);
            if (exec === null || exec.length <= 1) throw "Can't extract client_id";
            const client_id = exec[1];
            return client_id;
        } catch (error) { return { "error": String(error) }; }
    }
    export async function extractFromPage(url: string, pattern: RegExp) {
        try {
            const response = await fetch(url, pageMethodOptions());
            if (!response.ok) throw "Response not ok: extractFromPage";
            const text = await response.text();
            const exec = pattern.exec(text);
            if (exec === null || exec[1] === undefined) throw "Couldn't extract pattern: extractFromPage";
            return exec[1];
        } catch (error) { return { "error": String(error) }; }
    }
    export async function getHydration(url: string){
        const hydration_text = await extractFromPage(url, /__sc_hydration ?= ?(.+?);<\/script>/si);
        if (typeof hydration_text !== "string") return hydration_text;
        const hydration: Hydration = JSON.parse(hydration_text);
        return hydration;
    }
    type SCResult = {
        "collection": any[],
        "next_href": string,
        "query_urn": string|null
    }
    export function combineContinuation(current: SCResult, next: SCResult){
        return {
            "collection": current.collection.concat(next.collection),
            "next_href": next.next_href,
            "query_urn": null
        }
    }
    export async function continuation(next_href: string, locale_params: {"client_id": string}, opts: Opts, depth = -1): Promise<SCResult>{
        try {
            if(next_href === null || next_href === undefined || next_href === "" || depth === 0) throw null;
            const next_response = await fetch(`${next_href}&${encodeParams(locale_params)}`, apiMethodOptions());
            if(!next_response.ok) throw next_response.status;
            const next_data: SCResult = await next_response.json();
            if(depth === 1) return next_data;
            const combined_data = combineContinuation(next_data, await continuation(next_data.next_href, locale_params, opts, depth - 1));
            return combined_data;
        } catch (error) { 
            return {
                "collection": [],
                "next_href": "",
                "query_urn": null
            }
        }
    }
    type SearchType = "EVERYTHING" | "TRACKS" | "PEOPLE" | "ALBUMS" | "PLAYLISTS"; 
    function searchTypeToApiMethod(search_type: SearchType): string{
        switch(search_type){ 
            case "EVERYTHING": return "search?";
            case "TRACKS": return "search/tracks?";
            case "PEOPLE": return "search/users?";
            case "ALBUMS": return "search/albums?";
            case "PLAYLISTS": return "search/playlists_without_albums?";
        }
    }
    type PromiseError<T>  = Promise<T|ResponseError>;
    export async function search(search_type: "TRACKS", opts: Opts & { "query": string, "depth"?: number, "limit"?: number, "offset"?: number }): PromiseError<SearchOf<Track>>
    export async function search(search_type: "PEOPLE", opts: Opts & { "query": string, "depth"?: number, "limit"?: number, "offset"?: number }): PromiseError<SearchOf<User>>
    export async function search(search_type: "ALBUMS", opts: Opts & { "query": string, "depth"?: number, "limit"?: number, "offset"?: number }): PromiseError<SearchOf<Playlist>>
    export async function search(search_type: "PLAYLISTS", opts: Opts & { "query": string, "depth"?: number, "limit"?: number, "offset"?: number }): PromiseError<SearchOf<Playlist>>
    export async function search(search_type: "EVERYTHING", opts: Opts & { "query": string, "depth"?: number, "limit"?: number, "offset"?: number }): PromiseError<SearchOf<Playlist|Track|User>>
    export async function search(search_type: SearchType, opts: Opts & { "query": string, "depth"?: number, "limit"?: number, "offset"?: number }): PromiseError<SearchOf<Playlist|Track|User>> {
        try {
            opts.client_id = opts.client_id === undefined ? await getClientID() : opts.client_id;
            if (typeof opts.client_id === "object") throw opts.client_id.error;
            const locale_params = {
                client_id: opts.client_id,
                linked_partitioning: 1,
                app_version: 1724146018,
                app_locale: "en"
            }
            const opts_params = {
                q: encodeURIComponent(opts.query),
                variant_ids: "",
                facet: "model",
                user_id: "",
                limit: opts.limit ?? 20,
                offset: opts.offset ?? 0,
            }
            const params = Object.assign(locale_params, opts_params);
            const search_response = await fetch(`https://api-v2.soundcloud.com/${searchTypeToApiMethod(search_type ?? "EVERYTHING")}${encodeParams(params)}`, apiMethodOptions());
            if(!search_response.ok) throw `${search_response.status} : ${search_response.statusText}`;
            const search_data: Search = await search_response.json() as Search;
            const result: Search = combineContinuation(search_data, await continuation(search_data.next_href, locale_params, opts, opts.depth ?? 0) ) as unknown as Search;
            return result;
        } catch (error) { return { "error": String(error) }; }
    }
    type ArtistMode = "ALL" | "POPULAR_TRACKS" | "TRACKS" | "ALBUMS" | "PLAYLISTS" | "REPOSTS";
    function artistModeToApiMethod(artist_mode: ArtistMode): string{
        switch(artist_mode){ 
            case "ALL": return "spotlight";
            case "POPULAR_TRACKS": return "toptracks";
            case "TRACKS": return "tracks";
            case "ALBUMS": return "albums";
            case "PLAYLISTS": return "playlists_without_albums";
            case "REPOSTS": return "reposts";
        }
    }
    export async function getArtist(mode: "POPULAR_TRACKS", opts: Opts & { "artist_id": string, "depth"?: number, "limit"?: number, "offset"?: number }): PromiseError<ArtistUser<Track>>
    export async function getArtist(mode: "TRACKS", opts: Opts & { "artist_id": string, "depth"?: number, "limit"?: number, "offset"?: number })        : PromiseError<ArtistUser<Track>>
    export async function getArtist(mode: "REPOSTS", opts: Opts & { "artist_id": string, "depth"?: number, "limit"?: number, "offset"?: number })       : PromiseError<ArtistUser<Track>>
    export async function getArtist(mode: "ALBUMS", opts: Opts & { "artist_id": string, "depth"?: number, "limit"?: number, "offset"?: number })        : PromiseError<ArtistUser<Playlist>>
    export async function getArtist(mode: "PLAYLISTS", opts: Opts & { "artist_id": string, "depth"?: number, "limit"?: number, "offset"?: number })     : PromiseError<ArtistUser<Playlist>>
    export async function getArtist(mode: ArtistMode = "ALL", opts: Opts & { "artist_id": string, "depth"?: number, "limit"?: number, "offset"?: number }) : PromiseError<ArtistUser<Playlist|User|Track>> {
        try {
            opts.client_id = opts.client_id === undefined ? await getClientID() : opts.client_id; 
            if (typeof opts.client_id === "object") throw opts.client_id.error;
            const hydration = await getHydration(`https://soundcloud.com/${opts.artist_id}`);
            if("error" in hydration) throw hydration.error;
            const user_hyrdration: HydratableUser = hydration.find((hydratable) => hydratable.hydratable == "user") as HydratableUser;
            const locale_params = {
                client_id: opts.client_id,
                linked_partitioning: 1,
                app_version: 1724146018,
                app_locale: "en"
            }
            const opts_params = {
                representation: "",
                limit: opts.limit ?? 20,
                offset: opts.offset ?? 0,
            }
            const params = Object.assign(locale_params, opts_params);
            const repost_mode_str = mode === "REPOSTS" ? "stream/" : "";
            const artist_response = await fetch(`https://api-v2.soundcloud.com/${repost_mode_str}users/${user_hyrdration.data.id}/${artistModeToApiMethod(mode ?? "ALL")}?${encodeParams(params)}`, apiMethodOptions() );
            if(!artist_response.ok) throw `${artist_response.status} : ${artist_response.statusText}`;
            const artist: Search = await artist_response.json() as Search;
            return {"user": user_hyrdration, "artist_data": combineContinuation(artist, await continuation(artist.next_href, locale_params, opts, opts.depth ?? 0)) as unknown as SearchOf<Playlist|User|Track>};
        } catch (error) { return { "error": String(error) }; }
    }
    export async function getPlaylist(opts: Opts & ({ "playlist_path": string })) {
        try {
            opts.client_id = opts.client_id === undefined ? await getClientID() : opts.client_id; 
            if (typeof opts.client_id === "object") throw opts.client_id.error;
            const hydration = await getHydration(`https://soundcloud.com/${opts.playlist_path}`);
            if("error" in hydration) throw hydration.error;
            const playlist_hyrdration: HydratablePlaylist = hydration.find((hydratable) => hydratable.hydratable == "playlist") as HydratablePlaylist;
            return playlist_hyrdration;
        } catch (error) { return { "error": String(error) }; }
    }
}
