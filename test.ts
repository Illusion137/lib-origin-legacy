import * as Origin from './index';
import { CookieJar } from './src/utils/cookie_util';

function print_test(service: string, result: boolean){
    console.log(`[TEST]: ${service.toUpperCase()} ${result ? "PASSED": "FAILED"}`)
}

async function test_spotify(): Promise<boolean>{
    try {        
        const spotify_jar: CookieJar = CookieJar.fromString("sp_t=2f24af0a2720dede2f9e4c5a411e2d72; sp_dc=AQCEY1FNzVTOTSTDeOQsPzVGErTmPmvvhL6F521K8GVvAsAad-PsfUDfU5SyAM6q6UmSLIJPl8JaR-17XBydo8yeQIRZutfnRBYp0F6Zdby9Jci7cu_fz31fR7yzaAIm4yJjOBIHGVO_uWt54AOUZX6xZkoJM5gwPklPtwmgB8gUCqecxR5OEaUg9F6haNFhfIouBjuZmFKwk3k7l4bJM6wa00g; sp_key=51241d93-e3f2-493e-b975-3ba89b6c0dba; sp_landing=https%3A%2F%2Fwww.spotify.com%2Fapi%2Fmasthead%2Fv1%2Fmasthead; sp_landingref=https%3A%2F%2Fopen.spotify.com%2F; OptanonConsent=isGpcEnabled=0&datestamp=Sun+Apr+21+2024+19%3A37%3A33+GMT-0700+(Pacific+Daylight+Time)&version=202309.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&landingPath=NotLandingPage&groups=BG169%3A1%2Ct00%3A1%2Ci00%3A1%2CBG170%3A1%2Cs00%3A1%2Cf00%3A1%2Cm00%3A1%2Cf11%3A1&AwaitingReconsent=false");
        console.log(spotify_jar.toString());
        // const client = await Origin.Spotify.getClient("https://open.spotify.com/playlist/4uNs2lqeO0Ec43d2Sp3yp4", spotify_jar);
        // if("error" in client) throw `CLIENT ${client.error}`;

        // const playlist = await Origin.Spotify.getPlaylist("https://open.spotify.com/playlist/4uNs2lqeO0Ec43d2Sp3yp4", {client: client, cookie_jar: spotify_jar});
        // if("error" in playlist) throw `PLAYLIST ${playlist.error}`;

        // const album = await Origin.Spotify.getAlbum("https://open.spotify.com/album/7zezk3hbEWlOooKBLuLJKp", {client: client, cookie_jar: spotify_jar});
        // if("error" in album) throw `ALBUM ${album.error}`;

        const profile = await Origin.Spotify.getProfileAccountAttributes({cookie_jar: spotify_jar});
        if("error" in profile) throw `PROFILE ${profile.error}`;
        console.log(JSON.stringify(profile))

        // const collection = await Origin.Spotify.getCollection("https://open.spotify.com/collection/tracks", {client: client, cookie_jar: spotify_jar});
        // if("error" in collection) throw `COLLECTION ${collection.error}`;
        // console.log(JSON.stringify(collection));

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}



test_spotify().then(result => { print_test("Spotify", result); });