import { getMainKey, parseRuns } from "../utils/util";
import { ArtistResults_0, Content4, MusicCarouselShelfRenderer, MusicShelfRenderer } from "./types/ArtistResults_0";
import { ExploreResults_0 } from "./types/ExploreResults_0";
import { HomeResults_0 } from "./types/HomeResults_0";
import { LibraryResults_0, ParsedLibraryResults } from "./types/LibraryResults_0";
import { PlaylistResults_0 } from "./types/PlaylistResults_0";
import { PlaylistResults_1 } from "./types/PlaylistResults_1";
import { SearchResults_0 } from "./types/SearchResults_0";
import { TabRenderer_0 } from "./types/TabRender_0";
import { InitialData } from "./types/types";

export function parseHomeContents(initial_data: InitialData){
    console.log(JSON.stringify(initial_data))
    const contents: HomeResults_0 = initial_data as unknown as HomeResults_0;
    return {
        // "contents": contents.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents,
        // "continuation": contents.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.continuations[0].nextContinuationData
    }
}
export function parseExploreContents(initial_data: InitialData){
    const contents: ExploreResults_0 = initial_data as unknown as ExploreResults_0;
    return contents[1].contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.filter(item => item.musicCarouselShelfRenderer !== undefined);
}
export function parseLibraryContents(initial_data: InitialData){
    const contents: LibraryResults_0 = initial_data as unknown as LibraryResults_0;
    const playlists = contents.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.richGridRenderer.contents.map(item => {
        return {
            "title": item.richItemRenderer.content.lockupViewModel.metadata.lockupMetadataViewModel.title.content,
            "thumbnail_uri": item.richItemRenderer.content.lockupViewModel.contentImage.collectionThumbnailViewModel.primaryThumbnail.thumbnailViewModel.image.sources[0].url,
            "endpoint": item.richItemRenderer.content.lockupViewModel.contentId
        }
    })
    return playlists;
}
export function parsePlaylistContents(initial_data: InitialData){
    const contents: PlaylistResults_0 = initial_data as unknown as PlaylistResults_0;
    const playlist_contents = contents.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents;
    const continuation_item = playlist_contents.find(item => item.continuationItemRenderer !== undefined);
    return {
        "tracks": playlist_contents.filter(item => item.playlistVideoRenderer !== undefined).map(item => item.playlistVideoRenderer),
        "playlist_data": contents.header.playlistHeaderRenderer,
        "continuation": continuation_item?.continuationItemRenderer ?? null
    }
}
export function parsePlaylistContinuationContents(initial_data: InitialData){
    const contents: PlaylistResults_1 = initial_data as unknown as PlaylistResults_1;
    const playlist_contents = contents.onResponseReceivedActions[0].appendContinuationItemsAction.continuationItems;
    const continuation_item = playlist_contents.find(item => item.continuationItemRenderer !== undefined);
    return {
        "tracks": playlist_contents.filter(item => item.playlistVideoRenderer !== undefined).map(item => item.playlistVideoRenderer),
        "continuation": continuation_item?.continuationItemRenderer ?? null
    }
}
export function parseArtistContents(initial_data: InitialData[]){
    const contents: ArtistResults_0 = initial_data as unknown as ArtistResults_0;
    return {
        "top_shelf": contents[1].contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.filter(item => item.musicShelfRenderer !== undefined)[0].musicShelfRenderer as MusicShelfRenderer,
        "shelfs": contents[1].contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.filter(item => item.musicCarouselShelfRenderer !== undefined).map(item => item.musicCarouselShelfRenderer) as MusicCarouselShelfRenderer[]
    }
}
export function parseSearchContents(initial_data: InitialData){
    const contents: SearchResults_0 = initial_data as unknown as SearchResults_0;
    return {
        "videos": contents.contents.sectionListRenderer.contents[0].itemSectionRenderer.contents.filter(item => item.videoWithContextRenderer !== undefined),
        "artists": contents.contents.sectionListRenderer.contents[0].itemSectionRenderer.contents.filter(item => item.compactChannelRenderer !== undefined),
        "playlists": contents.contents.sectionListRenderer.contents[0].itemSectionRenderer.contents.filter(item => item.compactPlaylistRenderer !== undefined),
    }
}