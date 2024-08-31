import { Continutation } from "./Continuation"

export interface PlaylistResults_0 {
    responseContext: ResponseContext
    contents: Contents
    trackingParams: string
    microformat: Microformat
    background: Background2
}

export interface ResponseContext {
    serviceTrackingParams: ServiceTrackingParam[]
}

export interface ServiceTrackingParam {
    service: string
    params: Param[]
}

export interface Param {
    key: string
    value: string
}

export interface Contents {
    twoColumnBrowseResultsRenderer: TwoColumnBrowseResultsRenderer
}

export interface TwoColumnBrowseResultsRenderer {
    secondaryContents: SecondaryContents
    tabs: Tab[]
}

export interface SecondaryContents {
    sectionListRenderer: SectionListRenderer
}

export interface SectionListRenderer {
    contents: Content[]
    trackingParams: string
}

export interface Content {
    musicPlaylistShelfRenderer: MusicShelfRenderer
    musicShelfRenderer: MusicShelfRenderer
}

export interface MusicShelfRenderer {
    contents: Content2[]
    trackingParams: string
    shelfDivider: ShelfDivider
    contentsMultiSelectable: boolean
    continuations: Continutation
}

export interface Content2 {
    musicResponsiveListItemRenderer: YouTubeMusicPlaylistTrack
}

export interface Badge {
    musicInlineBadgeRenderer: MusicInlineBadgeRenderer
}

export interface MusicInlineBadgeRenderer {
    trackingParams: string
    icon: Icon
    accessibilityData: AccessibilityData
}

export interface Icon {
    iconType: string
}

export interface AccessibilityData {
    accessibilityData: AccessibilityData2
}

export interface AccessibilityData2 {
    label: string
}

export interface MusicThumbnail {
    musicThumbnailRenderer: MusicThumbnailRenderer
}

export interface MusicThumbnailRenderer {
    thumbnail: Thumbnail
    thumbnailCrop: string
    thumbnailScale: string
    trackingParams: string
}

export interface Thumbnail {
    thumbnails: Thumbnail2[]
}

export interface Thumbnail2 {
    url: string
    width: number
    height: number
}

export interface YouTubeMusicPlaylistTrack {
    badges: Badge[]
    trackingParams: string
    overlay: Overlay
    flexColumns: FlexColumn[]
    fixedColumns: FixedColumn[]
    menu: Menu
    playlistItemData: PlaylistItemData
    itemHeight: string
    index: Index
    multiSelectCheckbox: MultiSelectCheckbox
    thumbnail: MusicThumbnail
}

export interface Overlay {
    musicItemThumbnailOverlayRenderer: MusicItemThumbnailOverlayRenderer
}

export interface MusicItemThumbnailOverlayRenderer {
    background: Background
    content: Content3
    contentPosition: string
    displayStyle: string
}

export interface Background {
    verticalGradient: VerticalGradient
}

export interface VerticalGradient {
    gradientLayerColors: string[]
}

export interface Content3 {
    musicPlayButtonRenderer: MusicPlayButtonRenderer
}

export interface MusicPlayButtonRenderer {
    playNavigationEndpoint: PlayNavigationEndpoint
    trackingParams: string
    playIcon: PlayIcon
    pauseIcon: PauseIcon
    iconColor: number
    backgroundColor: number
    activeBackgroundColor: number
    loadingIndicatorColor: number
    playingIcon: PlayingIcon
    iconLoadingColor: number
    activeScaleFactor: number
    buttonSize: string
    rippleTarget: string
    accessibilityPlayData: AccessibilityPlayData
    accessibilityPauseData: AccessibilityPauseData
}

export interface PlayNavigationEndpoint {
    clickTrackingParams: string
    watchEndpoint: WatchEndpoint
}

export interface WatchEndpoint {
    videoId: string
    playlistId: string
    index: number
    playerParams: string
    playlistSetVideoId: string
    loggingContext: LoggingContext
    watchEndpointMusicSupportedConfigs: WatchEndpointMusicSupportedConfigs
}

export interface LoggingContext {
    vssLoggingContext: VssLoggingContext
}

export interface VssLoggingContext {
    serializedContextData: string
}

export interface WatchEndpointMusicSupportedConfigs {
    watchEndpointMusicConfig: WatchEndpointMusicConfig
}

export interface WatchEndpointMusicConfig {
    musicVideoType: string
}

