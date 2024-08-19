import { getMainKey } from "../utils/util";
import { Content2, MusicResponsiveListItemRenderer, PlaylistResults_0 } from "./types/PlaylistResults_0";
import { TabRenderer_0 } from "./types/TabRender_0";
import { InitialData } from "./types/types";

function TabRenderer(render: TabRenderer_0){
    return render.content.sectionListRenderer;
}
function innerTab(tab: any){ 
    switch(getMainKey(tab)){
        case "tabRenderer": return TabRenderer(tab[getMainKey(tab)]);
        default: throw `innerTab(): key '${getMainKey(tab)}' not found in contents`;
    }
}
function Tabs(tabs: any[]){
    const renders = [];
    for (const tab of tabs) {
        renders.push(innerTab(tab));
    }
    return renders;
}
function SingleColumnBrowseResultsRenderer(value: any){
    switch(getMainKey(value)){
        case "tabs": return Tabs(value[getMainKey(value)]);
        default: throw `singleColumnBrowseResultsRenderer(): key '${getMainKey(value)}' not found in contents`;
    }
}
function TwoColumnBrowseResultsRenderer(value: any){
    switch(getMainKey(value)){
        case "tabs": return Tabs(value[getMainKey(value)]);
        default: throw `twoColumnBrowseResultsRenderer(): key '${getMainKey(value)}' not found in contents`;
    }
}

export function parseHomeContents(initial_data: InitialData[]){
    const contents = initial_data[1].contents;
    switch (getMainKey(contents)) {
        case "singleColumnBrowseResultsRenderer": return SingleColumnBrowseResultsRenderer(contents[getMainKey(contents)]);
        default: throw `Home(): key '${getMainKey(contents)}' not found in contents`;
    }
}
export function parseExploreContents(initial_data: InitialData[]){
    const contents = initial_data[1].contents;
    switch (getMainKey(contents)) {
        case "singleColumnBrowseResultsRenderer": return SingleColumnBrowseResultsRenderer(contents[getMainKey(contents)]);
        default: throw `Explore(): key '${getMainKey(contents)}' not found in contents`;
    }
}
export function parseLibraryContents(initial_data: InitialData){
    const contents = initial_data.contents;
    switch (getMainKey(initial_data)) {
        case "singleColumnBrowseResultsRenderer": return SingleColumnBrowseResultsRenderer(contents[getMainKey(contents)]);
        default: throw `Library(): key '${getMainKey(initial_data)}' not found in contents`;
    }
}
export function parsePlaylistContents(initial_data: InitialData[]){
    const contents: PlaylistResults_0 = initial_data[1].contents.twoColumnBrowseResultsRenderer;
    return {
        tracks: contents.secondaryContents.sectionListRenderer.contents[0].musicShelfRenderer === undefined ?
            contents.secondaryContents.sectionListRenderer.contents[0].musicPlaylistShelfRenderer?.contents as Content2[] :
            contents.secondaryContents.sectionListRenderer.contents[0].musicShelfRenderer.contents as Content2[],
        playlist_data: contents.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].musicResponsiveHeaderRenderer
    }
}
export function parseArtistContents(initial_data: InitialData[]){
    const contents = initial_data[1].contents;
    switch (getMainKey(contents)) {
        default: throw `Artist(): key '${getMainKey(contents)}' not found in contents`;
    }
}
export function parseSearchContents(initial_data: InitialData[]){
    const contents = initial_data[1].contents;
    switch (getMainKey(contents)) {
        default: throw `Search(): key '${getMainKey(contents)}' not found in contents`;
    }
}