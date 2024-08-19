import { Illusive } from './Illusive/src/illusive';
import * as Origin from './index';
import { CookieJar } from './src/utils/cookie_util';

function print_test(service: string, test_cases_passed: number, max_cases: number){ console.log(`[TEST]: ${service.toUpperCase()}: ${test_cases_passed}/${max_cases} TEST CASES PASSED`); }

async function test_youtube_music(): Promise<number> {
    let test_cases_passed = 0;
    try { 
        const youtube_music_jar = CookieJar.fromString("LOGIN_INFO=AFmmF2swRgIhAPAE2AvZs9i14-0io3aV6l6GYLKJ3s1OZyF6bAMoZN_LAiEAhJjLgeOQKw-yIIZvxOCHiVtvtwUGdsv3OReYnKQuBc8:QUQ3MjNmeGpTY0JLU3dNTGdsQk1EMGNrbjdNZURaNm54eXRPNDZRWWJ0amVfNTBPOW54Y2ZoWFRkV3k2dE1hMS1pTEVNVURYWTdsN1dBMWJvelNtaDlUcEkyZW45TzZMM3dVOU1LVHZIVjNLd1ZXWjY0cW9JNVdmVVBKMFctNFBhcVJQRGJtZkFQRlNlU2Z0aFozS3ZFSnVKeS1oSUdqWEVn; VISITOR_INFO1_LIVE=UUk1Gsb1xuQ; VISITOR_PRIVACY_METADATA=CgJVUxIEGgAgWw%3D%3D; YSC=pm0ZRNZ5lYo; HSID=AB5qLZJa0T4nRJowq; SSID=Asez0J9MQmLVdA2_C; APISID=zISs220n3joeFbGv/AH8YQYR8MYNX8zZDx; SAPISID=MAdwqY07mdF0BdZv/AKQgcmwWaBvau7Qci; __Secure-1PAPISID=MAdwqY07mdF0BdZv/AKQgcmwWaBvau7Qci; __Secure-3PAPISID=MAdwqY07mdF0BdZv/AKQgcmwWaBvau7Qci; SID=g.a000lQgdkJt9j3Ds0sqJiwdVSnrPfvse1aP4MA_l0zyyDLHfz-ciurJzhP2khGB1i7fwxO_CmwACgYKAbwSARQSFQHGX2MiotcRrPmUW0z7TI_hXen9SxoVAUF8yKpWN2ylzdo6IM6LjtNlRD8J0076; __Secure-1PSID=g.a000lQgdkJt9j3Ds0sqJiwdVSnrPfvse1aP4MA_l0zyyDLHfz-cirwjVTjWw4Fh6IS1ZFy0vNAACgYKAbASARQSFQHGX2Mi_PJY9RPvXVAO-Eq7mPO-SRoVAUF8yKquoFgLI4pEiIA12pj9bABh0076; __Secure-3PSID=g.a000lQgdkJt9j3Ds0sqJiwdVSnrPfvse1aP4MA_l0zyyDLHfz-cibwECqZGo2aqfILuR1PA0EwACgYKAXYSARQSFQHGX2MiJpsGg6BQyyM-7rkYFJG-oRoVAUF8yKpIb2lX1HnJP1F9dR6SkGDw0076; PREF=f6=40000080&f7=4100&tz=America.Los_Angeles&volume=13&autoplay=true&guide_collapsed=false&repeat=NONE; __Secure-1PSIDTS=sidts-CjEB4E2dkSkxRUjgnL-ZuIegZVwF-V_7pcb5JS8u2zzUTAn4oxEaIZ2jZLOWZSrER8yDEAA; __Secure-3PSIDTS=sidts-CjEB4E2dkSkxRUjgnL-ZuIegZVwF-V_7pcb5JS8u2zzUTAn4oxEaIZ2jZLOWZSrER8yDEAA; SIDCC=AKEyXzVUlzq_ql1LqK2JOUJ-pEnY-jwwXKy22vnKEUf5uXEhr3RmVLGV7MK5sVf_uiANCZIwmgIN; __Secure-1PSIDCC=AKEyXzUCr7xAwCn29SP1GqrOcjOoPh7q9Ex5JQ-iyy7Nn8Wqr101QhKszUtB3H9FvM3FpmCX3nXK; __Secure-3PSIDCC=AKEyXzXkhdxRYPFZot5SZiU9BCcgtlpNNVmYMfKPFy8tXPd-7XeFJRYzNflbbg1UUtXoRgK1CdM");

        // const home = await Origin.YouTubeMusic.getHome({'cookie_jar': youtube_music_jar});
        // if("error" in home) throw home.error;
        // console.log(home.data)
        // console.log(JSON.stringify(home.data))

        // const explore = await Origin.YouTubeMusic.getExplore({'cookie_jar': youtube_music_jar});
        // if("error" in explore) throw explore.error;
        // console.log(explore.data);
        // console.log(JSON.stringify(explore.data));

        // const library = await Origin.YouTubeMusic.getLibrary({'cookie_jar': youtube_music_jar});
        // if("error" in library) throw library.error;
        // console.log(library.data);
        // console.log(JSON.stringify(library.data));

        const playlist = await Origin.YouTubeMusic.getPlaylist({'cookie_jar': youtube_music_jar}, "PLnIB0XeUqT-gz0py9BSZzao0XB2rHvVqN");
        if("error" in playlist) throw playlist.error;
        console.log(playlist.data)
        console.log(JSON.stringify(playlist.data.tracks))

        // const artist = await Origin.YouTubeMusic.getArtist({'cookie_jar': youtube_music_jar}, "UCGjFqcstNo97oJNwNW7A77g");
        // if("error" in artist) throw artist.error;
        // console.log(artist.data)
        // console.log(JSON.stringify(artist.data))

        // const search = await Origin.YouTubeMusic.search({'cookie_jar': youtube_music_jar}, "Seycara");
        // if("error" in search) throw search.error;
        // console.log(search.data)
        // console.log(JSON.stringify(search.data))

        // const explore: any = await Origin.YouTubeMusic.getExplore({'cookie_jar': youtube_music_jar});
        // if("error" in explore) throw explore.error;
        // console.log(explore.data)
        // console.log(JSON.stringify(explore.data))
        // const next_con = await Origin.YouTubeMusic.getContinuation({"cookie_jar": youtube_music_jar}, explore.ytcfg, explore.data[0].continuations);
        // if("error" in next_con) throw next_con.error;
        // console.log(next_con);
    
    } catch (error) { console.log(error); }
    finally { return test_cases_passed; }
}