export interface PlayIcon {
    iconType: string
}

export interface PauseIcon {
    iconType: string
}

export interface PlayingIcon {
    iconType: string
}

export interface AccessibilityPlayData {
    accessibilityData: AccessibilityData
}

export interface AccessibilityData {
    label: string
}

export interface AccessibilityPauseData {
    accessibilityData: AccessibilityData2
}

export interface AccessibilityData2 {
    label: string
}

export interface FlexColumn {
    musicResponsiveListItemFlexColumnRenderer: MusicResponsiveListItemFlexColumnRenderer
}

export interface MusicResponsiveListItemFlexColumnRenderer {
    text: Text
    displayPriority: string
}

export interface Text {
    runs?: Run[]
}

export interface Run {
    text: string
    navigationEndpoint?: NavigationEndpoint
}

export interface NavigationEndpoint {
    clickTrackingParams: string
    watchEndpoint: WatchEndpoint2
}

export interface WatchEndpoint2 {
    videoId: string
    playlistId: string
    loggingContext: LoggingContext2
    watchEndpointMusicSupportedConfigs: WatchEndpointMusicSupportedConfigs2
}

export interface LoggingContext2 {
    vssLoggingContext: VssLoggingContext2
}

export interface VssLoggingContext2 {
    serializedContextData: string
}

export interface WatchEndpointMusicSupportedConfigs2 {
    watchEndpointMusicConfig: WatchEndpointMusicConfig2
}

export interface WatchEndpointMusicConfig2 {
    musicVideoType: string
}

export interface FixedColumn {
    musicResponsiveListItemFixedColumnRenderer: MusicResponsiveListItemFixedColumnRenderer
}

export interface MusicResponsiveListItemFixedColumnRenderer {
    text: Text2
    displayPriority: string
    size: string
}

export interface Text2 {
    runs: Run2[]
}

export interface Run2 {
    text: string
}

export interface Menu {
    menuRenderer: MenuRenderer
}

export interface MenuRenderer {
    items: Item[]
    trackingParams: string
    topLevelButtons: TopLevelButton[]
    accessibility: Accessibility
}

export interface Item {
    menuNavigationItemRenderer?: MenuNavigationItemRenderer
    menuServiceItemRenderer?: MenuServiceItemRenderer
    toggleMenuServiceItemRenderer?: ToggleMenuServiceItemRenderer
    menuServiceItemDownloadRenderer?: MenuServiceItemDownloadRenderer
}

export interface MenuNavigationItemRenderer {
    text: Text3
    icon: Icon
    navigationEndpoint: NavigationEndpoint2
    trackingParams: string
}

export interface Text3 {
    runs: Run3[]
}

export interface Run3 {
    text: string
}

export interface Icon {
    iconType: string
}

export interface NavigationEndpoint2 {
    clickTrackingParams: string
    shareEntityEndpoint?: ShareEntityEndpoint
    browseEndpoint?: BrowseEndpoint
    addToPlaylistEndpoint?: AddToPlaylistEndpoint
    watchEndpoint?: WatchEndpoint3
}

export interface ShareEntityEndpoint {
    serializedShareEntity: string
    sharePanelType: string
}

export interface BrowseEndpoint {
    browseId: string
    browseEndpointContextSupportedConfigs: BrowseEndpointContextSupportedConfigs
}

export interface BrowseEndpointContextSupportedConfigs {
    browseEndpointContextMusicConfig: BrowseEndpointContextMusicConfig
}

export interface BrowseEndpointContextMusicConfig {
    pageType: string
}

export interface AddToPlaylistEndpoint {
    videoId: string
}

export interface WatchEndpoint3 {
    videoId: string
    playlistId: string
    params: string
    loggingContext: LoggingContext3
    watchEndpointMusicSupportedConfigs: WatchEndpointMusicSupportedConfigs3
}

export interface LoggingContext3 {
    vssLoggingContext: VssLoggingContext3
}

export interface VssLoggingContext3 {
    serializedContextData: string
}

export interface WatchEndpointMusicSupportedConfigs3 {
    watchEndpointMusicConfig: WatchEndpointMusicConfig3
}

export interface WatchEndpointMusicConfig3 {
    musicVideoType: string
}

export interface MenuServiceItemRenderer {
    text: Text4
    icon: Icon2
    serviceEndpoint: ServiceEndpoint
    trackingParams: string
}

