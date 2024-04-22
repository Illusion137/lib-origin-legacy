export interface UserPlaylist {
    data: PlaylistData
    extensions: Extensions
}

interface PlaylistData {
    playlistV2: PlaylistV2
}

interface PlaylistV2 {
    __typename: string
    revisionId: string
    uri: string
    name: string
    description: string
    ownerV2: OwnerV2
    images: Images
    collaborative: boolean
    followers: number
    format: string
    attributes: any[]
    sharingInfo: SharingInfo
    content: Content
}

interface OwnerV2 {
    data: Data2
}

interface Data2 {
    __typename: string
    uri: string
    username: string
    name: string
    avatar: any
}

interface Images {
    items: Item[]
}

interface Item {
    extractedColors: ExtractedColors
    sources: Source[]
}

interface ExtractedColors {
    colorRaw: ColorRaw
}

interface ColorRaw {
    hex: string
    isFallback: boolean
}

interface Source {
    url: string
    width: number
    height: number
}

interface SharingInfo {
    shareUrl: string
}

interface Content {
    __typename: string
    totalCount: number
    pagingInfo: PagingInfo
    items: any[]
}

interface PagingInfo {
    offset: number
    limit: number
}

interface Extensions { }  