async function test_youtube(): Promise<number> {
    let test_cases_passed = 0;
    try {
        const youtube_jar: CookieJar = CookieJar.fromString("LOGIN_INFO=AFmmF2swRgIhAPAE2AvZs9i14-0io3aV6l6GYLKJ3s1OZyF6bAMoZN_LAiEAhJjLgeOQKw-yIIZvxOCHiVtvtwUGdsv3OReYnKQuBc8:QUQ3MjNmeGpTY0JLU3dNTGdsQk1EMGNrbjdNZURaNm54eXRPNDZRWWJ0amVfNTBPOW54Y2ZoWFRkV3k2dE1hMS1pTEVNVURYWTdsN1dBMWJvelNtaDlUcEkyZW45TzZMM3dVOU1LVHZIVjNLd1ZXWjY0cW9JNVdmVVBKMFctNFBhcVJQRGJtZkFQRlNlU2Z0aFozS3ZFSnVKeS1oSUdqWEVn; VISITOR_INFO1_LIVE=UUk1Gsb1xuQ; VISITOR_PRIVACY_METADATA=CgJVUxIEGgAgWw%3D%3D; YSC=pm0ZRNZ5lYo; HSID=AB5qLZJa0T4nRJowq; SSID=Asez0J9MQmLVdA2_C; APISID=zISs220n3joeFbGv/AH8YQYR8MYNX8zZDx; SAPISID=MAdwqY07mdF0BdZv/AKQgcmwWaBvau7Qci; __Secure-1PAPISID=MAdwqY07mdF0BdZv/AKQgcmwWaBvau7Qci; __Secure-3PAPISID=MAdwqY07mdF0BdZv/AKQgcmwWaBvau7Qci; SID=g.a000lQgdkJt9j3Ds0sqJiwdVSnrPfvse1aP4MA_l0zyyDLHfz-ciurJzhP2khGB1i7fwxO_CmwACgYKAbwSARQSFQHGX2MiotcRrPmUW0z7TI_hXen9SxoVAUF8yKpWN2ylzdo6IM6LjtNlRD8J0076; __Secure-1PSID=g.a000lQgdkJt9j3Ds0sqJiwdVSnrPfvse1aP4MA_l0zyyDLHfz-cirwjVTjWw4Fh6IS1ZFy0vNAACgYKAbASARQSFQHGX2Mi_PJY9RPvXVAO-Eq7mPO-SRoVAUF8yKquoFgLI4pEiIA12pj9bABh0076; __Secure-3PSID=g.a000lQgdkJt9j3Ds0sqJiwdVSnrPfvse1aP4MA_l0zyyDLHfz-cibwECqZGo2aqfILuR1PA0EwACgYKAXYSARQSFQHGX2MiJpsGg6BQyyM-7rkYFJG-oRoVAUF8yKpIb2lX1HnJP1F9dR6SkGDw0076; PREF=f6=40000080&f7=4100&tz=America.Los_Angeles&volume=15&autoplay=true&guide_collapsed=false&repeat=NONE; __Secure-1PSIDTS=sidts-CjEB4E2dkVUk3QrUjIgenhIWZmeYtDlD3d2ncMRH3Rt8yMXJ7bog68SLnSks4XzMXgYKEAA; __Secure-3PSIDTS=sidts-CjEB4E2dkVUk3QrUjIgenhIWZmeYtDlD3d2ncMRH3Rt8yMXJ7bog68SLnSks4XzMXgYKEAA; SIDCC=AKEyXzWI3V-j90py4cp7FBtjn8dUUkp6JsW6wXRHeDYmPLC4KBQfVtEizwaFCZdpDMshfzeEQjX9; __Secure-1PSIDCC=AKEyXzUMX-CxASilSYdingd2wXt0yvoNoAHPL890vMxRm7MS_OvfzPq4aLMEFOWEkRTTQeYpC0gP; __Secure-3PSIDCC=AKEyXzWtvMnvOrz73jnbiBm8t2LHIs2KCIx4fq2qW6BrCNkeuNdtbmy3YcI7H0xmbzvJHJBgCic");
        const home = await Origin.YouTube.home();
        console.log(home);
        test_cases_passed++;
        
        // Origin.YouTube.getContentsContinuation(, home.config)
        // const ytsr = await Origin.YouTube.search("Seycara");
        // console.log(ytsr);
        // test_cases_passed++;


        // const client = await Origin.Spotify.getClient("https://open.spotify.com/playlist/4uNs2lqeO0Ec43d2Sp3yp4", spotify_jar);
        // if("error" in client) throw `CLIENT ${client.error}`;
    } catch(error) {
        console.log(error);
    }
    finally { return test_cases_passed; }
}

