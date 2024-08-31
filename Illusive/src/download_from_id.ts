import * as Origin from '../../index'

export async function soundcloud_download_from_id(permalink: string) {
    return await Origin.SoundCloudDL.get_download_info_from_permalink(permalink);
}