export interface Text4 {
    runs: Run4[]
}

export interface Run4 {
    text: string
}

export interface Icon2 {
    iconType: string
}

export interface ServiceEndpoint {
    clickTrackingParams: string
    queueAddEndpoint: QueueAddEndpoint
}

export interface QueueAddEndpoint {
    queueTarget: QueueTarget
    queueInsertPosition: string
    commands: Command[]
}

export interface QueueTarget {
    videoId: string
    onEmptyQueue: OnEmptyQueue
}

export interface OnEmptyQueue {
    clickTrackingParams: string
    watchEndpoint: WatchEndpoint4
}

export interface WatchEndpoint4 {
    videoId: string
}

export interface Command {
    clickTrackingParams: string
    addToToastAction: AddToToastAction
}

export interface AddToToastAction {
    item: Item2
}

export interface Item2 {
    notificationTextRenderer: NotificationTextRenderer
}

export interface NotificationTextRenderer {
    successResponseText: SuccessResponseText
    trackingParams: string
}

export interface SuccessResponseText {
    runs: Run5[]
}

export interface Run5 {
    text: string
}

export interface ToggleMenuServiceItemRenderer {
    defaultText: DefaultText
    defaultIcon: DefaultIcon
    defaultServiceEndpoint: DefaultServiceEndpoint
    toggledText: ToggledText
    toggledIcon: ToggledIcon
    toggledServiceEndpoint: ToggledServiceEndpoint
    trackingParams: string
}

export interface DefaultText {
    runs: Run6[]
}

export interface Run6 {
    text: string
}

export interface DefaultIcon {
    iconType: string
}

export interface DefaultServiceEndpoint {
    clickTrackingParams: string
    feedbackEndpoint: FeedbackEndpoint
}

export interface FeedbackEndpoint {
    feedbackToken: string
}

export interface ToggledText {
    runs: Run7[]
}

export interface Run7 {
    text: string
}

export interface ToggledIcon {
    iconType: string
}

export interface ToggledServiceEndpoint {
    clickTrackingParams: string
    feedbackEndpoint: FeedbackEndpoint2
}

export interface FeedbackEndpoint2 {
    feedbackToken: string
}

export interface MenuServiceItemDownloadRenderer {
    serviceEndpoint: ServiceEndpoint2
    trackingParams: string
}

export interface ServiceEndpoint2 {
    clickTrackingParams: string
    offlineVideoEndpoint: OfflineVideoEndpoint
}

export interface OfflineVideoEndpoint {
    videoId: string
    onAddCommand: OnAddCommand
}

export interface OnAddCommand {
    clickTrackingParams: string
    getDownloadActionCommand: GetDownloadActionCommand
}

export interface GetDownloadActionCommand {
    videoId: string
    params: string
}

export interface TopLevelButton {
    likeButtonRenderer: LikeButtonRenderer
}

export interface LikeButtonRenderer {
    target: Target
    likeStatus: string
    trackingParams: string
    likesAllowed: boolean
    serviceEndpoints: ServiceEndpoint3[]
}

export interface Target {
    videoId: string
}

export interface ServiceEndpoint3 {
    clickTrackingParams: string
    likeEndpoint: LikeEndpoint
}

export interface LikeEndpoint {
    status: string
    target: Target2
    actions?: Action[]
}

export interface Target2 {
    videoId: string
}

export interface Action {
    clickTrackingParams: string
    musicLibraryStatusUpdateCommand: MusicLibraryStatusUpdateCommand
}

export interface MusicLibraryStatusUpdateCommand {
    libraryStatus: string
    addToLibraryFeedbackToken: string
}

export interface Accessibility {
    accessibilityData: AccessibilityData3
}

export interface AccessibilityData3 {
    label: string
}

export interface PlaylistItemData {
    playlistSetVideoId: string
    videoId: string
}

export interface Index {
    runs: Run8[]
}

export interface Run8 {
    text: string
}

export interface MultiSelectCheckbox {
    checkboxRenderer: CheckboxRenderer
}

export interface CheckboxRenderer {
    onSelectionChangeCommand: OnSelectionChangeCommand
    checkedState: string
    trackingParams: string
}

export interface OnSelectionChangeCommand {
    clickTrackingParams: string
    updateMultiSelectStateCommand: UpdateMultiSelectStateCommand
}

