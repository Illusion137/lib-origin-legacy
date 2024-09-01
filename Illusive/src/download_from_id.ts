import * as Origin from '../../index'

export async function soundcloud_download_from_id(permalink: string) {
    return await Origin.SoundCloudDL.get_download_info_from_permalink(permalink);
}
export async function youtube_download_from_id(video_id: string) {
    try {
        const format = await Origin.YouTubeDL.ytdl(video_id, {"quality": "highestaudio", "requestOptions": {}});
        return format.url;
    } catch (error) { return { "error": String(error) }; }
}