import { Illusive } from './Illusive/src/illusive';
import * as Origin from './index';
import { SoundCloud } from './src/soundcloud/soundcloud';
import { CookieJar } from './src/utils/cookie_util';

function print_test(service: string, test_cases_passed: number, max_cases: number) { console.log(`[TEST]: ${service.toUpperCase()}: ${test_cases_passed}/${max_cases} TEST CASES PASSED`); }

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

        const playlist = await Origin.YouTubeMusic.getPlaylist({ 'cookie_jar': youtube_music_jar }, "PLnIB0XeUqT-gz0py9BSZzao0XB2rHvVqN");
        if ("error" in playlist) throw playlist.error;
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

// async function test_youtube(): Promise<number> {
//     let test_cases_passed = 0;
//     try {
//         const youtube_jar: CookieJar = CookieJar.fromString("LOGIN_INFO=AFmmF2swRgIhAPAE2AvZs9i14-0io3aV6l6GYLKJ3s1OZyF6bAMoZN_LAiEAhJjLgeOQKw-yIIZvxOCHiVtvtwUGdsv3OReYnKQuBc8:QUQ3MjNmeGpTY0JLU3dNTGdsQk1EMGNrbjdNZURaNm54eXRPNDZRWWJ0amVfNTBPOW54Y2ZoWFRkV3k2dE1hMS1pTEVNVURYWTdsN1dBMWJvelNtaDlUcEkyZW45TzZMM3dVOU1LVHZIVjNLd1ZXWjY0cW9JNVdmVVBKMFctNFBhcVJQRGJtZkFQRlNlU2Z0aFozS3ZFSnVKeS1oSUdqWEVn; VISITOR_INFO1_LIVE=UUk1Gsb1xuQ; VISITOR_PRIVACY_METADATA=CgJVUxIEGgAgWw%3D%3D; YSC=pm0ZRNZ5lYo; HSID=AB5qLZJa0T4nRJowq; SSID=Asez0J9MQmLVdA2_C; APISID=zISs220n3joeFbGv/AH8YQYR8MYNX8zZDx; SAPISID=MAdwqY07mdF0BdZv/AKQgcmwWaBvau7Qci; __Secure-1PAPISID=MAdwqY07mdF0BdZv/AKQgcmwWaBvau7Qci; __Secure-3PAPISID=MAdwqY07mdF0BdZv/AKQgcmwWaBvau7Qci; SID=g.a000lQgdkJt9j3Ds0sqJiwdVSnrPfvse1aP4MA_l0zyyDLHfz-ciurJzhP2khGB1i7fwxO_CmwACgYKAbwSARQSFQHGX2MiotcRrPmUW0z7TI_hXen9SxoVAUF8yKpWN2ylzdo6IM6LjtNlRD8J0076; __Secure-1PSID=g.a000lQgdkJt9j3Ds0sqJiwdVSnrPfvse1aP4MA_l0zyyDLHfz-cirwjVTjWw4Fh6IS1ZFy0vNAACgYKAbASARQSFQHGX2Mi_PJY9RPvXVAO-Eq7mPO-SRoVAUF8yKquoFgLI4pEiIA12pj9bABh0076; __Secure-3PSID=g.a000lQgdkJt9j3Ds0sqJiwdVSnrPfvse1aP4MA_l0zyyDLHfz-cibwECqZGo2aqfILuR1PA0EwACgYKAXYSARQSFQHGX2MiJpsGg6BQyyM-7rkYFJG-oRoVAUF8yKpIb2lX1HnJP1F9dR6SkGDw0076; PREF=f6=40000080&f7=4100&tz=America.Los_Angeles&volume=15&autoplay=true&guide_collapsed=false&repeat=NONE; __Secure-1PSIDTS=sidts-CjEB4E2dkVUk3QrUjIgenhIWZmeYtDlD3d2ncMRH3Rt8yMXJ7bog68SLnSks4XzMXgYKEAA; __Secure-3PSIDTS=sidts-CjEB4E2dkVUk3QrUjIgenhIWZmeYtDlD3d2ncMRH3Rt8yMXJ7bog68SLnSks4XzMXgYKEAA; SIDCC=AKEyXzWI3V-j90py4cp7FBtjn8dUUkp6JsW6wXRHeDYmPLC4KBQfVtEizwaFCZdpDMshfzeEQjX9; __Secure-1PSIDCC=AKEyXzUMX-CxASilSYdingd2wXt0yvoNoAHPL890vMxRm7MS_OvfzPq4aLMEFOWEkRTTQeYpC0gP; __Secure-3PSIDCC=AKEyXzWtvMnvOrz73jnbiBm8t2LHIs2KCIx4fq2qW6BrCNkeuNdtbmy3YcI7H0xmbzvJHJBgCic");
//         const home = await Origin.YouTube.home();
//         console.log(home);
//         test_cases_passed++;

