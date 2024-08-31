import PostClientContext from "./types/PostClientContext";
import { MiniYTCFG } from "./types/types";
import { YTCFG } from "./types/YTCFG";

function get_client_from_ytcfg(ytcfg: YTCFG) { return ytcfg.INNERTUBE_CONTEXT; }
function get_api_key_from_ytcfg(ytcfg: YTCFG) : string{ return ytcfg.INNERTUBE_API_KEY; }

export function ytcfg_mini(ytcfg: YTCFG): MiniYTCFG{
    return {
        "api_key": get_api_key_from_ytcfg(ytcfg),
        "client": get_client_from_ytcfg(ytcfg) as PostClientContext
    }
}