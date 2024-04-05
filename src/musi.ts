export namespace Musi {
    type SuccessData = { title: string, data: Track[] };

    interface PlaylistResponseSuccessParsed {
        success: {
            code: string,
            data: SuccessData,
            hash: string,
            title: string
        }
    }

    interface PlaylistResponseSuccess {
        success: {
            code: string,
            data: string,
            hash: string,
            title: string
        }
    }

    interface PlaylistResponseError {
        error: string
    }

    type PlaylistResponse = PlaylistResponseSuccessParsed | PlaylistResponseError;
    
    interface Track {
        video_id: string,
        video_name: string,
        video_creator: string,
        video_duration: number,
    }
    
    export async function getPlaylist(url: string): Promise<PlaylistResponse>{
        try {            
            const playlist_param = url.replace('https://feelthemusi.com/playlist/', '')
            const response = await fetch(`https://feelthemusi.com/api/v4/playlists/fetch/${playlist_param}`);
            
            const playlist_response = await response.json() as PlaylistResponseSuccess | PlaylistResponseError;
            if("error" in playlist_response) throw playlist_response.error;
            const playlist_response_parsed_data: PlaylistResponseSuccessParsed = {
                'success': {
                    'code': playlist_response.success.code,
                    'data': JSON.parse(playlist_response.success.data) as SuccessData,
                    'hash': playlist_response.success.hash,
                    'title': playlist_response.success.title
                }
            };
            return playlist_response_parsed_data;
        } catch (error) {
            return { 'error': String(error) };
        }
    }
}