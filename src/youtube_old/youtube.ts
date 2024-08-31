import * as auth from './auth';
import * as extractor from "./html_extractor";
import * as converter from "./type_converter"
import * as ytcfg from "./ytcfg"
import assert from "../utils/assert";
import ContinuationItem, { ContinuationCommand } from './types/ContinuationItem';
import { ContentItem, Chip, MiniYTCFG } from './types/types';
import PostClientContext from "./types/PostClientContext";
import { decode_hex } from './html_extractor';
import { CookieJar } from "../utils/cookie_util";
import { YTCFG } from "./types/YTCFG";
import { encodeParams, getMainKey } from '../utils/util';

export namespace YouTube {
    interface Client {

    }
    type Opts = { cookie_jar?: CookieJar, client?: Client };
    
/*
fetch("https://m.youtube.com/", {
  "headers": {

    "cookie": "LOGIN_INFO=AFmmF2swRgIhAPAE2AvZs9i14-0io3aV6l6GYLKJ3s1OZyF6bAMoZN_LAiEAhJjLgeOQKw-yIIZvxOCHiVtvtwUGdsv3OReYnKQuBc8:QUQ3MjNmeGpTY0JLU3dNTGdsQk1EMGNrbjdNZURaNm54eXRPNDZRWWJ0amVfNTBPOW54Y2ZoWFRkV3k2dE1hMS1pTEVNVURYWTdsN1dBMWJvelNtaDlUcEkyZW45TzZMM3dVOU1LVHZIVjNLd1ZXWjY0cW9JNVdmVVBKMFctNFBhcVJQRGJtZkFQRlNlU2Z0aFozS3ZFSnVKeS1oSUdqWEVn; VISITOR_INFO1_LIVE=UUk1Gsb1xuQ; VISITOR_PRIVACY_METADATA=CgJVUxIEGgAgWw%3D%3D; YSC=pm0ZRNZ5lYo; HSID=AB5qLZJa0T4nRJowq; SSID=Asez0J9MQmLVdA2_C; APISID=zISs220n3joeFbGv/AH8YQYR8MYNX8zZDx; SAPISID=MAdwqY07mdF0BdZv/AKQgcmwWaBvau7Qci; __Secure-1PAPISID=MAdwqY07mdF0BdZv/AKQgcmwWaBvau7Qci; __Secure-3PAPISID=MAdwqY07mdF0BdZv/AKQgcmwWaBvau7Qci; SID=g.a000lQgdkJt9j3Ds0sqJiwdVSnrPfvse1aP4MA_l0zyyDLHfz-ciurJzhP2khGB1i7fwxO_CmwACgYKAbwSARQSFQHGX2MiotcRrPmUW0z7TI_hXen9SxoVAUF8yKpWN2ylzdo6IM6LjtNlRD8J0076; __Secure-1PSID=g.a000lQgdkJt9j3Ds0sqJiwdVSnrPfvse1aP4MA_l0zyyDLHfz-cirwjVTjWw4Fh6IS1ZFy0vNAACgYKAbASARQSFQHGX2Mi_PJY9RPvXVAO-Eq7mPO-SRoVAUF8yKquoFgLI4pEiIA12pj9bABh0076; __Secure-3PSID=g.a000lQgdkJt9j3Ds0sqJiwdVSnrPfvse1aP4MA_l0zyyDLHfz-cibwECqZGo2aqfILuR1PA0EwACgYKAXYSARQSFQHGX2MiJpsGg6BQyyM-7rkYFJG-oRoVAUF8yKpIb2lX1HnJP1F9dR6SkGDw0076; PREF=f6=40000080&f7=4100&tz=America.Los_Angeles&volume=15&autoplay=true&guide_collapsed=false&repeat=NONE; __Secure-1PSIDTS=sidts-CjEB4E2dkVUk3QrUjIgenhIWZmeYtDlD3d2ncMRH3Rt8yMXJ7bog68SLnSks4XzMXgYKEAA; __Secure-3PSIDTS=sidts-CjEB4E2dkVUk3QrUjIgenhIWZmeYtDlD3d2ncMRH3Rt8yMXJ7bog68SLnSks4XzMXgYKEAA; SIDCC=AKEyXzWI3V-j90py4cp7FBtjn8dUUkp6JsW6wXRHeDYmPLC4KBQfVtEizwaFCZdpDMshfzeEQjX9; __Secure-1PSIDCC=AKEyXzUMX-CxASilSYdingd2wXt0yvoNoAHPL890vMxRm7MS_OvfzPq4aLMEFOWEkRTTQeYpC0gP; __Secure-3PSIDCC=AKEyXzWtvMnvOrz73jnbiBm8t2LHIs2KCIx4fq2qW6BrCNkeuNdtbmy3YcI7H0xmbzvJHJBgCic"
  },
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET"
});

*/



