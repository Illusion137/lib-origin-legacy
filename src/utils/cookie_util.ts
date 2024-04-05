type ExpiredCookie = { "error": "expired" };

enum SameSiteEnum {
    "None",
    "Lax",
    "Strict"
}

interface CookieData {
    name: string,
    value: string,
    domain?: string,
    path?: string,
    expires?: Date,
    max_age?: number,
    same_site?: SameSiteEnum,
    http_only?: boolean,
    secure?: boolean,
}

/* ---- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie ----
Set-Cookie: <cookie-name>=<cookie-value>
Set-Cookie: <cookie-name>=<cookie-value>; Domain=<domain-value>
Set-Cookie: <cookie-name>=<cookie-value>; Expires=<date>
Set-Cookie: <cookie-name>=<cookie-value>; HttpOnly
Set-Cookie: <cookie-name>=<cookie-value>; Max-Age=<number>
Set-Cookie: <cookie-name>=<cookie-value>; Partitioned
Set-Cookie: <cookie-name>=<cookie-value>; Path=<path-value>
Set-Cookie: <cookie-name>=<cookie-value>; Secure

Set-Cookie: <cookie-name>=<cookie-value>; SameSite=Strict
Set-Cookie: <cookie-name>=<cookie-value>; SameSite=Lax
Set-Cookie: <cookie-name>=<cookie-value>; SameSite=None; Secure
*/
export class Cookie {
    #data: CookieData
    constructor(c: CookieData){
        this.#data = c;
    }
    hasExpired(): boolean { new Date().getTime() > this.this.#data.expires; }
    toString(): string { return `${this.#data.name}=${this.#data.value}`; }
    getData(): CookieData { return this.#data; }
    static fromString(cstring: string): Cookie {
        const attributes = cstring.split(';');
        const key_value = attributes[0].split('=');
        const expire_attr_index = attributes.findIndex(attr => attr.includes("Expires"));
        const domain_attr_index = attributes.findIndex(attr => attr.includes("Domain"));
        const path_attr_index = attributes.findIndex(attr => attr.includes("Path"));
        const maxage_attr_index = attributes.findIndex(attr => attr.includes("Max-Age"));
        const samesite_attr_index = attributes.findIndex(attr => attr.includes("SameSite"));

        const expires = expire_attr_index !== -1 ? new Date(attributes[expire_attr_index].split('=')[1]) : undefined;
        const domain = domain_attr_index !== -1 ? attributes[domain_attr_index].split('=')[1] : undefined;
        const path = path_attr_index !== -1 ? attributes[path_attr_index].split('=')[1] : undefined;
        const max_age = maxage_attr_index !== -1 ? parseInt(attributes[maxage_attr_index].split('=')[1]) : undefined;
        const same_site = samesite_attr_index !== -1 ? attributes[samesite_attr_index].split('=')[1] : undefined;
        const http_only = attributes.findIndex(attr => attr.includes("HttpOnly")) !== -1;
        const secure = attributes.findIndex(attr => attr.includes("Secure")) !== -1;
        
        return new Cookie({
            name: key_value[0],
            value: key_value[1],
            domain: domain,
            path: path,
            expires: expires,
            max_age: max_age,
            same_site: same_site,
            http_only: http_only,
            secure: secure,
        });
    }
}

export class CookieJar{
    #jar: Cookie[]
    constructor(j: Cookie[]){
        this.jar = j;
    }
    getCookies(): Cookie[] { 
        const non_expired_cookies = this.#jar.filter(cookie => !cookie.hasExpired());
        jar = non_expired_cookies;
        return this.#jar;
    }
    toString(): string { return this.getCookies().map(cookie => cookie.toString()); }
    merge(other_jar: CookieJar): void {
        const cookie_names = this.getCookies().map(cookie => cookie.getData().name); 
        for(const other_cookie of other_jar.getCookies()){
            if(cookie_names.includes(other_cookie.getData().name) && !other_cookie.hasExpired()){
                const jar_cookie_index = this.#jar.findIndex(cookie => cookie.getData.name = other_cookie.getData().name);
                jar[jar_cookie_index] = other_cookie;
            }
            else this.#jar.push(other_cookie);
        }
    }
    static fromString(jstring: string): CookieJar {
        const cstrings: string[] = jstring.split("; ");
        const jar: Cookie[] = cstrings.map(cstring => Cookie.fromString(cstring));
        return new CookieJar(jar.filter(cookie => !cookie.hasExpired()));
    }
}