import assert from "../utils/assert";
import { getMainKey } from "../utils/util";
import { Chip, ContentItem, RunsText, Short, ReelShelf, Video, Thumbnail, MiniAlbum } from "./types/types";

type Runs = {"runs": RunsText};
export function pre_runs_to_str(runs: Runs): string {
    assert(runs?.['runs'] != undefined, "runs is undefined:" + JSON.stringify(runs));
    return runs.runs.map(run => run.text).join(" ");
}

export function chipCloudChipRenderer_to_chip(chipCloudChipRenderer: Record<string, any>) : Chip{
    return {
        "text": pre_runs_to_str(chipCloudChipRenderer['text']),
        "navigationEndPoint": chipCloudChipRenderer['navigationEndpoint']
    };
}
export function header_chip_bar_renderer_to_chips(possible_chip_objects: Record<string, any>[]) : Chip[]{
    const chips: Chip[] = [];
    for(const possible_chip of possible_chip_objects)
        if(getMainKey(possible_chip) == "chipCloudChipRenderer")
            chips.push(chipCloudChipRenderer_to_chip(possible_chip['chipCloudChipRenderer']));
    return chips;
}

export function reelItemRenderer_to_short(reelItemRenderer: Record<string, any>) : Short{
    return {
        "video_id": reelItemRenderer['videoId'],
        "headline": pre_runs_to_str(reelItemRenderer['headline']),
        "thumbnails": reelItemRenderer['thumbnail']['thumbnails'],
        "feedback_token": reelItemRenderer['dismissalInfo']?.['feedbackToken']
    };
}

export function videoWithContextRenderer_to_content_item(videoWithContextRenderer: Record<string, any>): ContentItem{
    const video = videoWithContextRenderer;
    return {"video": 
                {
                    "video_id": video['videoId'],
                    "title": pre_runs_to_str(video['headline']),
                    "author": {
                        "name": pre_runs_to_str(video['shortBylineText']),
                        "canonical_base_url": video['channelThumbnail']['channelThumbnailWithLinkRenderer']['navigationEndpoint']['browseEndpoint']['canonicalBaseUrl'],
                        "thumbnails": video['channelThumbnail']['channelThumbnailWithLinkRenderer']['thumbnail']['thumbnails']
                    },
                    "thumbnails": video['thumbnail']['thumbnails'],
                    "published_time_text": video['publishedTimeText'] != undefined ? pre_runs_to_str(video['publishedTimeText']) : undefined,
                    "views_count_text": pre_runs_to_str(video['shortViewCountText']),
                    "duration_thumbnail_overlay_text": pre_runs_to_str(video['lengthText']),
                    "is_watched": video['isWatched'],
                    "start_time_seconds": video['inlinePlaybackEndpoint']?.['watchEndpoint']?.['startTimeSeconds']
                }
            }
}

export function richItemRenderer_to_content_item(richItemRenderer: Record<string, any>) : ContentItem {
    const content = richItemRenderer['content'];
    const main_key = getMainKey(content);
    const inner_content = content[main_key];
    switch(main_key){
        case "videoWithContextRenderer": 
            return videoWithContextRenderer_to_content_item(inner_content);
        default: throw `richItemRenderer: '${main_key}' not found`;
    }
}

export function richSectionRenderer_to_content_item(richSectionRenderer: Record<string, any>) : (ContentItem|undefined) {
    const content = richSectionRenderer['content'];
    const main_key = getMainKey(content);
    const inner_content = content[main_key];
    switch(main_key){
        case "reelShelfRenderer":
            const shelf_items : Record<string, any>[] = inner_content['items'];
            return {"reel_shelf": shelf_items.map(reelItemRenderer => reelItemRenderer_to_short(reelItemRenderer['reelItemRenderer'])) };
            break;
        case "searchBarEntryPointViewModel": break; //Ignore - Voice Search Something
        case "feedNudgeRenderer": break; //Ignore - Go Watch More Videos Renderer :3
        default: console.log(JSON.stringify(inner_content)); throw `richSectionRenderer: '${main_key}' not found`;
    }
}

export function horizontalCardListRenderer_to_content_item(horizontalCardListRenderer: Record<string, any>) : ContentItem{
    const header = pre_runs_to_str(horizontalCardListRenderer.header.richListHeaderRenderer.title);
    switch(header){
        case "Albums":
            return {
                "mini_albums": (horizontalCardListRenderer.cards as Record<string, any>[]).map(card => {
                    const main_key = getMainKey(card);
                    switch(main_key){
                        case "searchRefinementCardRenderer":
                            return {
                                "title": pre_runs_to_str(card.searchRefinementCardRenderer.bylineText as Runs),
                                "album_name": pre_runs_to_str(card.searchRefinementCardRenderer.query as Runs),
                                "thumbnail": card.searchRefinementCardRenderer.thumbnail.thumbnails as Thumbnail[],
                                "playlist_endpoint": card.searchRefinementCardRenderer.searchEndpoint.watchPlaylistEndpoint.playlistId as string
                            } as MiniAlbum;
                        default: console.log(JSON.stringify( card[main_key] )); throw `Unknown '${main_key}' in horizontalCardListRenderer-Card`;
                    }
                }),
            };
        default: console.log(header); throw `Unknown '${header}' in horizontalCardListRenderer-Header`;
    }
}