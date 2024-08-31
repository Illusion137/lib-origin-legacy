import { getMainKey, parseRuns } from "../utils/util";
import { ArtistResults_0, Content4, MusicCarouselShelfRenderer, MusicShelfRenderer } from "./types/ArtistResults_0";
import { ExploreResults_0 } from "./types/ExploreResults_0";
import { HomeResults_0 } from "./types/HomeResults_0";
import { LibraryResults_0, ParsedLibraryResults } from "./types/LibraryResults_0";
import { PlaylistResults_0, YouTubeMusicPlaylistTrack } from "./types/PlaylistResults_0";
import { SearchResults_0 } from "./types/SearchResults_0";
import { TabRenderer_0 } from "./types/TabRender_0";
import { InitialData } from "./types/types";

export function parseHomeContents(initial_data: InitialData[]){
    const contents: HomeResults_0[] = initial_data as unknown as HomeResults_0[];
    return {
        "contents": contents[1].contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents,
        "continuation": contents[1].contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.continuations[0].nextContinuationData
    }
}
export function parseExploreContents(initial_data: InitialData){
    const contents: ExploreResults_0 = initial_data as unknown as ExploreResults_0;
    return contents[1].contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.filter(item => item.musicCarouselShelfRenderer !== undefined);
}
export function parseLibraryContents(initial_data: InitialData){
    const contents: LibraryResults_0 = initial_data as unknown as LibraryResults_0;
    const playlists = contents.contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].gridRenderer.items.map(item => {
        if(item.musicTwoRowItemRenderer.navigationEndpoint.browseEndpoint === undefined) return undefined;
        return {
            "title": parseRuns(item.musicTwoRowItemRenderer.title.runs),
            "thumbnail_uri": item.musicTwoRowItemRenderer.thumbnailRenderer.musicThumbnailRenderer.thumbnail.thumbnails[0].url,
            "endpoint": item.musicTwoRowItemRenderer.navigationEndpoint.browseEndpoint.browseId.replace("VL", "")
        }
    })
    const filtered_playlists: ParsedLibraryResults[] = playlists.filter(playlist => playlist !== undefined) as unknown as ParsedLibraryResults[];
    return filtered_playlists;
}
export function parsePlaylistContents(initial_data: InitialData[]){
    const contents: PlaylistResults_0 = initial_data[1] as PlaylistResults_0;
    return {
        "tracks": contents.contents.twoColumnBrowseResultsRenderer.secondaryContents.sectionListRenderer.contents[0].musicShelfRenderer === undefined ?
            contents.contents.twoColumnBrowseResultsRenderer.secondaryContents.sectionListRenderer.contents[0].musicPlaylistShelfRenderer.contents.map(item => item.musicResponsiveListItemRenderer) as YouTubeMusicPlaylistTrack[] :
            contents.contents.twoColumnBrowseResultsRenderer.secondaryContents.sectionListRenderer.contents[0].musicShelfRenderer.contents.map(item => item.musicResponsiveListItemRenderer) as YouTubeMusicPlaylistTrack[],
        "playlist_data": contents.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].musicResponsiveHeaderRenderer,
        "continuation": contents.contents.twoColumnBrowseResultsRenderer.secondaryContents.sectionListRenderer.contents[0].musicPlaylistShelfRenderer !== undefined ? 
            contents.contents.twoColumnBrowseResultsRenderer.secondaryContents.sectionListRenderer.contents[0].musicPlaylistShelfRenderer.continuations === undefined ? null :
                contents.contents.twoColumnBrowseResultsRenderer.secondaryContents.sectionListRenderer.contents[0].musicPlaylistShelfRenderer.continuations : null
    }
}
export function parseArtistContents(initial_data: InitialData[]){
    const contents: ArtistResults_0 = initial_data as unknown as ArtistResults_0;
    return {
        "top_shelf": contents[1].contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.filter(item => item.musicShelfRenderer !== undefined)[0].musicShelfRenderer as MusicShelfRenderer,
        "shelfs": contents[1].contents.singleColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents.filter(item => item.musicCarouselShelfRenderer !== undefined).map(item => item.musicCarouselShelfRenderer) as MusicCarouselShelfRenderer[]
    }
}
export function parseSearchContents(initial_data: InitialData[]){
    const contents: SearchResults_0 = initial_data as unknown as SearchResults_0;
    return {
        "contents": contents[1].contents.tabbedSearchResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents,
        "mode_endpoints": contents[1].contents.tabbedSearchResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.header.chipCloudRenderer.chips.map(chip => {
                return {
                    "endpoint": chip.chipCloudChipRenderer.navigationEndpoint.searchEndpoint,
                    "id": chip.chipCloudChipRenderer.uniqueId
                }
        })
    };
}
function isNumeric(num: any){ return !isNaN(num) }
export function findAlbumYear(album: Content4): number {
    return parseInt(album.musicTwoRowItemRenderer.subtitle.runs.find(run => isNumeric(run.text))?.text ?? "0");
}
export function parseAlbumData(album: Content4) {
    return {
        "thumbnail_uri": album.musicTwoRowItemRenderer.thumbnailRenderer.musicThumbnailRenderer.thumbnail.thumbnails[0].url,
        "type": album.musicTwoRowItemRenderer.subtitle.runs.length === 3 ? album.musicTwoRowItemRenderer.subtitle.runs[0].text : "Unknown",
        "year": findAlbumYear(album),
        "id": album.musicTwoRowItemRenderer.navigationEndpoint.browseEndpoint?.browseId.replace("VL", '') as string
    }
}