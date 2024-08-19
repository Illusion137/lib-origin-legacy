export interface PlaylistResults_0 {
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
    musicShelfRenderer?: MusicShelfRenderer
    musicPlaylistShelfRenderer?: MusicPlaylistShelfRenderer
    musicCarouselShelfRenderer?: MusicCarouselShelfRenderer
}

export interface MusicPlaylistShelfRenderer {
    contents: Content2[]
    collapsedItemCount: number
    playlistId: string
    trackingParams: string
}

export interface MusicShelfRenderer {
    contents: Content2[]
    trackingParams: string
    shelfDivider: ShelfDivider
    contentsMultiSelectable: boolean
}

export interface Content2 {
    musicResponsiveListItemRenderer: MusicResponsiveListItemRenderer
}

export interface MusicResponsiveListItemRenderer {
    trackingParams: string
    flexColumns: FlexColumn[]
    menu: Menu
    badges: Badge[]
    playlistItemData: PlaylistItemData
    flexColumnDisplayStyle: string
    navigationEndpoint: NavigationEndpoint5
    itemHeight: string
    index: Index
    multiSelectCheckbox: MultiSelectCheckbox
}

export interface FlexColumn {
    musicResponsiveListItemFlexColumnRenderer: MusicResponsiveListItemFlexColumnRenderer
}

export interface MusicResponsiveListItemFlexColumnRenderer {
    text: Text
    displayPriority: string
}

export interface Run {
    text: string
    navigationEndpoint?: NavigationEndpoint
}

export interface NavigationEndpoint {
    clickTrackingParams: string
    watchEndpoint: WatchEndpoint
}

