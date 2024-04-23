import axios from "axios";
import * as YouTube from "./youtube";
import ContinuationItem from "./types/ContinuationItem";

async function main(){
    const home = await YouTube.home();
    // console.log(home);
    const continuation = await YouTube.get_contents_continuation(
        home.contents.filter(content => content['continuation'] != undefined)[0]['continuation'] as ContinuationItem,
        home.config
        );
    console.log(continuation)
    
    // const search_tron = await YouTube.search("babytron 223");
    // console.log(search_tron);
}  
main();