//         // Origin.YouTube.getContentsContinuation(, home.config)
//         // const ytsr = await Origin.YouTube.search("Seycara");
//         // console.log(ytsr);
//         // test_cases_passed++;


//         // const client = await Origin.Spotify.getClient("https://open.spotify.com/playlist/4uNs2lqeO0Ec43d2Sp3yp4", spotify_jar);
//         // if("error" in client) throw `CLIENT ${client.error}`;
//     } catch(error) {
//         console.log(error);
//     }
//     finally { return test_cases_passed; }
// }

async function test_spotify(): Promise<number> {
    let test_cases_passed = 0;
    try {
        const spotify_jar: CookieJar = CookieJar.fromString("sp_t=2f24af0a2720dede2f9e4c5a411e2d72; sp_dc=AQCEY1FNzVTOTSTDeOQsPzVGErTmPmvvhL6F521K8GVvAsAad-PsfUDfU5SyAM6q6UmSLIJPl8JaR-17XBydo8yeQIRZutfnRBYp0F6Zdby9Jci7cu_fz31fR7yzaAIm4yJjOBIHGVO_uWt54AOUZX6xZkoJM5gwPklPtwmgB8gUCqecxR5OEaUg9F6haNFhfIouBjuZmFKwk3k7l4bJM6wa00g; sp_key=51241d93-e3f2-493e-b975-3ba89b6c0dba; sp_landing=https%3A%2F%2Fwww.spotify.com%2Fapi%2Fmasthead%2Fv1%2Fmasthead; sp_landingref=https%3A%2F%2Fopen.spotify.com%2F; OptanonConsent=isGpcEnabled=0&datestamp=Sun+Apr+21+2024+19%3A37%3A33+GMT-0700+(Pacific+Daylight+Time)&version=202309.1.0&browserGpcFlag=0&isIABGlobal=false&hosts=&landingPath=NotLandingPage&groups=BG169%3A1%2Ct00%3A1%2Ci00%3A1%2CBG170%3A1%2Cs00%3A1%2Cf00%3A1%2Cm00%3A1%2Cf11%3A1&AwaitingReconsent=false");

        const client = await Origin.Spotify.getClient("https://open.spotify.com/playlist/4uNs2lqeO0Ec43d2Sp3yp4", spotify_jar);
        if ("error" in client) throw `CLIENT ${client.error}`;
        test_cases_passed++;

        const credits = await Origin.Spotify.getCredits({ uri_id: "1vwXV3TcLEv101yuMaAXQF", client: client, cookie_jar: spotify_jar });
        if ("error" in credits) throw `CREDITS ${credits.error}`;
        test_cases_passed++;

        const playlist = await Origin.Spotify.getPlaylist("https://open.spotify.com/playlist/4uNs2lqeO0Ec43d2Sp3yp4", { client: client, cookie_jar: spotify_jar });
        if ("error" in playlist) throw `PLAYLIST ${playlist.error}`;
        test_cases_passed++;

        const album = await Origin.Spotify.getAlbum("https://open.spotify.com/album/7zezk3hbEWlOooKBLuLJKp", { client: client, cookie_jar: spotify_jar });
        if ("error" in album) throw `ALBUM ${album.error}`;
        test_cases_passed++;

        const profile = await Origin.Spotify.getProfileAccountAttributes({ client: client, cookie_jar: spotify_jar });
        if ("error" in profile) throw `PROFILE ${profile.error}`;
        test_cases_passed++;

        const collection = await Origin.Spotify.getCollection({client: client, cookie_jar: spotify_jar });
        if ("error" in collection) throw `COLLECTION ${collection.error}`;
        test_cases_passed++;

        const sp_t_cookie = spotify_jar.getCookies().filter(cookie => cookie.toString().includes("sp_t="))[0];
        if (sp_t_cookie === undefined) throw "Unable to find 'sp_t' Cookie";
        const home = await Origin.Spotify.getHome({ sp_t_cookie: sp_t_cookie, client: client, cookie_jar: spotify_jar });
        if ("error" in home) throw `HOME ${home.error}`;
        test_cases_passed++;

        const all_playlists = await Origin.Spotify.getAllPlaylistsFromAccount({ client: client, cookie_jar: spotify_jar });
        if ("error" in all_playlists) throw `ALL_PLAYLISTS ${all_playlists.error}`;
        test_cases_passed++;

        const search = await Origin.Spotify.search("Seycara", { client: client, cookie_jar: spotify_jar });
        if ("error" in search) throw `SEARCH ${search.error}`;
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
        const client = await Origin.AmazonMusic.getAmznMusicData("https://music.amazon.com/", { cookie_jar: amazon_jar });
        if ("error" in client) throw `CLIENT ${client.error}`;
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

        const search = await Origin.AmazonMusic.search("Tae Retro", { client: client, cookie_jar: amazon_jar });
        if ("error" in search) throw `SEARCH ${search.error}`;
        console.log(JSON.stringify(search));
        test_cases_passed++;

    } catch (error) {
        console.log(error);
    } finally { return test_cases_passed; }
}