async function test_spotify(): Promise<number> {
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

async function test_amazon_music(): Promise<number> {
    let test_cases_passed = 0;
    try {
        const amazon_jar: CookieJar = CookieJar.fromString("session-id=143-1020795-1822234; ubid-main=135-2433363-4547101; lc-main=en_US; i18n-prefs=USD; x-main=tusLxvd7d2IdkFEk6Pmkib1PcxJDYfQQ; at-main=Atza|IwEBINqIPB-qR-07KVxCHl0agrB191n6pqAgOZQooCpg9FW84Hu0delMxxVkI4PEkwSxVdKu_m_9_ebVoM2HO6WmnQuG5xpJdyIVGNpS5SFKe1tg_U7PeF_yGp5DNboTLEyLgfxHCxaBVYeKkgJyPODC6rank829VfIgL_aheG9oLhkfxEt9v1VrQSDZEZqk2X54oY6U-1TdqPXfrx5Mwd069wvjx-nGqs5yOd13U96E4z3V7A; sess-at-main=\"NgL5q/gO71VyqSTh2J+FAzRwOFtw8mDOSTkt7lqspRs=\"; session-id-time=2082787201l; am-token=eyJkZXZpY2VJZCI6IjEzNTI0MzMzNjM0NTQ3MTAxIiwiZ3Vlc3RUb2tlbiI6bnVsbCwiaGFzQ29tcGxldGVkRGF0YVRyYW5zZmVyIjpmYWxzZSwiZ3Vlc3RVYmlkIjpudWxsLCJoYXNBdXRoZW50aWNhdGVkIjp0cnVlfQ==; aws_lang=en; AMCVS_7742037254C95E840A4C98A6%40AdobeOrg=1; regStatus=pre-register; s_cc=true; aws-target-data=%7B%22support%22%3A%221%22%7D; aws-mkto-trk=id%3A112-TZM-766%26token%3A_mch-aws.amazon.com-1722649663263-52766; aws-target-visitor-id=1722649663189-753129.45_0; s_sq=%5B%5BB%5D%5D; AMCV_7742037254C95E840A4C98A6%40AdobeOrg=1585540135%7CMCIDTS%7C19939%7CMCMID%7C18833307450225857599206432347841446034%7CMCAID%7CNONE%7CMCOPTOUT-1722656998s%7CNONE%7CvVersion%7C4.4.0; session-token=flmi/HGTXtLBV7+HukYlvwEJElPwyZJHqnf44UTwGXRhSq0VUuDlMrFv4hDAAVBdRVDhWet4HRVhYq1aNVLBQ0Kn9byTnadWabfFGhuie6YG6I4y1kjoUfUaaAmvSYECok9yrY2e7OG7/UYDDwHSCYHS8zSgNgE7pMlgGXW82FDi8qhKeuIFIO04Z4EP+f8grT+PlyWgpAdP7VV3Cimk185CXXv3beG7WZVIl7h0O1XAW4k+k1ECjPgiWOEfFRO+XOW09cumsp8Z8DY+rMrMRFzWp+O6YFaIbV/Q2w+h0JsPt2QzGfU/BD8ZITVgAcZwbKdt52P4+uBhEnnMgSjbH+eSanBqqVD2yzJdarxrmAluxCm6TecHxoKVqOUL//OR");
        const client = await Origin.AmazonMusic.getAmznMusicData("https://music.amazon.com/", {cookie_jar: amazon_jar});
        if("error" in client) throw `CLIENT ${client.error}`;
        test_cases_passed++;

        // const show_home = await Origin.AmazonMusic.getShowHomeData(client, "https://music.amazon.com/", {'client': client, cookie_jar: amazon_jar});
        // if("error" in show_home) throw `SHOW HOME ${show_home.error}`;
        // test_cases_passed++;

        // const all_playlists = await Origin.AmazonMusic.getAllPlaylistsFromAccount({client: client, cookie_jar: amazon_jar});
        // if("error" in all_playlists) throw `ALL PLAYLISTS ${all_playlists.error}`;
        // test_cases_passed++;

        // const playlist = await Origin.AmazonMusic.getPlaylist("https://music.amazon.com/my/playlists/a5dc1cff-2ccb-4e52-8144-d5adae28e33d", {client: client, cookie_jar: amazon_jar});
        // if("error" in playlist) throw `PLAYLIST ${playlist.error}`;
        // test_cases_passed++;

        // const album = await Origin.AmazonMusic.getPlaylist("https://music.amazon.com/albums/B0CKX9LZWV", {client: client, cookie_jar: amazon_jar});
        // if("error" in album) throw `ALBUM ${album.error}`;
        // test_cases_passed++;

        const search = await Origin.AmazonMusic.search("Tae Retro", {client: client, cookie_jar: amazon_jar});
        if("error" in search) throw `SEARCH ${search.error}`;
        console.log(JSON.stringify(search));
        test_cases_passed++;

    } catch (error) {
        console.log(error);
    } finally { return test_cases_passed; }
}

// test_youtube_music().then(result => { print_test("YouTube", result, 3); });
// test_youtube().then(result => { print_test("YouTube", result, 3); });
// test_spotify().then(result => { print_test("Spotify", result, 9); });
test_amazon_music().then(result => { print_test("Amazon Music", result, 6); });
