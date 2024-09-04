import { Alert } from "react-native";
import { isEmpty, removeSpecialChars } from "../../src/utils/util";
import { IllusiveThumbnail, Track } from "./types";

export function extract_file_extension(path: string){ return '.' + path.replace(/(.+\/)*.+?\./, ''); }
export function playlist_name_sql_friendly(playlist_name: string){ return playlist_name.replace(/\s/g, '_'); }
export function shuffle_array(array: any[]) {
    var m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}
export function duration_to_string(track_duration: number): {left: number, duration: string}{
    if(track_duration/3600 >= 1){
        const hours = Math.floor(track_duration / 3600);
        const minutes = Math.floor(track_duration % 3600 / 60);
        const seconds = Math.floor(track_duration % 3600 % 60);
        return {"left": 33, "duration": `${String(hours)}:${String(minutes).padStart(2,'0')}':'${String(seconds).padStart(2,'0')}`};
    } 
    else if(track_duration / 60 >= 1){
        const minutes = Math.floor(track_duration / 60);
        const seconds = Math.floor(track_duration % 60);
        return {"left": 46, "duration": `${String(minutes)}':'${String(seconds).padStart(2,'0')}`}
    }
    else return {'left': 58, 'duration': String(track_duration).padStart(2,'0')};
}
export function best_thumbnail(thumbnails: IllusiveThumbnail[]){
    type Max = {"index": number, "value": number};
    let best: Max = {"index": 0, "value": 0};
    for(let i = 0; i < thumbnails.length; i++){
        const dimension = thumbnails[i].width * thumbnails[i].height;
        const current: Max = {"index": i, "value": dimension};
        if(current.value > best.value) best = current;
    }
    return thumbnails[best.index];
}
export function track_section_map(tracks: Track[]): { "char_data": string[], "section_map": Track[][] }{
    const sections_map = new Map<string, Track[]>();
    for(const track of tracks){
        let char = track.title[0].toUpperCase();
        if(!(/[A-Z]/).test(char)) char = '#';
        if( !sections_map.has(char) ) {
            sections_map.set(char, [track])
        }
        else {
            const new_tracks = sections_map.get(char)!;
            new_tracks.push(track)
            sections_map.set(char, new_tracks)
        }
    }
    const sections = []
    const section_chars = []
    const sorted_sections_map = [...sections_map].sort()
    for(const value of sorted_sections_map){ 
        sections.push( value[1] )
        section_chars.push(value[0])
    }
    return {"char_data": section_chars, "section_map": [...sections]};
}
export function track_query_filter(tracks: Track[], query: string){
    if(isEmpty(query))
        return tracks.filter(track => (track.artists[0].toUpperCase().includes(query.toUpperCase()) || removeSpecialChars(track.title.toUpperCase()).includes(removeSpecialChars(query).toUpperCase())))
    return tracks;
}
export function cycle(value: string, values: string[]){
    const value_index = values.findIndex(item => item === value);
    if(value_index === values.length - 1) return values[0];
    return values[value_index + 1];
}
export function character_count(haystack: string, needle: string){
    let count = 0;
    for(const char of haystack) if(char === needle) count++;
    return count;
}
export async function if_confirm(title: string, msg: string, on_press: () => Promise<void>|void){
    Alert.alert(title, msg, [
        {"text": "Cancel", "onPress": () => {}},
        {"text": "OK", "onPress": on_press }
    ])
}
export function time_to_timestamp(time_seconds: number): string{
    const time_ms = Math.floor(time_seconds * 1000);
    const time_min = Math.floor(time_ms / 60000);
    const time_sec = Math.floor((time_ms - time_min * 60000) / 1000);
    
    return String(time_min).padStart(2, '0') + ':' + String(time_sec).padStart(2, '0');
}
export function path_to_directory(path: string){ return path.split("/").slice(0,-1).join("/"); }