// test_youtube_music().then(result => { print_test("YouTube", result, 3); });
// test_youtube().then(result => { print_test("YouTube", result, 3); });
// test_spotify().then(result => { print_test("Spotify", result, 9); });
// test_amazon_music().then(result => { print_test("Amazon Music", result, 6); });


async function bar() {
    // const youtube_music_jar = CookieJar.fromString('LOGIN_INFO=AFmmF2swRgIhAPAE2AvZs9i14-0io3aV6l6GYLKJ3s1OZyF6bAMoZN_LAiEAhJjLgeOQKw-yIIZvxOCHiVtvtwUGdsv3OReYnKQuBc8:QUQ3MjNmeGpTY0JLU3dNTGdsQk1EMGNrbjdNZURaNm54eXRPNDZRWWJ0amVfNTBPOW54Y2ZoWFRkV3k2dE1hMS1pTEVNVURYWTdsN1dBMWJvelNtaDlUcEkyZW45TzZMM3dVOU1LVHZIVjNLd1ZXWjY0cW9JNVdmVVBKMFctNFBhcVJQRGJtZkFQRlNlU2Z0aFozS3ZFSnVKeS1oSUdqWEVn; VISITOR_INFO1_LIVE=UUk1Gsb1xuQ; VISITOR_PRIVACY_METADATA=CgJVUxIEGgAgWw%3D%3D; YSC=eO4a5GbzAI8; YT_CL={"loctok":"ACih6ZM8o74g3uY_uUfTJWHEam630R44FNX-OwegdPPGYtugd1QSXb16CU8geg9NRMdkd5ATsr0szhnFzWXuSbDnv3i96VQ0X4M"}; SID=g.a000nQgdkMLILopTdn4KqiaQjlS3khlPoirTiiu4_fJ6Qb4mXMgQMI9nzqrVWirvIHwbfZ2psQACgYKAd0SARQSFQHGX2MimN4TeBSEzNaHqlgs1EZjUxoVAUF8yKqzh-CvyLTE5WicYgSkzhhd0076; __Secure-1PSID=g.a000nQgdkMLILopTdn4KqiaQjlS3khlPoirTiiu4_fJ6Qb4mXMgQxViKepphDQafD5O4ijwnswACgYKAfkSARQSFQHGX2Mi-MpVdZk_MmXApiWWiSHbGRoVAUF8yKoN5Fn5yXi6tXYWoTjeUh0_0076; __Secure-3PSID=g.a000nQgdkMLILopTdn4KqiaQjlS3khlPoirTiiu4_fJ6Qb4mXMgQPu71QER1mLxYTW_sROqsuwACgYKARISARQSFQHGX2MiZK_dj1l0tQa7S5pZkGqZ-BoVAUF8yKrWoVaaFa4WME9V11MCGPDi0076; HSID=AzeqlqcogbSYVZDhz; SSID=Al1VDXgHynjzDrBd4; APISID=vFBq6hJlSMO1aKGh/AMbYu1l2tm-3ay1n1; SAPISID=DF9Uj_zwUIFKrTio/AQ0IlUmf6H6YuP_fs; __Secure-1PAPISID=DF9Uj_zwUIFKrTio/AQ0IlUmf6H6YuP_fs; __Secure-3PAPISID=DF9Uj_zwUIFKrTio/AQ0IlUmf6H6YuP_fs; PREF=f6=40000080&f7=4100&tz=America.Los_Angeles&volume=4&autoplay=true&guide_collapsed=false&repeat=NONE; __Secure-1PSIDTS=sidts-CjEBUFGoh5EUIhHkOdquwQ74HjKQITT1pNzaJLEPxwiuzY-EzazFPxcIHUZ0YVZVz_vwEAA; __Secure-3PSIDTS=sidts-CjEBUFGoh5EUIhHkOdquwQ74HjKQITT1pNzaJLEPxwiuzY-EzazFPxcIHUZ0YVZVz_vwEAA; SIDCC=AKEyXzVd2bRrO05OyUHi0YUvjnnC87CrQxUt9cDeD5jowBB-haOOkfPVTz04LC6hY3tnvPeUtfyV; __Secure-1PSIDCC=AKEyXzVutAPRVoM9NXr-25sYw1BgKHYS60X6GBFGQRI10ijVThsq-nP_esSiT3EZs5mrt0LWBqWD; __Secure-3PSIDCC=AKEyXzUphNsFab2lmcAVhHk5y2EoqsmBy_2UbI0rBVf_FHOxpXpzVNO_hv6N6pkDUeElqREz2tY');
    // const youtube_jar: CookieJar = CookieJar.fromString('VISITOR_INFO1_LIVE=UUk1Gsb1xuQ; VISITOR_PRIVACY_METADATA=CgJVUxIEGgAgWw%3D%3D; YSC=eO4a5GbzAI8; YT_CL={"loctok":"ACih6ZM8o74g3uY_uUfTJWHEam630R44FNX-OwegdPPGYtugd1QSXb16CU8geg9NRMdkd5ATsr0szhnFzWXuSbDnv3i96VQ0X4M"}; SID=g.a000nQgdkMLILopTdn4KqiaQjlS3khlPoirTiiu4_fJ6Qb4mXMgQMI9nzqrVWirvIHwbfZ2psQACgYKAd0SARQSFQHGX2MimN4TeBSEzNaHqlgs1EZjUxoVAUF8yKqzh-CvyLTE5WicYgSkzhhd0076; __Secure-1PSID=g.a000nQgdkMLILopTdn4KqiaQjlS3khlPoirTiiu4_fJ6Qb4mXMgQxViKepphDQafD5O4ijwnswACgYKAfkSARQSFQHGX2Mi-MpVdZk_MmXApiWWiSHbGRoVAUF8yKoN5Fn5yXi6tXYWoTjeUh0_0076; __Secure-3PSID=g.a000nQgdkMLILopTdn4KqiaQjlS3khlPoirTiiu4_fJ6Qb4mXMgQPu71QER1mLxYTW_sROqsuwACgYKARISARQSFQHGX2MiZK_dj1l0tQa7S5pZkGqZ-BoVAUF8yKrWoVaaFa4WME9V11MCGPDi0076; HSID=AzeqlqcogbSYVZDhz; SSID=Al1VDXgHynjzDrBd4; APISID=vFBq6hJlSMO1aKGh/AMbYu1l2tm-3ay1n1; SAPISID=DF9Uj_zwUIFKrTio/AQ0IlUmf6H6YuP_fs; __Secure-1PAPISID=DF9Uj_zwUIFKrTio/AQ0IlUmf6H6YuP_fs; __Secure-3PAPISID=DF9Uj_zwUIFKrTio/AQ0IlUmf6H6YuP_fs; PREF=f6=40000000&volume=4&f7=4100&tz=America.Los_Angeles&guide_collapsed=false&repeat=NONE&autoplay=true; __Secure-1PSIDTS=sidts-CjEBUFGohxfYoANvLZenIflwXpMN0KpyOYa6skGk2XWtO_VQfH227raNIrYVDfZneHECEAA; __Secure-3PSIDTS=sidts-CjEBUFGohxfYoANvLZenIflwXpMN0KpyOYa6skGk2XWtO_VQfH227raNIrYVDfZneHECEAA; ST-uwicob=session_logininfo=AFmmF2swRAIgCkCFu3Zy4uG5fKBhXikentTaRK5qplG_cz3xppccm-UCIAPRKYx2t33mBOaXU0JDo6hg7iPTZSKLOjtHK1WUwgre%3AQUQ3MjNmeTVEeEtaOTFXRzVsa3pZZ3VSSWc2MTNFZTJ4NWRMd2Z5N2dNOG1XVXd6UVJzZFNnQjN5WXlpWlJaeGpZVVB0aEhEQUc0N3JwWlJYQmJJak83RklxVnpMcUh3R0VnNVJhanVFUWlQa0s4V1lveHdSQkRPeEh4eHJYUkI3eWFsQ1gtVVFQSTJCR29UZ2hXbWRRc2FtcHVPYUYzV093; ST-1d9jt3w=session_logininfo=AFmmF2swRAIgCkCFu3Zy4uG5fKBhXikentTaRK5qplG_cz3xppccm-UCIAPRKYx2t33mBOaXU0JDo6hg7iPTZSKLOjtHK1WUwgre%3AQUQ3MjNmeTVEeEtaOTFXRzVsa3pZZ3VSSWc2MTNFZTJ4NWRMd2Z5N2dNOG1XVXd6UVJzZFNnQjN5WXlpWlJaeGpZVVB0aEhEQUc0N3JwWlJYQmJJak83RklxVnpMcUh3R0VnNVJhanVFUWlQa0s4V1lveHdSQkRPeEh4eHJYUkI3eWFsQ1gtVVFQSTJCR29UZ2hXbWRRc2FtcHVPYUYzV093; LOGIN_INFO=AFmmF2swRgIhAJEqcE8tcKqyKlGxPyzyf_cm8VJ71dRgRI5TCvboUwykAiEAuPVvAnk05LHeBe69_N4QVN0Om5Iq4gN-l9EVQvm85EI:QUQ3MjNmeGlWX3c2dXJNdm9EY3V6S3BqOE5IaUFQblVlbTJXdFlKVWVPSXhJbnhJdGlQSE9LeU9uNnhGRHprSTZ3Y2J6M015b2Rrd1ZWWEtYeS1DdWNCODRIcHBaVExHSWlEV0JuSFdIeGR3Xy1feFBJc2ljLUVzS3JyNnZzMXg3YWlKRVQ1TGZEYUF0MUxHMEVUV0ZVV1dJNjAwcXRsX2FR; SIDCC=AKEyXzXnPsGL97WDNIytKrqfxs-GIaPCm3ziUG1BswBzqFCQ3YSuzJvh_Y-VV6Z_5AS_RxMz51MY; __Secure-1PSIDCC=AKEyXzVRb1x7tmZCHvtZzttRQGb3ALw0xpTT3dUwNjObEAHry1flCQKmsZ2EOotmSaZLHKKoxiPj; __Secure-3PSIDCC=AKEyXzXrr2UD8eAhjEx_TYoY8y_-qJ7N0NMm1T_h3i-oZnXo6Mkr-NyuueWIE_cG2Tl6FJxSWP8');
    // const apple_music_jar: CookieJar = CookieJar.fromString('dslang=US-EN; geo=US; s_cc=true; site=USA; dc=pv; itctx=eyJjcCI6ImZiYjFkYmY1LWE3ODAtNGY4Ni1hNzQ4LTU4MmNmMWRjYmNmZSIsImRzIjoxNzQzNTgwMDc5NCwiZXgiOiIyMDI0LTgtMTkgNToxODo0MyJ9|2hcgma3466ei0t368304641vsp|_fNRPH8APD2IUbTye2w43-XnOPo; itcdq=0; at_check=true; dssid2=b7375b79-fd2c-49bc-9240-b80652441944; dssf=1; as_sfa=Mnx1c3x1c3x8ZW5fVVN8Y29uc3VtZXJ8aW50ZXJuZXR8MHwwfDE; pxro=1; as_cn=~QIHf8WyhDKjEcao2H60r3g-Yaongoc1gOTToUYFe1gI=; as_rumid=250c84cc-8a05-4635-afdf-0b029f5d4fba; as_disa=AAAjAAABIUiSDPVWNrgdFbpZKFwb7GJglsi8txXxbmzYFkaRIACfBGU-FH1muZ9fDokDBAYiAAIB1TvaneWhVg6FAYDSvIVb34aL7p6a6Xj2QdRtaF3FnVg=; as_rec=d5f7a212af450e51df223271f30ef8bddac45a01b8bae3cbd8a568581560b191b4320b6bfdfe5a9ecde6d728613453152c00bbad2e083dc6f997035944ab92d4ed0068d0798e267a81f27d9a2d6239a8; acn01=hhcxkK++vbpUbmGRIx7B2VPDbe7RGcMBNmMN/yQAKh8eBwUy9g==; as_pcts=QbG7ye7eRvEoJyAYibhh+9b+Dw+zI7gf5X4wUx08BCXa7pWo3RJ24psaLlZixG6nGBKsPCr4QlWIJLvhApmz4M7gfLHYOlEvk+9UNNgJBk3_mWB2AP_m5J6VTtPZ7B+BRUnhX74wZ-r3rfZU0tYvyRKB3VG:FFAqf_CB6k4Q9lbJgrLEM8h0:g; as_ltn_us=AAQEAMMBYlLzmYt60OoltZpbzYjT7YGR7RqL3Mx-turM-705KFiMarBxBVDj4ULggLnRjbxTiCwxCUKyYdpKT_sFlC8hQ7qx9vg; s_sq=applestoreww%3D%2526c.%2526a.%2526activitymap.%2526page%253DAOS%25253A%252520orders%25252Forder_detail%2526link%253Ddetails%252520of%252520your%252520order.order%252520number%25253Awx%252520%252528inner%252520text%252529%252520%25257C%252520no%252520href%252520%25257C%252520body%2526region%253Dbody%2526pageIDType%253D1%2526.activitymap%2526.a%2526.c; pt-dm=v1~x~kmha58eq~m~3~n~AOS%3A%20orders%2Forder_detail~r~aos%3Aaccount; myacinfo=DAWTKNV323952cf8084a204fb20ab2508441a07d02d351172682a66369bf0ab70b0264f983b8756d2c78e9118b6202179d7e14723a545840d0ee481ad763d2a999246efeaf72f5cb57d0349ad12b662dd121b8e1d579a51dd43b9840c959e072e55fd8f4d20f90a959996ee2fbbaf46802d8718a1597b16685684290cbe903ec63f3a55e21d32c5dbfe5b111cd36bfda66cd74c475ae55571913dda5c0ca5764ca817ed48fe5af7da8bef20533d9bb3d2ecd75900f66c32eab0186310a1d63e2085775e8dd32c130e8744684f431e5c6ce1eb49b523957a69a9e03167a2d90438ff881192f34edbef36bd34654f87a6559c0852c4c1bcad38dc076c3c1d01c5e340260f4f5f6db7e2813fea4f8534413d39c59b7dcbb2f447fd0b24c95607973510eceba53ca9f0b31342176fd63a933841e4f39587f712a4da0d8e6ea902d010072be685a8f9f48726e491ab298aac65dc434b3b3c1bbea3e436511f271625a7ae59f23315e2b18c7db4fe83bfe59cd154791bfee688865c51aab4a947ebee1aa9da3a3bf60569f3530049426413094c4b8f9b7743abc28a47db1159746654d82d98181bac8c0e36e2a98feb1081760002aeacd6e5d278d13a9f151e93944473656730582dfe870b9ca403766f72910e3d3652f7c70f4ed14efe4ef9d1e43b23628b7069f782828b488b922f3375867e919aeb6d6541599705d1f5b9d3604a03c0b8c0723da90728f8101f00440632d4bdea179f436a695e05be7685ee216424c880371553184be92b2477d514bb912bb2cade3cec92a237c8629eba627eadee1b86cb32bac80801c61cc3f62f92d8aa3f3900f443830bd051a438bff796156df250cb68bc9898d04a13cf303cae96c29ab4de139d185aca797a10149d450957b1449137ab0585a47V3; itspod=17; itspod=17; media-user-token=Al+/yrlYgELCLAB9R/yw00fOWywyyvZbaIKVO9jPj/5FhhihDMsOxLjyOIw30Ve2NlM4sWFz4iI/bpAGPaVKIPaDLQ1Zjp3OV8A1a3jUoSYO4YzfJ7VZpdWqcIjVImieQoDyZWNr8ehkB4OUIUb3vuHfWugJFNWk3KZcvq6RT/cSnX+SggXMrEzMeCFtGpweYSrlN5TRHH/ZUGAiDcbyMbAvW1chLSRkMk+pWUQvf6L5+WOvAw==; itua=US; pltvcid=474a12042bad4c609045bde93bab1a34017; pldfltcid=da7bdfe24d2e41e4b0498d0c5b650d16017; mut-refresh=1; itre=0');
    // console.log(await Origin.AppleMusic.getPlaylist("library/playlist/p.7Pkeq4PcVPLK7Ae", {"cookie_jar": apple_music_jar}));
    // const illusive = Illusive.music_service.get("Apple Music")?.get_playlist("library/playlist/p.7Pkeq4PcVPLK7Ae");
    // console.log(await Origin.AppleMusic.getAllPlaylistsFromAccount({"cookie_jar": apple_music_jar}));
    // console.log(await Origin.AppleMusic.getPlaylist("https://music.apple.com/us/playlist/r-bish/pl.u-d2b05g0TL356Jvz", {"cookie_jar": apple_music_jar}))
}
bar();