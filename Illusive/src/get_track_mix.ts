import * as Origin from '../../index';
import { CookieJar } from '../../src/utils/cookie_util';
import { generateNewUID, parseTime } from '../../src/utils/util';
import { Prefs } from './prefs';
import { Track } from './types';
export async function get_youtube_track_mix(video_id: string): Promise<{"tracks": Track[]}>{
    const cookie_jar: CookieJar = Prefs.get_pref("youtube_cookie_jar");
    const mix_response = await Origin.YouTube.getYouTubeMix({"cookie_jar": cookie_jar}, video_id);
    if("error" in mix_response) return {"tracks": []};
    return {
        "tracks": mix_response.data.tracks.map(track => {
            return {
                "uid": generateNewUID(track.title.simpleText),
                "title": track.title.simpleText,
                "artists": track.shortBylineText.runs.map(item => item.text),
                "duration": parseTime(track.lengthText.simpleText),
                "youtube_id": track.videoId
            }
        })
    }
}