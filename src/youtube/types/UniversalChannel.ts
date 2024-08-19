export interface UnivseralChannel {
    header: Header
    callToAction: CallToAction
    collapsedLabel: CollapsedLabel
    trackingParams: string
}

interface Header {
    watchCardRichHeaderRenderer: WatchCardRichHeaderRenderer
}

interface WatchCardRichHeaderRenderer {
    title: Title
    titleNavigationEndpoint: TitleNavigationEndpoint
    subtitle: Subtitle
    avatar: Avatar
    colorSupportedDatas: ColorSupportedDatas
    trackingParams: string
    style: string
}

interface Title {
    runs: Run[]
}

interface Run {
    text: string
}

interface TitleNavigationEndpoint {
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
}

interface Subtitle {
    runs: Run2[]
}

interface Run2 {
    text: string
}

interface Avatar {
    thumbnails: Thumbnail[]
}

interface Thumbnail {
    url: string
    width: number
    height: number
}

interface ColorSupportedDatas {
    basicColorPaletteData: BasicColorPaletteData
}

interface BasicColorPaletteData {
    backgroundColor: number
    foregroundTitleColor: number
    foregroundBodyColor: number
}

interface CallToAction {
    watchCardHeroVideoRenderer: WatchCardHeroVideoRenderer
}

interface WatchCardHeroVideoRenderer {
    navigationEndpoint: NavigationEndpoint
    trackingParams: string
    callToActionButton: CallToActionButton
    heroImage: HeroImage
    accessibility: Accessibility
}

interface NavigationEndpoint {
    clickTrackingParams: string
    commandMetadata: CommandMetadata2
    watchEndpoint: WatchEndpoint
}

interface CommandMetadata2 {
    webCommandMetadata: WebCommandMetadata2
}

interface WebCommandMetadata2 {
    url: string
    webPageType: string
    rootVe: number
}

interface WatchEndpoint {
    videoId: string
    playlistId: string
    params: string
    loggingContext: LoggingContext
}

interface LoggingContext {
    vssLoggingContext: VssLoggingContext
}

interface VssLoggingContext {
    serializedContextData: string
}

interface CallToActionButton {
    callToActionButtonRenderer: CallToActionButtonRenderer
}

interface CallToActionButtonRenderer {
    label: Label
    icon: Icon
    style: string
}

interface Label {
    runs: Run3[]
}

interface Run3 {
    text: string
}

interface Icon {
    iconType: string
}

interface HeroImage {
    collageHeroImageRenderer: CollageHeroImageRenderer
}

interface CollageHeroImageRenderer {
    leftThumbnail: LeftThumbnail
    topRightThumbnail: TopRightThumbnail
    bottomRightThumbnail: BottomRightThumbnail
}

interface LeftThumbnail {
    thumbnails: Thumbnail2[]
}

interface Thumbnail2 {
    url: string
    width: number
    height: number
}

interface TopRightThumbnail {
    thumbnails: Thumbnail3[]
}

interface Thumbnail3 {
    url: string
    width: number
    height: number
}

interface BottomRightThumbnail {
    thumbnails: Thumbnail4[]
}

interface Thumbnail4 {
    url: string
    width: number
    height: number
}

interface Accessibility {
    accessibilityData: AccessibilityData
}

interface AccessibilityData {
    label: string
}

interface CollapsedLabel {
    runs: Run4[]
}

interface Run4 {
    text: string
}