    const origin = "https://youtube.com/";
    function getHeaders(cookie_jar?: CookieJar){
        return {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "max-age=0",
            "priority": "u=0, i",
            "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
            "sec-ch-ua-arch": "\"\"",
            "sec-ch-ua-bitness": "\"64\"",
            "sec-ch-ua-form-factors": "",
            "sec-ch-ua-full-version": "\"126.0.6478.127\"",
            "sec-ch-ua-full-version-list": "\"Not/A)Brand\";v=\"8.0.0.0\", \"Chromium\";v=\"126.0.6478.127\", \"Google Chrome\";v=\"126.0.6478.127\"",
            "sec-ch-ua-mobile": "?1",
            "sec-ch-ua-model": "\"Nexus 5\"",
            "sec-ch-ua-platform": "\"Android\"",
            "sec-ch-ua-platform-version": "\"6.0\"",
            "sec-ch-ua-wow64": "?0",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "none",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "x-client-data": "CIa2yQEIpLbJAQipncoBCPvuygEIlqHLAQj0mM0BCIWgzQEIqp7OAQj/oM4BCKeizgEI46XOAQjep84BCJqozgEIg6zOARihnc4BGPGnzgEY642lFw==",
            "cookie": cookie_jar?.toString() ?? ""
        };
    }
    function postHeaders(cookie_jar?: CookieJar){
        const sapisid_cookie = cookie_jar?.getCookie("SAPISID");
        return {
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "content-type": "application/json",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "same-origin",
            "sec-fetch-site": "same-origin",
            "x-goog-authuser": "0",
            "x-origin": origin,
            "x-youtube-bootstrap-logged-in": "true",
            "x-youtube-client-name": "2",
            "x-youtube-client-version": "2.20240102.09.00",
            "Referer": origin,
            "Referrer-Policy": "strict-origin-when-cross-origin",
            "authorization": cookie_jar !== undefined ? auth.get_youtube_sapisid_hash_auth(sapisid_cookie?.getData().value ?? "", origin) : "", //SAPISIDHASH
            "cookie": cookie_jar?.toString() ?? "",
        };
    }

    async function postRequest(path: string, query_params_object: object, request_payload: object, jar?: CookieJar){
        const response = await fetch(`${origin}/${path}?${encodeParams(query_params_object)}`, {"headers": postHeaders(jar), body: JSON.stringify(request_payload)});
        jar?.updateWithFetch(response);
        return response;
    }
    
    async function continuationRequest(continuationItemRenderer: ContinuationItem, context: PostClientContext, apiKey: string, jar?: CookieJar){
        //
        const request_payload: ContinuationCommand & {
            continuation?: string, context?: PostClientContext
        } = continuationItemRenderer.continuationEndpoint.continuationCommand;
        request_payload['continuation'] = request_payload['token'];
        request_payload['context'] = context;
        const response = await postRequest(
            continuationItemRenderer.continuationEndpoint.commandMetadata.webCommandMetadata.apiUrl, 
            {"key": apiKey, "prettyPrint": false}, 
            request_payload,
            jar
        );
        return response;
    }
    
    interface YouTubeContents {
        chips?: Chip[],
        contents: ContentItem[],
        config: MiniYTCFG
    }
    
