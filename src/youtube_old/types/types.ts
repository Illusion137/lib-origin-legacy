import { Channel } from "./Channel";
import ContinuationItem from "./ContinuationItem";
import { Playlist } from "./Playlist";
import PostClientContext from "./PostClientContext";
import { UnivseralChannel } from "./UniversalChannel";

export type RunsText = { "text": string }[];
export interface Thumbnail{
    url: string,
    width: number,
    height: number
}
export interface Chip {
    text: string
    navigationEndPoint: ContinuationItem
}
export interface MiniYTCFG{
    api_key: string,
    client: PostClientContext
}
interface Author{
	name: string,
	canonical_base_url: string,
	thumbnails: Thumbnail[],
}
type CommentBadge = undefined | "pin" | "heart";
type CommentVoteStatus = undefined | "like" | "dislike";
type CommentReplies = undefined | { "replies": Comment[], "continuation": ContinuationItem };
export interface Comment{
	id: string,
    author: Author,
    replies_count: number
    replies: CommentReplies,
    content_text: string,
    badges: CommentBadge[],
    published_time_text: string,
    vote_count_text: string,
    vote_status: CommentVoteStatus,
}
interface CommentSectionHeader { 
    total_comments: number,
    top_comment_author_thumbnail: Thumbnail[]
    top_comment_text: string,
}
export interface CommentSection{
    header: CommentSectionHeader,
    comments: Comment[]
    continuation: ContinuationItem
}
export interface Video {
    video_id: string,
    title: string,
    author: Author,
    thumbnails: Thumbnail[],
    published_time_text?: string,
    views_count_text: string,
    duration_thumbnail_overlay_text: string,
    is_watched: boolean,
    start_time_seconds: number
}
export interface CompactVideo{}
export interface Short {
    video_id: string,
    headline: string,
    thumbnails: Thumbnail[],
    feedback_token: string
}
export interface ReelShelf{

}
export interface MiniAlbum {
    "title": string,
    "album_name": string,
    "thumbnail": Thumbnail[],
    "playlist_endpoint": string,
}
export type ContentItem={"video": Video} | 
                        {"reel_shelf": ReelShelf} | 
                        {"continuation": ContinuationItem} | 
                        {"channel": Channel } |
                        {"playlist": Playlist} |
                        {"mini_albums": MiniAlbum[]}|
                        {"univseral_channel": UnivseralChannel};