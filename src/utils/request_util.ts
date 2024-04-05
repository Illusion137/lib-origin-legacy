import axios from "axios"
import { CookieJar } from "./cookie_util";

namespace request {
    interface RequestOptions extends AxiosRequestOptions {
        cookie_jar: CookieJar
    }
    export async function get(url: string, config: {}){
        const response = axios.get(url, config);
        // Do stuff with cookies
        return response;
    }
}