export interface WatchEndpoint {
    videoId: string
    playlistId: string
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

export interface Menu {
    menuRenderer: MenuRenderer
}

export interface MenuRenderer {
    items: Item[]
    trackingParams: string
    accessibility: Accessibility
}

export interface Item {
    menuNavigationItemRenderer?: MenuNavigationItemRenderer
    menuServiceItemRenderer?: MenuServiceItemRenderer
    toggleMenuServiceItemRenderer?: ToggleMenuServiceItemRenderer
}

export interface MenuNavigationItemRenderer {
    text: Text2
    icon: Icon
    navigationEndpoint: NavigationEndpoint2
    trackingParams: string
}

export interface Text2 {
    runs: Run2[]
}

export interface Run2 {
    text: string
}

export interface Icon {
    iconType: string
}

export interface NavigationEndpoint2 {
    clickTrackingParams: string
    shareEntityEndpoint?: ShareEntityEndpoint
    browseEndpoint?: BrowseEndpoint
    modalEndpoint?: ModalEndpoint
    watchEndpoint?: WatchEndpoint2
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

export interface ModalEndpoint {
    modal: Modal
}

export interface Modal {
    modalWithTitleAndButtonRenderer: ModalWithTitleAndButtonRenderer
}

export interface ModalWithTitleAndButtonRenderer {
    title: Title
    content: Content3
    button: Button
}

export interface Title {
    runs: Run3[]
}

export interface Run3 {
    text: string
}

export interface Content3 {
    runs: Run4[]
}

export interface Run4 {
    text: string
}

export interface Button {
    buttonRenderer: ButtonRenderer
}

export interface ButtonRenderer {
    style: string
    isDisabled: boolean
    text: Text3
    navigationEndpoint: NavigationEndpoint3
    trackingParams: string
}

export interface Text3 {
    runs: Run5[]
}

export interface Run5 {
    text: string
}

export interface NavigationEndpoint3 {
    clickTrackingParams: string
    signInEndpoint: SignInEndpoint
}

export interface SignInEndpoint {
    hack: boolean
}

export interface WatchEndpoint2 {
    videoId: string
    playlistId: string
    params: string
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

export interface MenuServiceItemRenderer {
    text: Text4
    icon: Icon2
    serviceEndpoint: ServiceEndpoint
    trackingParams: string
}

export interface Text4 {
    runs: Run6[]
}

export interface Run6 {
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
    watchEndpoint: WatchEndpoint3
}

export interface WatchEndpoint3 {
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
    runs: Run7[]
}

export interface Run7 {
    text: string
}

export interface ToggleMenuServiceItemRenderer {
    defaultText: DefaultText
    defaultIcon: DefaultIcon
    defaultServiceEndpoint: DefaultServiceEndpoint
    toggledText: ToggledText
    toggledIcon: ToggledIcon
    trackingParams: string
}

export interface DefaultText {
    runs: Run8[]
}

export interface Run8 {
    text: string
}

export interface DefaultIcon {
    iconType: string
}

export interface DefaultServiceEndpoint {
    clickTrackingParams: string
    modalEndpoint: ModalEndpoint2
}

export interface ModalEndpoint2 {
    modal: Modal2
}

export interface Modal2 {
    modalWithTitleAndButtonRenderer: ModalWithTitleAndButtonRenderer2
}

export interface ModalWithTitleAndButtonRenderer2 {
    title: Title2
    content: Content4
    button: Button2
}

export interface Title2 {
    runs: Run9[]
}

export interface Run9 {
    text: string
}

export interface Content4 {
    runs: Run10[]
}

export interface Run10 {
    text: string
}

export interface Button2 {
    buttonRenderer: ButtonRenderer2
}

export interface ButtonRenderer2 {
    style: string
    isDisabled: boolean
    text: Text5
    navigationEndpoint: NavigationEndpoint4
    trackingParams: string
}

export interface Text5 {
    runs: Run11[]
}

export interface Run11 {
    text: string
}

export interface NavigationEndpoint4 {
    clickTrackingParams: string
    signInEndpoint: SignInEndpoint2
}

export interface SignInEndpoint2 {
    hack: boolean
}

export interface ToggledText {
    runs: Run12[]
}

export interface Run12 {
    text: string
}

export interface ToggledIcon {
    iconType: string
}

export interface Accessibility {
    accessibilityData: AccessibilityData
}

export interface AccessibilityData {
    label: string
}

export interface Badge {
    musicInlineBadgeRenderer: MusicInlineBadgeRenderer
}

export interface MusicInlineBadgeRenderer {
    trackingParams: string
    icon: Icon3
    accessibilityData: AccessibilityData2
}

export interface Icon3 {
    iconType: string
}

export interface AccessibilityData2 {
    accessibilityData: AccessibilityData3
}

export interface AccessibilityData3 {
    label: string
}

export interface PlaylistItemData {
    playlistSetVideoId: string
    videoId: string
}

export interface NavigationEndpoint5 {
    clickTrackingParams: string
    watchEndpoint: WatchEndpoint4
}

export interface WatchEndpoint4 {
    videoId: string
    playlistId: string
    index: number
    playerParams: string
    playlistSetVideoId: string
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

export interface Index {
    runs: Run13[]
}

export interface Run13 {
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
}

export interface ShelfDivider {
    musicShelfDividerRenderer: MusicShelfDividerRenderer
}

export interface MusicShelfDividerRenderer {
    hidden: boolean
}

export interface MusicCarouselShelfRenderer {
    header: Header
    contents: Content5[]
    trackingParams: string
    itemSize: string
}

export interface Header {
    musicCarouselShelfBasicHeaderRenderer: MusicCarouselShelfBasicHeaderRenderer
}

export interface MusicCarouselShelfBasicHeaderRenderer {
    title: Title3
    accessibilityData: AccessibilityData4
    headerStyle: string
    trackingParams: string
}

export interface Title3 {
    runs: Run14[]
}

export interface Run14 {
    text: string
}

export interface AccessibilityData4 {
    accessibilityData: AccessibilityData5
}

export interface AccessibilityData5 {
    label: string
}

export interface Content5 {
    musicTwoRowItemRenderer: MusicTwoRowItemRenderer
}

export interface MusicTwoRowItemRenderer {
    thumbnailRenderer: ThumbnailRenderer
    aspectRatio: string
    title: Title4
    subtitle: Subtitle
    navigationEndpoint: NavigationEndpoint7
    trackingParams: string
    menu: Menu2
    thumbnailOverlay: ThumbnailOverlay
    subtitleBadges: SubtitleBadge[]
}

export interface ThumbnailRenderer {
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

export interface Title4 {
    runs: Run15[]
}

export interface Run15 {
    text: string
    navigationEndpoint: NavigationEndpoint6
}

export interface NavigationEndpoint6 {
    clickTrackingParams: string
    browseEndpoint: BrowseEndpoint2
}

export interface BrowseEndpoint2 {
    browseId: string
    params: string
    browseEndpointContextSupportedConfigs: BrowseEndpointContextSupportedConfigs2
}

export interface BrowseEndpointContextSupportedConfigs2 {
    browseEndpointContextMusicConfig: BrowseEndpointContextMusicConfig2
}

export interface BrowseEndpointContextMusicConfig2 {
    pageType: string
}

export interface Subtitle {
    runs: Run16[]
}

export interface Run16 {
    text: string
}

export interface NavigationEndpoint7 {
    clickTrackingParams: string
    browseEndpoint: BrowseEndpoint3
}

export interface BrowseEndpoint3 {
    browseId: string
    params: string
    browseEndpointContextSupportedConfigs: BrowseEndpointContextSupportedConfigs3
}

export interface BrowseEndpointContextSupportedConfigs3 {
    browseEndpointContextMusicConfig: BrowseEndpointContextMusicConfig3
}

export interface BrowseEndpointContextMusicConfig3 {
    pageType: string
}

export interface Menu2 {
    menuRenderer: MenuRenderer2
}

export interface MenuRenderer2 {
    items: Item3[]
    trackingParams: string
    accessibility: Accessibility2
}

export interface Item3 {
    menuNavigationItemRenderer?: MenuNavigationItemRenderer2
    menuServiceItemRenderer?: MenuServiceItemRenderer2
    toggleMenuServiceItemRenderer?: ToggleMenuServiceItemRenderer2
}

export interface MenuNavigationItemRenderer2 {
    text: Text6
    icon: Icon4
    navigationEndpoint: NavigationEndpoint8
    trackingParams: string
}

export interface Text6 {
    runs: Run17[]
}

export interface Run17 {
    text: string
}

export interface Icon4 {
    iconType: string
}

export interface NavigationEndpoint8 {
    clickTrackingParams: string
    shareEntityEndpoint?: ShareEntityEndpoint2
    browseEndpoint?: BrowseEndpoint4
    modalEndpoint?: ModalEndpoint3
    watchPlaylistEndpoint?: WatchPlaylistEndpoint
}

export interface ShareEntityEndpoint2 {
    serializedShareEntity: string
    sharePanelType: string
}

export interface BrowseEndpoint4 {
    browseId: string
    browseEndpointContextSupportedConfigs: BrowseEndpointContextSupportedConfigs4
}

export interface BrowseEndpointContextSupportedConfigs4 {
    browseEndpointContextMusicConfig: BrowseEndpointContextMusicConfig4
}

export interface BrowseEndpointContextMusicConfig4 {
    pageType: string
}

export interface ModalEndpoint3 {
    modal: Modal3
}

export interface Modal3 {
    modalWithTitleAndButtonRenderer: ModalWithTitleAndButtonRenderer3
}

export interface ModalWithTitleAndButtonRenderer3 {
    title: Title5
    content: Content6
    button: Button3
}

export interface Title5 {
    runs: Run18[]
}

export interface Run18 {
    text: string
}

export interface Content6 {
    runs: Run19[]
}

export interface Run19 {
    text: string
}

export interface Button3 {
    buttonRenderer: ButtonRenderer3
}

export interface ButtonRenderer3 {
    style: string
    isDisabled: boolean
    text: Text7
    navigationEndpoint: NavigationEndpoint9
    trackingParams: string
}

export interface Text7 {
    runs: Run20[]
}

export interface Run20 {
    text: string
}

export interface NavigationEndpoint9 {
    clickTrackingParams: string
    signInEndpoint: SignInEndpoint3
}

export interface SignInEndpoint3 {
    hack: boolean
}

export interface WatchPlaylistEndpoint {
    playlistId: string
    params: string
}

export interface MenuServiceItemRenderer2 {
    text: Text8
    icon: Icon5
    serviceEndpoint: ServiceEndpoint2
    trackingParams: string
}

export interface Text8 {
    runs: Run21[]
}

export interface Run21 {
    text: string
}

export interface Icon5 {
    iconType: string
}

export interface ServiceEndpoint2 {
    clickTrackingParams: string
    queueAddEndpoint: QueueAddEndpoint2
}

export interface QueueAddEndpoint2 {
    queueTarget: QueueTarget2
    queueInsertPosition: string
    commands: Command2[]
}

export interface QueueTarget2 {
    playlistId: string
    onEmptyQueue: OnEmptyQueue2
}

export interface OnEmptyQueue2 {
    clickTrackingParams: string
    watchEndpoint: WatchEndpoint5
}

export interface WatchEndpoint5 {
    playlistId: string
}

export interface Command2 {
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
    runs: Run22[]
}

export interface Run22 {
    text: string
}

export interface ToggleMenuServiceItemRenderer2 {
    defaultText: DefaultText2
    defaultIcon: DefaultIcon2
    defaultServiceEndpoint: DefaultServiceEndpoint2
    toggledText: ToggledText2
    toggledIcon: ToggledIcon2
    toggledServiceEndpoint: ToggledServiceEndpoint
    trackingParams: string
}

export interface DefaultText2 {
    runs: Run23[]
}

export interface Run23 {
    text: string
}

export interface DefaultIcon2 {
    iconType: string
}

export interface DefaultServiceEndpoint2 {
    clickTrackingParams: string
    modalEndpoint: ModalEndpoint4
}

export interface ModalEndpoint4 {
    modal: Modal4
}

export interface Modal4 {
    modalWithTitleAndButtonRenderer: ModalWithTitleAndButtonRenderer4
}

export interface ModalWithTitleAndButtonRenderer4 {
    title: Title6
    content: Content7
    button: Button4
}

export interface Title6 {
    runs: Run24[]
}

export interface Run24 {
    text: string
}

export interface Content7 {
    runs: Run25[]
}

export interface Run25 {
    text: string
}

export interface Button4 {
    buttonRenderer: ButtonRenderer4
}

export interface ButtonRenderer4 {
    style: string
    isDisabled: boolean
    text: Text9
    navigationEndpoint: NavigationEndpoint10
    trackingParams: string
}

export interface Text9 {
    runs: Run26[]
}

export interface Run26 {
    text: string
}

export interface NavigationEndpoint10 {
    clickTrackingParams: string
    signInEndpoint: SignInEndpoint4
}

export interface SignInEndpoint4 {
    hack: boolean
}

export interface ToggledText2 {
    runs: Run27[]
}

export interface Run27 {
    text: string
}

export interface ToggledIcon2 {
    iconType: string
}

export interface ToggledServiceEndpoint {
    clickTrackingParams: string
    likeEndpoint: LikeEndpoint
}

export interface LikeEndpoint {
    status: string
    target: Target
}

export interface Target {
    playlistId: string
}

export interface Accessibility2 {
    accessibilityData: AccessibilityData6
}

export interface AccessibilityData6 {
    label: string
}

export interface ThumbnailOverlay {
    musicItemThumbnailOverlayRenderer: MusicItemThumbnailOverlayRenderer
}

export interface MusicItemThumbnailOverlayRenderer {
    background: Background
    content: Content8
    contentPosition: string
    displayStyle: string
}

export interface Background {
    verticalGradient: VerticalGradient
}

export interface VerticalGradient {
    gradientLayerColors: string[]
}

export interface Content8 {
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
    watchPlaylistEndpoint: WatchPlaylistEndpoint2
}

export interface WatchPlaylistEndpoint2 {
    playlistId: string
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
    accessibilityData: AccessibilityData7
}

export interface AccessibilityData7 {
    label: string
}

export interface AccessibilityPauseData {
    accessibilityData: AccessibilityData8
}

export interface AccessibilityData8 {
    label: string
}

export interface SubtitleBadge {
    musicInlineBadgeRenderer: MusicInlineBadgeRenderer2
}

export interface MusicInlineBadgeRenderer2 {
    trackingParams: string
    icon: Icon6
    accessibilityData: AccessibilityData9
}

export interface Icon6 {
    iconType: string
}

export interface AccessibilityData9 {
    accessibilityData: AccessibilityData10
}

export interface AccessibilityData10 {
    label: string
}

export interface Tab {
    tabRenderer: TabRenderer
}

export interface TabRenderer {
    content: Content9
    trackingParams: string
}

export interface Content9 {
    sectionListRenderer: SectionListRenderer2
}

export interface SectionListRenderer2 {
    contents: Content10[]
    trackingParams: string
}

export interface Content10 {
    musicResponsiveHeaderRenderer: MusicResponsiveHeaderRenderer
}

export interface MusicResponsiveHeaderRenderer {
    thumbnail: Thumbnail3
    buttons: Button5[]
    title: Title10
    subtitle: Subtitle2
    trackingParams: string
    straplineTextOne: StraplineTextOne
    straplineThumbnail: StraplineThumbnail
    subtitleBadge: SubtitleBadge2[]
    secondSubtitle: SecondSubtitle
}

export interface Thumbnail3 {
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

export interface Button5 {
    toggleButtonRenderer?: ToggleButtonRenderer
    musicPlayButtonRenderer?: MusicPlayButtonRenderer2
    menuRenderer?: MenuRenderer3
}

export interface ToggleButtonRenderer {
    isToggled: boolean
    isDisabled: boolean
    defaultIcon: DefaultIcon3
    toggledIcon: ToggledIcon3
    trackingParams: string
    defaultNavigationEndpoint: DefaultNavigationEndpoint
    accessibilityData: AccessibilityData11
    toggledAccessibilityData: ToggledAccessibilityData
}

export interface DefaultIcon3 {
    iconType: string
}

export interface ToggledIcon3 {
    iconType: string
}

export interface DefaultNavigationEndpoint {
    clickTrackingParams: string
    modalEndpoint: ModalEndpoint5
}

export interface ModalEndpoint5 {
    modal: Modal5
}

export interface Modal5 {
    modalWithTitleAndButtonRenderer: ModalWithTitleAndButtonRenderer5
}

export interface ModalWithTitleAndButtonRenderer5 {
    title: Title7
    content: Content11
    button: Button6
}

export interface Title7 {
    runs: Run28[]
}

export interface Run28 {
    text: string
}

export interface Content11 {
    runs: Run29[]
}

export interface Run29 {
    text: string
}

export interface Button6 {
    buttonRenderer: ButtonRenderer5
}

export interface ButtonRenderer5 {
    style: string
    isDisabled: boolean
    text: Text10
    navigationEndpoint: NavigationEndpoint11
    trackingParams: string
}

export interface Text10 {
    runs: Run30[]
}

export interface Run30 {
    text: string
}

export interface NavigationEndpoint11 {
    clickTrackingParams: string
    signInEndpoint: SignInEndpoint5
}

export interface SignInEndpoint5 {
    hack: boolean
}

export interface AccessibilityData11 {
    accessibilityData: AccessibilityData12
}

export interface AccessibilityData12 {
    label: string
}

export interface ToggledAccessibilityData {
    accessibilityData: AccessibilityData13
}

export interface AccessibilityData13 {
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
    watchEndpoint: WatchEndpoint6
}

export interface WatchEndpoint6 {
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
    accessibilityData: AccessibilityData14
}

export interface AccessibilityData14 {
    label: string
}

export interface AccessibilityPauseData2 {
    accessibilityData: AccessibilityData15
}

export interface AccessibilityData15 {
    label: string
}

export interface MenuRenderer3 {
    items: Item5[]
    trackingParams: string
    accessibility: Accessibility3
}

export interface Item5 {
    menuNavigationItemRenderer?: MenuNavigationItemRenderer3
    menuServiceItemRenderer?: MenuServiceItemRenderer3
    toggleMenuServiceItemRenderer?: ToggleMenuServiceItemRenderer3
}

export interface MenuNavigationItemRenderer3 {
    text: Text11
    icon: Icon7
    navigationEndpoint: NavigationEndpoint12
    trackingParams: string
}

export interface Text11 {
    runs: Run31[]
}

export interface Run31 {
    text: string
}

export interface Icon7 {
    iconType: string
}

export interface NavigationEndpoint12 {
    clickTrackingParams: string
    shareEntityEndpoint?: ShareEntityEndpoint3
    browseEndpoint?: BrowseEndpoint5
    modalEndpoint?: ModalEndpoint6
    watchPlaylistEndpoint?: WatchPlaylistEndpoint3
}

export interface ShareEntityEndpoint3 {
    serializedShareEntity: string
    sharePanelType: string
}

export interface BrowseEndpoint5 {
    browseId: string
    browseEndpointContextSupportedConfigs: BrowseEndpointContextSupportedConfigs5
}

export interface BrowseEndpointContextSupportedConfigs5 {
    browseEndpointContextMusicConfig: BrowseEndpointContextMusicConfig5
}

export interface BrowseEndpointContextMusicConfig5 {
    pageType: string
}

export interface ModalEndpoint6 {
    modal: Modal6
}

export interface Modal6 {
    modalWithTitleAndButtonRenderer: ModalWithTitleAndButtonRenderer6
}

export interface ModalWithTitleAndButtonRenderer6 {
    title: Title8
    content: Content12
    button: Button7
}

export interface Title8 {
    runs: Run32[]
}

export interface Run32 {
    text: string
}

export interface Content12 {
    runs: Run33[]
}

export interface Run33 {
    text: string
}

export interface Button7 {
    buttonRenderer: ButtonRenderer6
}

export interface ButtonRenderer6 {
    style: string
    isDisabled: boolean
    text: Text12
    navigationEndpoint: NavigationEndpoint13
    trackingParams: string
}

export interface Text12 {
    runs: Run34[]
}

export interface Run34 {
    text: string
}

export interface NavigationEndpoint13 {
    clickTrackingParams: string
    signInEndpoint: SignInEndpoint6
}

export interface SignInEndpoint6 {
    hack: boolean
}

export interface WatchPlaylistEndpoint3 {
    playlistId: string
    params: string
}

export interface MenuServiceItemRenderer3 {
    text: Text13
    icon: Icon8
    serviceEndpoint: ServiceEndpoint3
    trackingParams: string
}

export interface Text13 {
    runs: Run35[]
}

export interface Run35 {
    text: string
}

export interface Icon8 {
    iconType: string
}

export interface ServiceEndpoint3 {
    clickTrackingParams: string
    queueAddEndpoint: QueueAddEndpoint3
}

export interface QueueAddEndpoint3 {
    queueTarget: QueueTarget3
    queueInsertPosition: string
    commands: Command3[]
}

export interface QueueTarget3 {
    playlistId: string
    onEmptyQueue: OnEmptyQueue3
}

export interface OnEmptyQueue3 {
    clickTrackingParams: string
    watchEndpoint: WatchEndpoint7
}

export interface WatchEndpoint7 {
    playlistId: string
}

export interface Command3 {
    clickTrackingParams: string
    addToToastAction: AddToToastAction3
}

export interface AddToToastAction3 {
    item: Item6
}

export interface Item6 {
    notificationTextRenderer: NotificationTextRenderer3
}

export interface NotificationTextRenderer3 {
    successResponseText: SuccessResponseText3
    trackingParams: string
}

export interface SuccessResponseText3 {
    runs: Run36[]
}

export interface Run36 {
    text: string
}

export interface ToggleMenuServiceItemRenderer3 {
    defaultText: DefaultText3
    defaultIcon: DefaultIcon4
    defaultServiceEndpoint: DefaultServiceEndpoint3
    toggledText: ToggledText3
    toggledIcon: ToggledIcon4
    toggledServiceEndpoint: ToggledServiceEndpoint2
    trackingParams: string
}

export interface DefaultText3 {
    runs: Run37[]
}

export interface Run37 {
    text: string
}

export interface DefaultIcon4 {
    iconType: string
}

export interface DefaultServiceEndpoint3 {
    clickTrackingParams: string
    modalEndpoint: ModalEndpoint7
}

export interface ModalEndpoint7 {
    modal: Modal7
}

export interface Modal7 {
    modalWithTitleAndButtonRenderer: ModalWithTitleAndButtonRenderer7
}

export interface ModalWithTitleAndButtonRenderer7 {
    title: Title9
    content: Content13
    button: Button8
}

export interface Title9 {
    runs: Run38[]
}

export interface Run38 {
    text: string
}

export interface Content13 {
    runs: Run39[]
}

export interface Run39 {
    text: string
}

export interface Button8 {
    buttonRenderer: ButtonRenderer7
}

export interface ButtonRenderer7 {
    style: string
    isDisabled: boolean
    text: Text14
    navigationEndpoint: NavigationEndpoint14
    trackingParams: string
}

export interface Text14 {
    runs: Run40[]
}

export interface Run40 {
    text: string
}

export interface NavigationEndpoint14 {
    clickTrackingParams: string
    signInEndpoint: SignInEndpoint7
}

export interface SignInEndpoint7 {
    hack: boolean
}

export interface ToggledText3 {
    runs: Run41[]
}

export interface Run41 {
    text: string
}

export interface ToggledIcon4 {
    iconType: string
}

export interface ToggledServiceEndpoint2 {
    clickTrackingParams: string
    likeEndpoint: LikeEndpoint2
}

export interface LikeEndpoint2 {
    status: string
    target: Target2
}

export interface Target2 {
    playlistId: string
}

export interface Accessibility3 {
    accessibilityData: AccessibilityData16
}

export interface AccessibilityData16 {
    label: string
}

export interface Title10 {
    runs: Run42[]
}

export interface Run42 {
    text: string
}

export interface Subtitle2 {
    runs: Run43[]
}

export interface Run43 {
    text: string
}

export interface StraplineTextOne {
    runs: Run44[]
}

export interface Run44 {
    text: string
    navigationEndpoint: NavigationEndpoint15
}

export interface NavigationEndpoint15 {
    clickTrackingParams: string
    browseEndpoint: BrowseEndpoint6
}

export interface BrowseEndpoint6 {
    browseId: string
    browseEndpointContextSupportedConfigs: BrowseEndpointContextSupportedConfigs6
}

export interface BrowseEndpointContextSupportedConfigs6 {
    browseEndpointContextMusicConfig: BrowseEndpointContextMusicConfig6
}

export interface BrowseEndpointContextMusicConfig6 {
    pageType: string
}

export interface StraplineThumbnail {
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

export interface SubtitleBadge2 {
    musicInlineBadgeRenderer: MusicInlineBadgeRenderer3
}

export interface MusicInlineBadgeRenderer3 {
    trackingParams: string
    icon: Icon9
    accessibilityData: AccessibilityData17
}

export interface Icon9 {
    iconType: string
}

export interface AccessibilityData17 {
    accessibilityData: AccessibilityData18
}

export interface AccessibilityData18 {
    label: string
}

export interface SecondSubtitle {
    runs: Run45[]
}

export interface Run45 {
    text: string
}

export interface MusicResponsiveListItemRenderer {
    trackingParams: string
    thumbnail: Thumbnail
    flexColumns: FlexColumn[]
    menu: Menu
    playlistItemData: PlaylistItemData
    flexColumnDisplayStyle: string
    navigationEndpoint: NavigationEndpoint5
    multiSelectCheckbox: MultiSelectCheckbox
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

export interface Thumbnail3 {
    url: string
    width: number
    height: number
}

export interface FlexColumn {
    musicResponsiveListItemFlexColumnRenderer: MusicResponsiveListItemFlexColumnRenderer
}

export interface MusicResponsiveListItemFlexColumnRenderer {
    text: Text
    displayPriority: string
}

export interface Text {
    runs: Run[]
}

export interface Run {
    text: string
    navigationEndpoint?: NavigationEndpoint
}

export interface NavigationEndpoint {
    clickTrackingParams: string
    watchEndpoint: WatchEndpoint
}

export interface WatchEndpoint {
    videoId: string
    playlistId: string
    playerParams: string
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

export interface Menu {
    menuRenderer: MenuRenderer
}

export interface MenuRenderer {
    items: Item[]
    trackingParams: string
    accessibility: Accessibility
}

export interface Item {
    menuNavigationItemRenderer?: MenuNavigationItemRenderer
    menuServiceItemRenderer?: MenuServiceItemRenderer
    toggleMenuServiceItemRenderer?: ToggleMenuServiceItemRenderer
}

export interface MenuNavigationItemRenderer {
    text: Text2
    icon: Icon
    navigationEndpoint: NavigationEndpoint2
    trackingParams: string
}

export interface Text2 {
    runs: Run2[]
}

export interface Run2 {
    text: string
}

export interface Icon {
    iconType: string
}

export interface NavigationEndpoint2 {
    clickTrackingParams: string
    shareEntityEndpoint?: ShareEntityEndpoint
    modalEndpoint?: ModalEndpoint
    watchEndpoint?: WatchEndpoint2
}

export interface ShareEntityEndpoint {
    serializedShareEntity: string
    sharePanelType: string
}

export interface ModalEndpoint {
    modal: Modal
}

export interface Modal {
    modalWithTitleAndButtonRenderer: ModalWithTitleAndButtonRenderer
}

export interface ModalWithTitleAndButtonRenderer {
    title: Title
    content: Content_0
    button: Button
}

export interface Title {
    runs: Run3[]
}

export interface Run3 {
    text: string
}

export interface Content_0 {
    runs: Run4[]
}

export interface Run4 {
    text: string
}

export interface Button {
    buttonRenderer: ButtonRenderer
}

export interface ButtonRenderer {
    style: string
    isDisabled: boolean
    text: Text3
    navigationEndpoint: NavigationEndpoint3
    trackingParams: string
}

export interface Text3 {
    runs: Run5[]
}

export interface Run5 {
    text: string
}

export interface NavigationEndpoint3 {
    clickTrackingParams: string
    signInEndpoint: SignInEndpoint
}

export interface SignInEndpoint {
    hack: boolean
}

export interface WatchEndpoint2 {
    videoId: string
    playlistId: string
    params: string
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

export interface MenuServiceItemRenderer {
    text: Text4
    icon: Icon2
    serviceEndpoint: ServiceEndpoint
    trackingParams: string
}

export interface Text4 {
    runs: Run6[]
}

export interface Run6 {
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
    watchEndpoint: WatchEndpoint3
}

export interface WatchEndpoint3 {
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
    runs: Run7[]
}

export interface Run7 {
    text: string
}

export interface ToggleMenuServiceItemRenderer {
    defaultText: DefaultText
    defaultIcon: DefaultIcon
    defaultServiceEndpoint: DefaultServiceEndpoint
    toggledText: ToggledText
    toggledIcon: ToggledIcon
    trackingParams: string
}

export interface DefaultText {
    runs: Run8[]
}

export interface Run8 {
    text: string
}

export interface DefaultIcon {
    iconType: string
}

export interface DefaultServiceEndpoint {
    clickTrackingParams: string
    modalEndpoint: ModalEndpoint2
}

export interface ModalEndpoint2 {
    modal: Modal2
}

export interface Modal2 {
    modalWithTitleAndButtonRenderer: ModalWithTitleAndButtonRenderer2
}

export interface ModalWithTitleAndButtonRenderer2 {
    title: Title2
    content: Content2_0
    button: Button2
}

export interface Title2 {
    runs: Run9[]
}

export interface Run9 {
    text: string
}

export interface Content2_0 {
    runs: Run10[]
}

export interface Run10 {
    text: string
}

export interface Button2 {
    buttonRenderer: ButtonRenderer2
}

export interface ButtonRenderer2 {
    style: string
    isDisabled: boolean
    text: Text5
    navigationEndpoint: NavigationEndpoint4
    trackingParams: string
}

export interface Text5 {
    runs: Run11[]
}

export interface Run11 {
    text: string
}

export interface NavigationEndpoint4 {
    clickTrackingParams: string
    signInEndpoint: SignInEndpoint2
}

export interface SignInEndpoint2 {
    hack: boolean
}

export interface ToggledText {
    runs: Run12[]
}

export interface Run12 {
    text: string
}

export interface ToggledIcon {
    iconType: string
}

export interface Accessibility {
    accessibilityData: AccessibilityData
}

export interface AccessibilityData {
    label: string
}

export interface PlaylistItemData {
    playlistSetVideoId: string
    videoId: string
}

export interface NavigationEndpoint5 {
    clickTrackingParams: string
    watchEndpoint: WatchEndpoint4
}

export interface WatchEndpoint4 {
    videoId: string
    playlistId: string
    playerParams: string
    playlistSetVideoId: string
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
}
