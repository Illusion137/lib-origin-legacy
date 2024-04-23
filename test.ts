import * as Origin from './index';
import { CookieJar } from './src/utils/cookie_util';

function print_test(service: string, test_cases_passed: number, max_cases: number){ console.log(`[TEST]: ${service.toUpperCase()}: ${test_cases_passed}/${max_cases} TEST CASES PASSED`); }

async function test_spotify(): Promise<number>{
    let test_cases_passed = 0;
    try {        
        const spotify_jar: CookieJar = CookieJar.fromString("sp_t=2f24af0a2720dede2f9e4c5a411e2d72; sp_dc=AQCEY1FNzVTOTSTDeOQsPzVGErTmPmvvhL6F521K8GVvAsAad-PsfUDfU5SyAM6q6UmSLIJPl8JaR-17XBydo8yeQIRZutfnRBYp0F6Zdby9Jci7cu_fz31fR7yzaAIm4yJjOBIHGVO_uWt54AOUZX6xZkoJM5gwPklPtwmgB8gUCqecxR5OEaUg9F6haNFhfIouBjuZmFKwk3k7l4bJM6wa00g; sp_key=51241d93-e3f2-493e-b975-3ba89b6c0dba; sp_landing=https%3A%2F%2Fwww.spotify.com%2Fapi%2Fmasthead%2Fv1%2Fmasthead; sp_landingref=https%3A%2F%2Fopen.spotify.com%2F; OptanonConsent=isGpcEnabled=0&datestamp=Sun+Apr+21+2024+19%3A37%3A33+GMT-0700+(Pacific+Daylight+Time)&version=202309.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&landingPath=NotLandingPage&groups=BG169%3A1%2Ct00%3A1%2Ci00%3A1%2CBG170%3A1%2Cs00%3A1%2Cf00%3A1%2Cm00%3A1%2Cf11%3A1&AwaitingReconsent=false");
        const client = await Origin.Spotify.getClient("https://open.spotify.com/playlist/4uNs2lqeO0Ec43d2Sp3yp4", spotify_jar);
        if("error" in client) throw `CLIENT ${client.error}`;
        test_cases_passed++;

        const credits = await Origin.Spotify.getCredits({uri_id:"1vwXV3TcLEv101yuMaAXQF", client: client, cookie_jar: spotify_jar});
        if("error" in credits) throw `CREDITS ${credits.error}`;
        test_cases_passed++;

        const playlist = await Origin.Spotify.getPlaylist("https://open.spotify.com/playlist/4uNs2lqeO0Ec43d2Sp3yp4", {client: client, cookie_jar: spotify_jar});
        if("error" in playlist) throw `PLAYLIST ${playlist.error}`;
        test_cases_passed++;

        const album = await Origin.Spotify.getAlbum("https://open.spotify.com/album/7zezk3hbEWlOooKBLuLJKp", {client: client, cookie_jar: spotify_jar});
        if("error" in album) throw `ALBUM ${album.error}`;
        test_cases_passed++;

        const profile = await Origin.Spotify.getProfileAccountAttributes({client: client, cookie_jar: spotify_jar});
        if("error" in profile) throw `PROFILE ${profile.error}`;
        test_cases_passed++;

        const collection = await Origin.Spotify.getCollection("https://open.spotify.com/collection/tracks", {client: client, cookie_jar: spotify_jar});
        if("error" in collection) throw `COLLECTION ${collection.error}`;
        test_cases_passed++;

        const sp_t_cookie = spotify_jar.getCookies().filter(cookie => cookie.toString().includes("sp_t="))[0];
        if(sp_t_cookie === undefined) throw "Unable to find 'sp_t' Cookie";
        const home = await Origin.Spotify.getHome({sp_t_cookie: sp_t_cookie, client: client, cookie_jar: spotify_jar});
        if("error" in home) throw `HOME ${home.error}`;
        test_cases_passed++;

        const all_playlists = await Origin.Spotify.getAllPlaylistsFromAccount({client: client, cookie_jar: spotify_jar});
        if("error" in all_playlists) throw `ALL_PLAYLISTS ${all_playlists.error}`;
        test_cases_passed++;

        const search = await Origin.Spotify.search("Seycara", {client: client, cookie_jar: spotify_jar});
        if("error" in search) throw `SEARCH ${search.error}`;
        test_cases_passed++;
    } catch (error) {
        console.log(error);
    }
    finally { return test_cases_passed; }
}