export interface UpdateMultiSelectStateCommand {
    multiSelectParams: string
    multiSelectItem: string
    index: number
}

export interface ShelfDivider {
    musicShelfDividerRenderer: MusicShelfDividerRenderer
}

export interface MusicShelfDividerRenderer {
    hidden: boolean
}

export interface Tab {
    tabRenderer: TabRenderer
}

export interface TabRenderer {
    content: Content4
    trackingParams: string
}

export interface Content4 {
    sectionListRenderer: SectionListRenderer2
}

export interface SectionListRenderer2 {
    contents: Content5[]
    trackingParams: string
}

export interface Content5 {
    musicResponsiveHeaderRenderer: MusicResponsiveHeaderRenderer
}

export interface MusicResponsiveHeaderRenderer {
    thumbnail: Thumbnail
    buttons: Button[]
    title: Title
    subtitle: Subtitle
    trackingParams: string
    straplineTextOne: StraplineTextOne
    straplineThumbnail: StraplineThumbnail
    subtitleBadge: SubtitleBadge[]
    secondSubtitle: SecondSubtitle
}

export interface Thumbnail {
    musicThumbnailRenderer: MusicThumbnailRenderer
}

export interface MusicThumbnailRenderer {
    thumbnail: Thumbnail
    thumbnailCrop: string
    thumbnailScale: string
    trackingParams: string
}

export interface Button {
    downloadButtonRenderer?: DownloadButtonRenderer
    toggleButtonRenderer?: ToggleButtonRenderer
    musicPlayButtonRenderer?: MusicPlayButtonRenderer2
    buttonRenderer?: ButtonRenderer
    menuRenderer?: MenuRenderer2
}

export interface DownloadButtonRenderer {
    trackingParams: string
    style: string
    accessibilityData: AccessibilityData4
    targetId: string
    command: Command2
}

export interface AccessibilityData4 {
    accessibilityData: AccessibilityData5
}

export interface AccessibilityData5 {
    label: string
}

export interface Command2 {
    clickTrackingParams: string
    offlinePlaylistEndpoint: OfflinePlaylistEndpoint
}

export interface OfflinePlaylistEndpoint {
    playlistId: string
    action: string
    offlineability: Offlineability
    onAddCommand: OnAddCommand2
}

export interface Offlineability {
    offlineabilityRenderer: OfflineabilityRenderer
}

export interface OfflineabilityRenderer {
    offlineable: boolean
    clickTrackingParams: string
}

export interface OnAddCommand2 {
    clickTrackingParams: string
    getDownloadActionCommand: GetDownloadActionCommand2
}

export interface GetDownloadActionCommand2 {
    playlistId: string
    params: string
}

export interface ToggleButtonRenderer {
    isToggled: boolean
    isDisabled: boolean
    defaultIcon: DefaultIcon2
    defaultServiceEndpoint: DefaultServiceEndpoint2
    toggledIcon: ToggledIcon2
    toggledServiceEndpoint: ToggledServiceEndpoint2
    trackingParams: string
    accessibilityData: AccessibilityData6
    toggledAccessibilityData: ToggledAccessibilityData
}

export interface DefaultIcon2 {
    iconType: string
}

export interface DefaultServiceEndpoint2 {
    clickTrackingParams: string
    likeEndpoint: LikeEndpoint2
}

export interface LikeEndpoint2 {
    status: string
    target: Target3
}

export interface Target3 {
    playlistId: string
}

export interface ToggledIcon2 {
    iconType: string
}

export interface ToggledServiceEndpoint2 {
    clickTrackingParams: string
    likeEndpoint: LikeEndpoint3
}

export interface LikeEndpoint3 {
    status: string
    target: Target4
}

export interface Target4 {
    playlistId: string
}

export interface AccessibilityData6 {
    accessibilityData: AccessibilityData7
}

export interface AccessibilityData7 {
    label: string
}

export interface ToggledAccessibilityData {
    accessibilityData: AccessibilityData8
}

export interface AccessibilityData8 {
    label: string
}

export interface MusicPlayButtonRenderer2 {
    playNavigationEndpoint: PlayNavigationEndpoint2
    trackingParams: string
    playIcon: PlayIcon2
    pauseIcon: PauseIcon2
    iconColor: number
    backgroundColor: number
    activeBackgroundColor: number
    loadingIndicatorColor: number
    playingIcon: PlayingIcon2
    iconLoadingColor: number
    activeScaleFactor: number
    accessibilityPlayData: AccessibilityPlayData2
    accessibilityPauseData: AccessibilityPauseData2
}

