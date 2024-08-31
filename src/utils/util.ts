export function decodeHex(hex: string) {
	return hex.replace(/\\x22/g, '"').replace(/\\x7b/g, '{').replace(/\\x7d/g, '}').replace(/\\x5b/g, '[').replace(/\\x5d/g, ']').replace(/\\x3b/g, ';').replace(/\\x3d/g, '=').replace(/\\x27/g, '\'').replace(/\\\\/g, 'doubleAntiSlash').replace(/\\/g, '').replace(/doubleAntiSlash/g, '\\')
}
export function generateNewUID(prefix_name: string) {
	return prefix_name.replace(/[^a-zA-Z0-9]/g,'') + '-' + new Date().getTime().toString(36).substring(2, 15) +
	Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) +
	Math.random().toString(36).substring(2, 15);
}
export function encodeParams(data: Record<string, any>){
	const encoded_params = [];
	for(const key of Object.keys(data)){
		const param = data[key];
		encoded_params.push(`${key}=${encodeURIComponent(typeof(param) === "object" ? JSON.stringify(param) : param )}`);
	}
	return encoded_params.join('&');
}
export function getMainKey(obj: object) { return Object.keys(obj)[0]; }
export function extractStringFromPattern(str: string, pattern: RegExp){
	const body_groups = pattern.exec(str);
	if(body_groups === null) return {"error": "Couldn't extract pattern from string, NULL found"} ;
	if(body_groups.length < 2) throw {"error": "Couldn't extract pattern from string"};
	const extracted = body_groups[1];
	return extracted;
}
export function parseTime(clock_time: string): number {
	let time = 0;
	const time_split = clock_time.split(":");
	for(let i = 0; i < time_split.length; i++){
		const parsed = parseInt(time_split[time_split.length - 1 - i]);
		if(i == 0) time += parsed;
		else time += parsed * Math.pow(60,i);
	}
	return time;
}
export function parseRuns(runs: ({text: string}[]) | undefined ): string {
    if(runs === undefined) return "";
    return runs.map(run => run.text).join(" ");
}
export function emptyUndefined(str: string){ return str === "" ? undefined : str; }
export function urlToId(url: string, ...remove_links: string[]){ 
    let id = url.replace("https://", "").replace("www.", "");
    for(const link of remove_links){ id = id.replace(link, ""); }
    return id;
}
export function makeTopic(name: string){ return `${name} - Topic`; }