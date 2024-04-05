import axios from "axios";
import { ResponseError } from "./utils/types";

namespace Proxy {
    export type Proxy = { ip: string; port: number };
    
    function getRandomIndex(max: number) {
        return Math.floor(Math.random() * (Math.floor(max) - 0) + 0); // The maximum is exclusive and the minimum is inclusive
    }

    export async function getProxyList(): Promise<Proxy[] | ResponseError>{
        try {
            const proxy_regex = /((\d+\.)+(\d+)):(\d+)/g
            const body = (await axios({'method': 'GET', 'url': "https://www.us-proxy.org/"})).data
        
            const matched_proxies = [...body.matchAll(proxy_regex)]
            const proxies: Proxy[] = [];
            for(let i = 0; i < matched_proxies.length; i++){
                proxies.push({
                    ip: matched_proxies[i][1],
                    port: parseInt(matched_proxies[i][4]),
                });
            }
            return proxies;
        } catch (error) { return { "error": String(error) }; }
    }
    export function getRandomProxy(proxies: Proxy[]){
        return proxies[getRandomIndex(proxies.length)];
    }
}