export interface PlayNavigationEndpoint2 {
    clickTrackingParams: string
    watchEndpoint: WatchEndpoint5
}

export interface WatchEndpoint5 {
    videoId: string
    playlistId: string
    loggingContext: LoggingContext4
    watchEndpointMusicSupportedConfigs: WatchEndpointMusicSupportedConfigs4
}

export interface LoggingContext4 {
    vssLoggingContext: VssLoggingContext4
}

export interface VssLoggingContext4 {
    serializedContextData: string
}

export interface WatchEndpointMusicSupportedConfigs4 {
    watchEndpointMusicConfig: WatchEndpointMusicConfig4
}

export interface WatchEndpointMusicConfig4 {
    musicVideoType: string
}

export interface PlayIcon2 {
    iconType: string
}

export interface PauseIcon2 {
    iconType: string
}

export interface PlayingIcon2 {
    iconType: string
}

export interface AccessibilityPlayData2 {
    accessibilityData: AccessibilityData9
}

export interface AccessibilityData9 {
    label: string
}

export interface AccessibilityPauseData2 {
    accessibilityData: AccessibilityData10
}

export interface AccessibilityData10 {
    label: string
}

export interface ButtonRenderer {
    style: string
    icon: Icon3
    accessibility: Accessibility2
    trackingParams: string
    accessibilityData: AccessibilityData11
    command: Command3
}

export interface Icon3 {
    iconType: string
}

export interface Accessibility2 {
    label: string
}

export interface AccessibilityData11 {
    accessibilityData: AccessibilityData12
}

export interface AccessibilityData12 {
    label: string
}

export interface Command3 {
    clickTrackingParams: string
    shareEntityEndpoint: ShareEntityEndpoint2
}

export interface ShareEntityEndpoint2 {
    serializedShareEntity: string
    sharePanelType: string
}

export interface MenuRenderer2 {
    items: Item3[]
    trackingParams: string
    accessibility: Accessibility3
}

export interface Item3 {
    menuNavigationItemRenderer?: MenuNavigationItemRenderer2
    menuServiceItemRenderer?: MenuServiceItemRenderer2
    toggleMenuServiceItemRenderer?: ToggleMenuServiceItemRenderer2
}

export interface MenuNavigationItemRenderer2 {
    text: Text5
    icon: Icon4
    navigationEndpoint: NavigationEndpoint3
    trackingParams: string
}

export interface Text5 {
    runs: Run9[]
}

export interface Run9 {
    text: string
}

export interface Icon4 {
    iconType: string
}

export interface NavigationEndpoint3 {
    clickTrackingParams: string
    shareEntityEndpoint?: ShareEntityEndpoint3
    browseEndpoint?: BrowseEndpoint2
    addToPlaylistEndpoint?: AddToPlaylistEndpoint2
    watchPlaylistEndpoint?: WatchPlaylistEndpoint
}

export interface ShareEntityEndpoint3 {
    serializedShareEntity: string
    sharePanelType: string
}

export interface BrowseEndpoint2 {
    browseId: string
    browseEndpointContextSupportedConfigs: BrowseEndpointContextSupportedConfigs2
}

export interface BrowseEndpointContextSupportedConfigs2 {
    browseEndpointContextMusicConfig: BrowseEndpointContextMusicConfig2
}

export interface BrowseEndpointContextMusicConfig2 {
    pageType: string
}

export interface AddToPlaylistEndpoint2 {
    playlistId: string
}

export interface WatchPlaylistEndpoint {
    playlistId: string
    params: string
}

export interface MenuServiceItemRenderer2 {
    text: Text6
    icon: Icon5
    serviceEndpoint: ServiceEndpoint4
    trackingParams: string
}

export interface Text6 {
    runs: Run10[]
}

export interface Run10 {
    text: string
}

export interface Icon5 {
    iconType: string
}

export interface ServiceEndpoint4 {
    clickTrackingParams: string
    queueAddEndpoint: QueueAddEndpoint2
}

export interface QueueAddEndpoint2 {
    queueTarget: QueueTarget2
    queueInsertPosition: string
    commands: Command4[]
}

export interface QueueTarget2 {
    playlistId: string
    onEmptyQueue: OnEmptyQueue2
}

