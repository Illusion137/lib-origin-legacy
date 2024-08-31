import assert from "../utils/assert";
import { ResponseError } from "../utils/types";
import { YTCFG } from "./types/YTCFG";
import { YTInitialData } from "./types/YTInitialData";

export function decode_hex(str: string) : string {
	return str.replace(/\\x22/g, '"').replace(/\\x7b/g, '{').replace(/\\x7d/g, '}').replace(/\\x5b/g, '[').replace(/\\x5d/g, ']').replace(/\\x3b/g, ';').replace(/\\x3d/g, '=').replace(/\\x27/g, '\'').replace(/\\\\/g, 'doubleAntiSlash').replace(/\\/g, '').replace(/doubleAntiSlash/g, '\\')
}
function extract_string_from_pattern(str: string, pattern: RegExp){
    const body_groups = pattern.exec(str);
    if(body_groups === null) throw "Couldn't extract pattern from string, NULL found";
    if(body_groups.length < 2) throw "Couldn't extract pattern from string";
    const extracted = body_groups[1];
    return extracted;
}

export function extract_yt_initial_data(page_html: string): YTInitialData|ResponseError {
    const yt_initial_data_regex = /ytInitialData ?= ?'?({.+?})'?;<\/script>/gs;
    try {
        return JSON.parse(extract_string_from_pattern(decode_hex(page_html), yt_initial_data_regex));
    } catch (error) {
        try {
            return JSON.parse(extract_string_from_pattern(page_html, yt_initial_data_regex));
        } catch (error) {
            return { 'error': String(error) };
        }
    }

}
export function extract_ytcfg(html: string) : YTCFG{
    const ytcfg_data_regex = /ytcfg.set\((\{.+?\})\);/gs;
    return JSON.parse(extract_string_from_pattern(html, ytcfg_data_regex));
}