async function test_amazon_music(){
    let test_cases_passed = 0;
    try {
        const amazon_jar: CookieJar = CookieJar.fromString("session-id=143-1020795-1822234; ubid-main=135-2433363-4547101; lc-main=en_US; x-main=\"uZQtq7JzeER6lc8?wAEhK70J?lClkDWt\"; at-main=Atza|IwEBIJeZ4qu-WVLlw62bVDEanOg85MCZuh8M_BoRAG3GN03L2wi0PZ380rOK3qFCix4wQ2wC7hbXLmw_KkphjR5alvoiXp88lnyPP7JiwHbeL5HyvT1CbcLZtpLUyd0SXx9EoYR069XOmggrhltIuQkGTsKKuan1SR0o6OGUN0zha7zh1kh9FgRis1mBPtegGnOtCl5PHpjST9dmhtxK9e2dwMmJjV8borOJAs_3ORIZn9G_CHzRME7mBQHhZKxuuxYIIIg; sess-at-main=\"ul9DIGKREfSJSo5aYHAtS80/baFSwxou9JZzbwNAmYw=\"; session-id-time=2082787201l; session-token=IXLkWNTTaPd20Y7y1CF4uyg33f9FjywxkfdFglua9nlXBlw80Te0wcgnS1ZOwsMlOTVmbm2g3ngjMDO0Ej9LSWTLvl+cXUzUrbcQmmKnJ9J1LIScKzOb/O1geMHcCSNOGLUCqbUI+niEBmoK6OEA14M2Mua4qZ0SxT2k0KRhl/vvXCKHiduafCkaCIOFzbUiu/pt3m2gnYNgQKW6/KvEHUcmBI3OoNLkFKqWLte4gS1+bOU2QFsU6YPU8rJir8mpyB2WHTm8prfP54FP80O+QypwfM6pfv5RH9hxoJ3QW9tmRsEsTeC9U+tN0najGp0knVVd6CPDmSIgrZLh1x8ByEfh4YA8Vb0AE6Na33pUEjoneNly1M/BYJez0xZZZ5p5");
        const client = await Origin.AmazonMusic.getAmznMusicData("https://music.amazon.com/", {cookie_jar: amazon_jar});
        if("error" in client) throw `CLIENT ${client.error}`;
        test_cases_passed++;

        const show_home = await Origin.AmazonMusic.getShowHomeData(client, "https://music.amazon.com/", {'client': client, cookie_jar: amazon_jar});
        if("error" in show_home) throw `SHOW HOME ${show_home.error}`;
        test_cases_passed++;

        const all_playlists = await Origin.AmazonMusic.getAllPlaylistsFromAccount({client: client, cookie_jar: amazon_jar});
        if("error" in all_playlists) throw `ALL PLAYLISTS ${all_playlists.error}`;
        test_cases_passed++;

        const playlist = await Origin.AmazonMusic.getPlaylist("https://music.amazon.com/my/playlists/a5dc1cff-2ccb-4e52-8144-d5adae28e33d", {client: client, cookie_jar: amazon_jar});
        if("error" in playlist) throw `PLAYLIST ${playlist.error}`;
        test_cases_passed++;

        const album = await Origin.AmazonMusic.getPlaylist("https://music.amazon.com/albums/B0CKX9LZWV", {client: client, cookie_jar: amazon_jar});
        if("error" in album) throw `ALBUM ${album.error}`;
        test_cases_passed++;

        const search = await Origin.AmazonMusic.search("Tae Retro", {client: client, cookie_jar: amazon_jar});
        if("error" in search) throw `SEARCH ${search.error}`;
        test_cases_passed++;

    } catch (error) {
        console.log(error);
    } finally { return test_cases_passed; }
}

// test_spotify().then(result => { print_test("Spotify", result, 9); });
test_amazon_music().then(result => { print_test("Amazon Music", result, 6); });