export interface OnEmptyQueue2 {
    clickTrackingParams: string
    watchEndpoint: WatchEndpoint6
}

export interface WatchEndpoint6 {
    playlistId: string
}

export interface Command4 {
    clickTrackingParams: string
    addToToastAction: AddToToastAction2
}

export interface AddToToastAction2 {
    item: Item4
}

export interface Item4 {
    notificationTextRenderer: NotificationTextRenderer2
}

export interface NotificationTextRenderer2 {
    successResponseText: SuccessResponseText2
    trackingParams: string
}

export interface SuccessResponseText2 {
    runs: Run11[]
}

export interface Run11 {
    text: string
}

export interface ToggleMenuServiceItemRenderer2 {
    defaultText: DefaultText2
    defaultIcon: DefaultIcon3
    defaultServiceEndpoint: DefaultServiceEndpoint3
    toggledText: ToggledText2
    toggledIcon: ToggledIcon3
    toggledServiceEndpoint: ToggledServiceEndpoint3
    trackingParams: string
}

export interface DefaultText2 {
    runs: Run12[]
}

export interface Run12 {
    text: string
}

export interface DefaultIcon3 {
    iconType: string
}

export interface DefaultServiceEndpoint3 {
    clickTrackingParams: string
    likeEndpoint: LikeEndpoint4
}

export interface LikeEndpoint4 {
    status: string
    target: Target5
}

export interface Target5 {
    playlistId: string
}

export interface ToggledText2 {
    runs: Run13[]
}

export interface Run13 {
    text: string
}

export interface ToggledIcon3 {
    iconType: string
}

export interface ToggledServiceEndpoint3 {
    clickTrackingParams: string
    likeEndpoint: LikeEndpoint5
}

export interface LikeEndpoint5 {
    status: string
    target: Target6
}

export interface Target6 {
    playlistId: string
}

export interface Accessibility3 {
    accessibilityData: AccessibilityData13
}

export interface AccessibilityData13 {
    label: string
}

export interface Title {
    runs: Run14[]
}

export interface Run14 {
    text: string
}

export interface Subtitle {
    runs: Run15[]
}

export interface Run15 {
    text: string
}

export interface StraplineTextOne {
    runs: Run16[]
}

export interface Run16 {
    text: string
    navigationEndpoint: NavigationEndpoint4
}

export interface NavigationEndpoint4 {
    clickTrackingParams: string
    browseEndpoint: BrowseEndpoint3
}

export interface BrowseEndpoint3 {
    browseId: string
    browseEndpointContextSupportedConfigs: BrowseEndpointContextSupportedConfigs3
}

export interface BrowseEndpointContextSupportedConfigs3 {
    browseEndpointContextMusicConfig: BrowseEndpointContextMusicConfig3
}

export interface BrowseEndpointContextMusicConfig3 {
    pageType: string
}

export interface StraplineThumbnail {
    musicThumbnailRenderer: MusicThumbnailRenderer2
}

export interface MusicThumbnailRenderer2 {
    thumbnail: Thumbnail4
    thumbnailCrop: string
    thumbnailScale: string
    trackingParams: string
}

export interface Thumbnail4 {
    thumbnails: Thumbnail5[]
}

export interface Thumbnail5 {
    url: string
    width: number
    height: number
}

export interface SubtitleBadge {
    musicInlineBadgeRenderer: MusicInlineBadgeRenderer
}

export interface MusicInlineBadgeRenderer {
    trackingParams: string
    icon: Icon6
    accessibilityData: AccessibilityData
}

export interface Icon6 {
    iconType: string
}

export interface AccessibilityData14 {
    accessibilityData: AccessibilityData15
}

export interface AccessibilityData15 {
    label: string
}

export interface SecondSubtitle {
    runs: Run17[]
}

export interface Run17 {
    text: string
}

export interface Microformat {
    microformatDataRenderer: MicroformatDataRenderer
}

export interface MicroformatDataRenderer {
    urlCanonical: string
}

export interface Background2 {
    musicThumbnailRenderer: MusicThumbnailRenderer3
}

export interface MusicThumbnailRenderer3 {
    thumbnail: Thumbnail6
    thumbnailCrop: string
    thumbnailScale: string
    trackingParams: string
}

export interface Thumbnail6 {
    thumbnails: Thumbnail7[]
}

export interface Thumbnail7 {
    url: string
    width: number
    height: number
}
