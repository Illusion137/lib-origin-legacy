import * as Origin from '../../index'
import { ResponseError } from '../../src/utils/types';

export async function soundcloud_download_from_id(permalink: string): Promise<{"url":string}|ResponseError> {
    const url = await Origin.SoundCloudDL.get_download_info_from_permalink(permalink);
    if(typeof url === "object") return url;
    return {"url": url}
}
export async function youtube_download_from_id(video_id: string): Promise<{"url":string}|ResponseError> {
    try {
        const format = await Origin.YouTubeDL.ytdl(video_id, {"quality": "highestaudio", "requestOptions": {}});
        return {"url": format.url};
    } catch (error) { return { "error": String(error) }; }
}