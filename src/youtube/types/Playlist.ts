export interface Playlist {
    playlistId: string
    thumbnail: Thumbnail
    title: Title
    shortBylineText: ShortBylineText
    videoCountText: VideoCountText
    navigationEndpoint: NavigationEndpoint2
    videoCountShortText: VideoCountShortText
    trackingParams: string
    sidebarThumbnails: SidebarThumbnail[]
    thumbnailText: ThumbnailText
    ownerBadges: OwnerBadge[]
    shareUrl: string
    thumbnailRenderer: ThumbnailRenderer
    longBylineText: LongBylineText
    thumbnailOverlays: ThumbnailOverlay[]
    channelThumbnail: ChannelThumbnail
}

interface Thumbnail {
    thumbnails: Thumbnail2[]
    sampledThumbnailColor: SampledThumbnailColor
    darkColorPalette: DarkColorPalette
    vibrantColorPalette: VibrantColorPalette
}

interface Thumbnail2 {
    url: string
    width: number
    height: number
}

interface SampledThumbnailColor {
    red: number
    green: number
    blue: number
}

interface DarkColorPalette {
    section2Color: number
    iconInactiveColor: number
    iconDisabledColor: number
}

interface VibrantColorPalette {
    iconInactiveColor: number
}

interface Title {
    runs: Run[]
}

interface Run {
    text: string
}

interface ShortBylineText {
    runs: Run2[]
}

interface Run2 {
    text: string
    navigationEndpoint?: NavigationEndpoint
}

interface NavigationEndpoint {
    clickTrackingParams: string
    commandMetadata: CommandMetadata
    browseEndpoint: BrowseEndpoint
}

interface CommandMetadata {
    webCommandMetadata: WebCommandMetadata
}

interface WebCommandMetadata {
    url: string
    webPageType: string
    rootVe: number
    apiUrl: string
}

interface BrowseEndpoint {
    browseId: string
    canonicalBaseUrl: string
}

interface VideoCountText {
    runs: Run3[]
}

interface Run3 {
    text: string
}

interface NavigationEndpoint2 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata2
    browseEndpoint: BrowseEndpoint2
}

interface CommandMetadata2 {
    webCommandMetadata: WebCommandMetadata2
}

interface WebCommandMetadata2 {
    url: string
    webPageType: string
    rootVe: number
    apiUrl: string
}

interface BrowseEndpoint2 {
    browseId: string
}

interface VideoCountShortText {
    runs: Run4[]
}

interface Run4 {
    text: string
}

interface SidebarThumbnail {
    thumbnails: Thumbnail3[]
}

interface Thumbnail3 {
    url: string
    width: number
    height: number
}

interface ThumbnailText {
    runs: Run5[]
}

interface Run5 {
    text: string
    bold?: boolean
}

interface OwnerBadge {
    metadataBadgeRenderer: MetadataBadgeRenderer
}

interface MetadataBadgeRenderer {
    icon: Icon
    style: string
    tooltip: string
    trackingParams: string
}

interface Icon {
    iconType: string
}

interface ThumbnailRenderer {
    playlistVideoThumbnailRenderer: PlaylistVideoThumbnailRenderer
}

interface PlaylistVideoThumbnailRenderer {
    thumbnail: Thumbnail4
    trackingParams: string
}

interface Thumbnail4 {
    thumbnails: Thumbnail5[]
    sampledThumbnailColor: SampledThumbnailColor2
    darkColorPalette: DarkColorPalette2
    vibrantColorPalette: VibrantColorPalette2
}

interface Thumbnail5 {
    url: string
    width: number
    height: number
}

interface SampledThumbnailColor2 {
    red: number
    green: number
    blue: number
}

interface DarkColorPalette2 {
    section2Color: number
    iconInactiveColor: number
    iconDisabledColor: number
}

interface VibrantColorPalette2 {
    iconInactiveColor: number
}

interface LongBylineText {
    runs: Run6[]
}

interface Run6 {
    text: string
    navigationEndpoint?: NavigationEndpoint3
}

interface NavigationEndpoint3 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata3
    browseEndpoint: BrowseEndpoint3
}

interface CommandMetadata3 {
    webCommandMetadata: WebCommandMetadata3
}

interface WebCommandMetadata3 {
    url: string
    webPageType: string
    rootVe: number
    apiUrl: string
}

interface BrowseEndpoint3 {
    browseId: string
    canonicalBaseUrl: string
}

interface ThumbnailOverlay {
    thumbnailOverlaySidePanelRenderer?: ThumbnailOverlaySidePanelRenderer
    thumbnailOverlayBottomPanelRenderer?: ThumbnailOverlayBottomPanelRenderer
}

interface ThumbnailOverlaySidePanelRenderer {
    text: Text
    icon: Icon2
}

interface Text {
    runs: Run7[]
}

interface Run7 {
    text: string
}

interface Icon2 {
    iconType: string
}

interface ThumbnailOverlayBottomPanelRenderer {
    text: Text2
    icon: Icon3
}

interface Text2 {
    runs: Run8[]
}

interface Run8 {
    text: string
}

interface Icon3 {
    iconType: string
}

interface ChannelThumbnail {
    channelThumbnailWithLinkRenderer: ChannelThumbnailWithLinkRenderer
}

interface ChannelThumbnailWithLinkRenderer {
    thumbnail: Thumbnail6
    navigationEndpoint: NavigationEndpoint4
    accessibility: Accessibility
}

interface Thumbnail6 {
    thumbnails: Thumbnail7[]
}

interface Thumbnail7 {
    url: string
    width: number
    height: number
}

interface NavigationEndpoint4 {
    clickTrackingParams: string
    commandMetadata: CommandMetadata4
    browseEndpoint: BrowseEndpoint4
}

interface CommandMetadata4 {
    webCommandMetadata: WebCommandMetadata4
}

interface WebCommandMetadata4 {
    url: string
    webPageType: string
    rootVe: number
    apiUrl: string
}

interface BrowseEndpoint4 {
    browseId: string
    canonicalBaseUrl: string
}

interface Accessibility {
    accessibilityData: AccessibilityData
}

interface AccessibilityData {
    label: string
}