    function parseItems(response_item_contents: Record<string, any>[]): ContentItem[]{
        const content_items: ContentItem[] = [];
        for(const item of response_item_contents){
            const main_key = getMainKey(item);
            const item_data = item[main_key] ;
            switch(main_key){
                case "richItemRenderer":
                    content_items.push(converter.richItemRenderer_to_content_item(item_data));
                    break;
                case "videoWithContextRenderer":
                    content_items.push(converter.videoWithContextRenderer_to_content_item(item_data));
                    break;
                case "richSectionRenderer":
                    const content_item = converter.richSectionRenderer_to_content_item(item_data);
                    if(content_item !== undefined) content_items.push(content_item);
                    break;
                case "continuationItemRenderer":
                    content_items.push({"continuation": item_data});
                    break;
                case "compactRadioRenderer": console.warn("compactRadioRenderer is unimplemented"); break;
                case "horizontalCardListRenderer": 
                    content_items.push(converter.horizontalCardListRenderer_to_content_item(item_data));
                    break;
                case "compactChannelRenderer": content_items.push({"channel": item[main_key]}); break;
                case "channelRenderer": content_items.push({"channel": item[main_key]}); break;
                case "compactPlaylistRenderer": content_items.push({"playlist": item[main_key]}); break;
                case "adSlotRenderer": break; //Ignore ads :3
                default: console.log(JSON.stringify( item[main_key] )); throw `Unknown '${main_key}' in response_item_contents`;
            }
        }
        return content_items;
    }
    function getContents(page_html: string) : YouTubeContents{
        const yt_initial_data = extractor.extract_yt_initial_data( page_html );
        if("error" in yt_initial_data) throw yt_initial_data.error;
        const youtube_config = extractor.extract_ytcfg(page_html);
        const response_contents: Record<string, any> = yt_initial_data['contents'];
        assert(response_contents != undefined, "Unable to find yt_initial_data contents");
        let response_result_renderer: Record<string, any>;
        const content_main_key = getMainKey(yt_initial_data['contents']);
        switch(content_main_key){
            case "singleColumnBrowseResultsRenderer": 
                response_result_renderer = response_contents['singleColumnBrowseResultsRenderer'];
                break;
            case "twoColumnBrowseResultsRenderer": 
                response_result_renderer = response_contents['twoColumnBrowseResultsRenderer'];
                break;
            case "twoColumnSearchResultsRenderer":
                response_result_renderer = response_contents['twoColumnSearchResultsRenderer'];
                let content_items2: ContentItem[] = [];   
                for(const item of response_contents['twoColumnSearchResultsRenderer']['primaryContents']['sectionListRenderer']['contents']){
                    const main_key = getMainKey(item);
                    switch(main_key){
                        case "itemSectionRenderer":
                            content_items2 = content_items2.concat(parseItems(item['itemSectionRenderer']['contents']));
                            break;
                        case "continuationItemRenderer":
                            content_items2 = content_items2.concat({'continuation': item['continuationItemRenderer']});
                            break;
                        case "universalWatchCardRenderer": 
                            content_items2 = content_items2.concat({'univseral_channel': item['universalWatchCardRenderer']});
                            break;
                        default: console.log(JSON.stringify(item[main_key])); throw `Unknown '${main_key}' in sectionListRenderer`;
                    }
                }
                return {"contents": content_items2, "config": ytcfg.ytcfg_mini(youtube_config)};
            case "sectionListRenderer": // SEARCH
                let content_items: ContentItem[] = [];   
                for(const item of response_contents['sectionListRenderer']['contents']){
                    const main_key = getMainKey(item);
                    switch(main_key){
                        case "itemSectionRenderer":
                            content_items = content_items.concat(parseItems(item['itemSectionRenderer']['contents']));
                            break;
                        case "continuationItemRenderer":
                            content_items = content_items.concat({'continuation': item['continuationItemRenderer']});
                            break;
                        case "universalWatchCardRenderer": 
                            content_items = content_items.concat({'univseral_channel': item['universalWatchCardRenderer']});
                            break;
                        default: console.log(JSON.stringify(item[main_key])); throw `Unknown '${main_key}' in sectionListRenderer`;
                    }
                }
                return {"contents": content_items, "config": ytcfg.ytcfg_mini(youtube_config)};
            default: throw `Unknown '${content_main_key}' in yt_initial_data['contents']`;
        }
        const response_tab_renderer_content = response_result_renderer['tabs'][0]['tabRenderer']['content'];
        const response_chips_contents = response_tab_renderer_content['richGridRenderer']?.['header']?.['feedFilterChipBarRenderer']?.['contents'];
        const response_item_contents = response_tab_renderer_content['richGridRenderer']['contents']; 
        const content_items : ContentItem[] = parseItems(response_item_contents);
    
        return {
            "chips": response_chips_contents !== undefined ? converter.header_chip_bar_renderer_to_chips(response_chips_contents) : undefined,
            "contents": content_items,
            "config": ytcfg.ytcfg_mini(youtube_config)
        };
    }
    export async function getContentsContinuation(continuation_item: ContinuationItem, mini_ytcfg: MiniYTCFG): Promise<ContentItem[]>{
        const response_data = await (await continuationRequest(continuation_item, mini_ytcfg.client, mini_ytcfg.api_key)).json();
        const response_new_items = response_data['onResponseReceivedActions'][0]['appendContinuationItemsAction']['continuationItems'];
        const content_items : ContentItem[] = parseItems(response_new_items);
        return content_items;
    }
    
    export async function home(jar?: CookieJar) : Promise<YouTubeContents>{
        const home_page_html = await (await fetch(origin, {'method': "GET", "headers": getHeaders(jar)})).text();
        console.log(JSON.stringify(extractor.extract_yt_initial_data(home_page_html)));
        return getContents(home_page_html);
    }
    
    export async function search(search_query: string, filters = undefined) : Promise<YouTubeContents>{
        const query_params = { 
            "search_query": encodeURIComponent(search_query).split("%20").join("+")
        }
        const search_page_html = await (await fetch(`${origin}/results?${encodeParams(query_params)}`, {"method": "GET", "headers": getHeaders()})).text();
        return getContents(search_page_html);
    }
    function searchContinuation(){
    
    }
    function getChannel(channel_canonical_url_path: string){
    
    }
}