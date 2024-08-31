export interface SearchResults_0 {
    responseContext: ResponseContext;
    estimatedResults: string;
    contents: Contents;
    trackingParams: string;
    topbar: Topbar;
    frameworkUpdates: FrameworkUpdates;
}

export interface Contents {
    sectionListRenderer: SectionListRenderer;
}

export interface SectionListRenderer {
    contents: SectionListRendererContent[];
    continuations: Continuation[];
    trackingParams: string;
    subMenu: SubMenu;
    hideBottomSeparator: boolean;
    targetId: string;
}

export interface SectionListRendererContent {
    itemSectionRenderer: ItemSectionRenderer;
    continuationItemRenderer?: ContinuationItemRenderer;
}

export interface ContinuationItemRenderer {
    trigger: string;
    continuationEndpoint: ContinuationEndpoint;
    loggingDirectives: ContinuationItemRendererLoggingDirectives;
}

export interface ContinuationEndpoint {
    clickTrackingParams: string;
    commandMetadata: ContinuationEndpointCommandMetadata;
    continuationCommand: ContinuationCommand;
}

export interface ContinuationEndpointCommandMetadata {
    webCommandMetadata: PurpleWebCommandMetadata;
}

export interface PurpleWebCommandMetadata {
    sendPost: boolean;
    apiUrl: string;
}

export interface ContinuationCommand {
    token: string;
    request: string;
}

export interface ContinuationItemRendererLoggingDirectives {
    trackingParams: string;
}

export interface ItemSectionRenderer {
    contents: ItemSectionRendererContent[];
    trackingParams: string;
}

export interface ItemSectionRendererContent {
    videoWithContextRenderer: VideoWithContextRenderer;
    compactChannelRenderer: CompactChannelRenderer;
    compactRadioRenderer: CompactRadioRenderer;
    compactPlaylistRenderer: CompactPlaylistRenderer;
    reelShelfRenderer: ReelShelfRenderer;
}

export interface CompactChannelRenderer {
    channelId: string;
    thumbnail: SidebarThumbnailElement;
    displayName: TitleElement;
    videoCountText: HeadlineClass;
    subscriberCountText: TitleElement;
    navigationEndpoint: CompactChannelRendererNavigationEndpoint;
    title: HeadlineClass;
    subscribeButton: SubscribeButton;
    ownerBadges: OwnerBadge[];
    trackingParams: string;
}

export interface TitleElement {
    runs: TitleRun[];
}

export interface TitleRun {
    text: string;
}

export interface CompactChannelRendererNavigationEndpoint {
    clickTrackingParams: string;
    commandMetadata: EndpointCommandMetadata;
    browseEndpoint: PurpleBrowseEndpoint;
}

export interface PurpleBrowseEndpoint {
    browseId: string;
    canonicalBaseUrl?: string;
}

export interface EndpointCommandMetadata {
    webCommandMetadata: WebCommandMetadata;
}

export interface WebCommandMetadata {
    url: string;
    webPageType: WebPageType;
    rootVe: number;
    apiUrl?: APIURL;
}

export enum APIURL {
    YoutubeiV1Browse = "/youtubei/v1/browse",
}

export enum WebPageType {
    WebPageTypeBrowse = "WEB_PAGE_TYPE_BROWSE",
    WebPageTypeChannel = "WEB_PAGE_TYPE_CHANNEL",
    WebPageTypePlaylist = "WEB_PAGE_TYPE_PLAYLIST",
    WebPageTypeSearch = "WEB_PAGE_TYPE_SEARCH",
    WebPageTypeShorts = "WEB_PAGE_TYPE_SHORTS",
    WebPageTypeUnknown = "WEB_PAGE_TYPE_UNKNOWN",
    WebPageTypeWatch = "WEB_PAGE_TYPE_WATCH",
}

export interface OwnerBadge {
    metadataBadgeRenderer: MetadataBadgeRenderer;
}

export interface MetadataBadgeRenderer {
    icon: Icon;
    style: string;
    tooltip: string;
    trackingParams: string;
}

export interface Icon {
    iconType: string;
}

export interface SubscribeButton {
    subscribeButtonRenderer: SubscribeButtonRenderer;
}

export interface SubscribeButtonRenderer {
    buttonText: TitleElement;
    subscribed: boolean;
    enabled: boolean;
    type: string;
    channelId: string;
    showPreferences: boolean;
    subscribedButtonText: TitleElement;
    unsubscribedButtonText: TitleElement;
    trackingParams: string;
    unsubscribeButtonText: TitleElement;
    subscribeAccessibility: AccessibilityData;
    unsubscribeAccessibility: AccessibilityData;
    subscribedEntityKey: string;
    onSubscribeEndpoints: OnSubscribeEndpoint[];
    onUnsubscribeEndpoints: OnUnsubscribeEndpoint[];
}

export interface OnSubscribeEndpoint {
    clickTrackingParams: string;
    commandMetadata: ContinuationEndpointCommandMetadata;
    subscribeEndpoint: SubscribeEndpoint;
}

export interface SubscribeEndpoint {
    channelIds: string[];
    params: string;
}

export interface OnUnsubscribeEndpoint {
    clickTrackingParams: string;
    commandMetadata: OnUnsubscribeEndpointCommandMetadata;
    signalServiceEndpoint: OnUnsubscribeEndpointSignalServiceEndpoint;
}

export interface OnUnsubscribeEndpointCommandMetadata {
    webCommandMetadata: FluffyWebCommandMetadata;
}

export interface FluffyWebCommandMetadata {
    sendPost: boolean;
}

export interface OnUnsubscribeEndpointSignalServiceEndpoint {
    signal: string;
    actions: PurpleAction[];
}

export interface PurpleAction {
    clickTrackingParams: string;
    openPopupAction: PurpleOpenPopupAction;
}

export interface PurpleOpenPopupAction {
    popup: PurplePopup;
    popupType: string;
}

export interface PurplePopup {
    confirmDialogRenderer: ConfirmDialogRenderer;
}

export interface ConfirmDialogRenderer {
    trackingParams: string;
    dialogMessages: TitleElement[];
    confirmButton: CancelButtonClass;
    cancelButton: CancelButtonClass;
    primaryIsCancel: boolean;
}

export interface CancelButtonClass {
    buttonRenderer: CancelButtonButtonRenderer;
}

export interface CancelButtonButtonRenderer {
    style: string;
    size: string;
    isDisabled: boolean;
    text: TitleElement;
    accessibility: Accessibility;
    trackingParams: string;
    serviceEndpoint?: PurpleServiceEndpoint;
}

export interface Accessibility {
    label: string;
}

export interface PurpleServiceEndpoint {
    clickTrackingParams: string;
    commandMetadata: ContinuationEndpointCommandMetadata;
    unsubscribeEndpoint: SubscribeEndpoint;
}

export interface AccessibilityData {
    accessibilityData: Accessibility;
}

export interface SidebarThumbnailElement {
    thumbnails: SourceElement[];
}

export interface SourceElement {
    url: string;
    width: number;
    height: number;
}

export interface HeadlineClass {
    runs: TitleRun[];
    accessibility: AccessibilityData;
}

export interface CompactPlaylistRenderer {
    playlistId: string;
    thumbnail: PlaylistVideoThumbnailRendererThumbnail;
    title: TitleElement;
    shortBylineText: BylineText;
    videoCountText: TitleElement;
    navigationEndpoint: Endpoint;
    videoCountShortText: TitleElement;
    trackingParams: string;
    sidebarThumbnails: SidebarThumbnailElement[];
    thumbnailText: ThumbnailText;
    shareUrl: string;
    thumbnailRenderer: ThumbnailRenderer;
    longBylineText: BylineText;
    thumbnailOverlays: CompactPlaylistRendererThumbnailOverlay[];
    channelThumbnail?: ChannelThumbnail;
}

export interface ChannelThumbnail {
    channelThumbnailWithLinkRenderer: ChannelThumbnailWithLinkRenderer;
}

export interface ChannelThumbnailWithLinkRenderer {
    thumbnail: SidebarThumbnailElement;
    navigationEndpoint: CompactChannelRendererNavigationEndpoint;
    accessibility: AccessibilityData;
}

export interface BylineText {
    runs: ShortBylineTextRun[];
}

export interface ShortBylineTextRun {
    text: string;
    navigationEndpoint?: CompactChannelRendererNavigationEndpoint;
}

export interface Endpoint {
    clickTrackingParams: string;
    commandMetadata: EndpointCommandMetadata;
    browseEndpoint: EndpointBrowseEndpoint;
}

export interface EndpointBrowseEndpoint {
    browseId: string;
}

export interface PlaylistVideoThumbnailRendererThumbnail {
    thumbnails: SourceElement[];
    sampledThumbnailColor: SampledThumbnailColor;
    darkColorPalette: DarkColorPalette;
    vibrantColorPalette: VibrantColorPalette;
}

export interface DarkColorPalette {
    section2Color: number;
    iconInactiveColor: number;
    iconDisabledColor: number;
}

export interface SampledThumbnailColor {
    red: number;
    green: number;
    blue: number;
}

export interface VibrantColorPalette {
    iconInactiveColor: number;
}

export interface CompactPlaylistRendererThumbnailOverlay {
    thumbnailOverlaySidePanelRenderer?: ThumbnailOverlayPanelRenderer;
    thumbnailOverlayBottomPanelRenderer?: ThumbnailOverlayPanelRenderer;
}

export interface ThumbnailOverlayPanelRenderer {
    text: TitleElement;
    icon: Icon;
}

export interface ThumbnailRenderer {
    playlistVideoThumbnailRenderer: PlaylistVideoThumbnailRenderer;
}

export interface PlaylistVideoThumbnailRenderer {
    thumbnail: PlaylistVideoThumbnailRendererThumbnail;
    trackingParams: string;
}

export interface ThumbnailText {
    runs: ThumbnailTextRun[];
}

export interface ThumbnailTextRun {
    text: string;
    bold?: boolean;
}

export interface CompactRadioRenderer {
    playlistId: string;
    thumbnail: PlaylistVideoThumbnailRendererThumbnail;
    title: TitleElement;
    navigationEndpoint: SecondaryNavigationEndpointClass;
    videoCountText: TitleElement;
    secondaryNavigationEndpoint: SecondaryNavigationEndpointClass;
    longBylineText: TitleElement;
    trackingParams: string;
    thumbnailText: ThumbnailText;
    videoCountShortText: TitleElement;
    shareUrl: string;
    thumbnailOverlays: CompactRadioRendererThumbnailOverlay[];
}

export interface SecondaryNavigationEndpointClass {
    clickTrackingParams: string;
    commandMetadata: EndpointCommandMetadata;
    watchEndpoint: SecondaryNavigationEndpointWatchEndpoint;
}

export interface SecondaryNavigationEndpointWatchEndpoint {
    videoId: string;
    playlistId: string;
    params: string;
    continuePlayback?: boolean;
    loggingContext: WatchEndpointLoggingContext;
}

export interface WatchEndpointLoggingContext {
    vssLoggingContext: LoggingContext;
}

export interface LoggingContext {
    serializedContextData: SerializedContextData;
}

export enum SerializedContextData {
    CGIIDA3D3D = "CgIIDA%3D%3D",
    Gg1SREtQSjhJR0ZiNWRZ = "Gg1SREtQSjhJR0ZiNWRZ",
}

export interface CompactRadioRendererThumbnailOverlay {
    thumbnailOverlayBottomPanelRenderer: ThumbnailOverlayPanelRenderer;
}

export interface ReelShelfRenderer {
    title: TitleElement;
    button: Button;
    items: ReelShelfRendererItem[];
    trackingParams: string;
    icon: Icon;
}

export interface Button {
    menuRenderer: ButtonMenuRenderer;
}

export interface ButtonMenuRenderer {
    items: PurpleItem[];
    trackingParams: string;
    accessibility: AccessibilityData;
}

export interface PurpleItem {
    menuNavigationItemRenderer: PurpleMenuNavigationItemRenderer;
}

export interface PurpleMenuNavigationItemRenderer {
    text: TitleElement;
    icon: Icon;
    navigationEndpoint: InnertubeCommandClass;
    trackingParams: string;
    accessibility: AccessibilityData;
}

export interface InnertubeCommandClass {
    clickTrackingParams: string;
    commandMetadata: PurpleCommandMetadata;
    userFeedbackEndpoint: UserFeedbackEndpoint;
}

export interface PurpleCommandMetadata {
    webCommandMetadata: TentacledWebCommandMetadata;
}

export interface TentacledWebCommandMetadata {
    ignoreNavigation: boolean;
}

export interface UserFeedbackEndpoint {
    additionalDatas: AdditionalData[];
}

export interface AdditionalData {
    userFeedbackEndpointProductSpecificValueData: Param;
}

export interface Param {
    key: string;
    value: string;
}

export interface ReelShelfRendererItem {
    shortsLockupViewModel: ShortsLockupViewModel;
}

export interface ShortsLockupViewModel {
    entityId: string;
    accessibilityText: string;
    thumbnail: ShortsLockupViewModelThumbnail;
    onTap: ShortsLockupViewModelOnTap;
    inlinePlayerData: InlinePlayerData;
    menuOnTap: MenuOnTap;
    indexInCollection: number;
    menuOnTapA11yLabel: string;
    overlayMetadata: OverlayMetadata;
    loggingDirectives: ShortsLockupViewModelLoggingDirectives;
}

export interface InlinePlayerData {
    onVisible: OnVisible;
}

export interface OnVisible {
    innertubeCommand: OnVisibleInnertubeCommand;
}

export interface OnVisibleInnertubeCommand {
    clickTrackingParams: string;
    commandMetadata: EndpointCommandMetadata;
    watchEndpoint: InnertubeCommandWatchEndpoint;
}

export interface InnertubeCommandWatchEndpoint {
    videoId: string;
    playerParams: string;
}

export interface ShortsLockupViewModelLoggingDirectives {
    trackingParams: string;
    visibility: Visibility;
    enableDisplayloggerExperiment: boolean;
}

export interface Visibility {
    types: string;
}

export interface MenuOnTap {
    innertubeCommand: MenuOnTapInnertubeCommand;
}

export interface MenuOnTapInnertubeCommand {
    clickTrackingParams: string;
    showSheetCommand: ShowSheetCommand;
}

export interface ShowSheetCommand {
    panelLoadingStrategy: PanelLoadingStrategy;
}

export interface PanelLoadingStrategy {
    inlineContent: InlineContent;
}

export interface InlineContent {
    sheetViewModel: SheetViewModel;
}

export interface SheetViewModel {
    content: SheetViewModelContent;
}

export interface SheetViewModelContent {
    listViewModel: ListViewModel;
}

export interface ListViewModel {
    listItems: ListItem[];
}

export interface ListItem {
    listItemViewModel: ListItemViewModel;
}

export interface ListItemViewModel {
    title: PrimaryText;
    leadingImage: LeadingImage;
    rendererContext: RendererContext;
}

export interface LeadingImage {
    sources: Source[];
}

export interface Source {
    clientResource: ClientResource;
}

export interface ClientResource {
    imageName: string;
}

export interface RendererContext {
    commandContext: CommandContext;
}

export interface CommandContext {
    onTap: CommandContextOnTap;
}

export interface CommandContextOnTap {
    innertubeCommand: InnertubeCommandClass;
}

export interface PrimaryText {
    content: string;
}

export interface ShortsLockupViewModelOnTap {
    innertubeCommand: OnTapInnertubeCommand;
}

export interface OnTapInnertubeCommand {
    clickTrackingParams: string;
    commandMetadata: EndpointCommandMetadata;
    reelWatchEndpoint: ReelWatchEndpoint;
}

export interface ReelWatchEndpoint {
    videoId: string;
    playerParams: string;
    thumbnail: ReelWatchEndpointThumbnail;
    overlay: Overlay;
    params: string;
    sequenceProvider: string;
    sequenceParams: string;
    loggingContext: ReelWatchEndpointLoggingContext;
    ustreamerConfig: string;
}

export interface ReelWatchEndpointLoggingContext {
    vssLoggingContext: LoggingContext;
    qoeLoggingContext: LoggingContext;
}

export interface Overlay {
    reelPlayerOverlayRenderer: ReelPlayerOverlayRenderer;
}

export interface ReelPlayerOverlayRenderer {
    style: string;
    trackingParams: string;
    reelPlayerNavigationModel: string;
}

export interface ReelWatchEndpointThumbnail {
    thumbnails: SourceElement[];
    isOriginalAspectRatio: boolean;
}

export interface OverlayMetadata {
    primaryText: PrimaryText;
    secondaryText: PrimaryText;
}

export interface ShortsLockupViewModelThumbnail {
    sources: SourceElement[];
}

export interface VideoWithContextRenderer {
    headline: HeadlineClass;
    thumbnail: SidebarThumbnailElement;
    shortBylineText: BylineText;
    lengthText: HeadlineClass;
    shortViewCountText: HeadlineClass;
    navigationEndpoint: VideoWithContextRendererNavigationEndpoint;
    menu: Menu;
    isWatched: boolean;
    trackingParams: string;
    videoId: string;
    thumbnailOverlays: VideoWithContextRendererThumbnailOverlay[];
    channelThumbnail: ChannelThumbnail;
    publishedTimeText?: TitleElement;
    richThumbnail?: RichThumbnail;
    accessibility: AccessibilityData;
    inlinePlaybackEndpoint: InlinePlaybackEndpoint;
}

export interface InlinePlaybackEndpoint {
    clickTrackingParams: string;
    commandMetadata: InlinePlaybackEndpointCommandMetadata;
    watchEndpoint: InlinePlaybackEndpointWatchEndpoint;
}

export interface InlinePlaybackEndpointCommandMetadata {
    webCommandMetadata?: WebCommandMetadata;
    "webCommandMetad  \u000d\nata"?: WebCommandMetadata;
}

export interface InlinePlaybackEndpointWatchEndpoint {
    videoId: string;
    params: Params;
    playerParams: PlayerParams;
}

export enum Params {
    The8GMFDDZ9KTw3D = "8gMFDdZ9kTw%3D",
}

export enum PlayerParams {
    Yahiaqe3D = "YAHIAQE%3D",
    YgUQbGVsbyBubyBjb250ZW1WdA3D3D = "ygUQbGVsbyBubyBjb250ZW1wdA%3D%3D",
}

export interface Menu {
    menuRenderer: MenuMenuRenderer;
}

export interface MenuMenuRenderer {
    items: FluffyItem[];
    trackingParams: string;
    accessibility: AccessibilityData;
}

export interface FluffyItem {
    menuNavigationItemRenderer: FluffyMenuNavigationItemRenderer;
}

export interface FluffyMenuNavigationItemRenderer {
    text: TitleElement;
    navigationEndpoint: PurpleNavigationEndpoint;
    trackingParams: string;
}

export interface PurpleNavigationEndpoint {
    clickTrackingParams: string;
    commandMetadata: EndpointCommandMetadata;
    signInEndpoint: SignInEndpoint;
}

export interface SignInEndpoint {
    hack: boolean;
}

export interface VideoWithContextRendererNavigationEndpoint {
    clickTrackingParams: string;
    commandMetadata: EndpointCommandMetadata;
    watchEndpoint: InlinePlaybackEndpointWatchEndpoint;
}

export interface RichThumbnail {
    movingThumbnailRenderer: MovingThumbnailRenderer;
}

export interface MovingThumbnailRenderer {
    movingThumbnailDetails: MovingThumbnailDetails;
}

export interface MovingThumbnailDetails {
    thumbnails: SourceElement[];
    logAsMovingThumbnail: boolean;
}

export interface VideoWithContextRendererThumbnailOverlay {
    thumbnailOverlayTimeStatusRenderer: ThumbnailOverlayTimeStatusRenderer;
}

export interface ThumbnailOverlayTimeStatusRenderer {
    text: HeadlineClass;
    style: Style;
}

export enum Style {
    Default = "DEFAULT",
}

export interface Continuation {
    reloadContinuationData: ReloadContinuationData;
}

export interface ReloadContinuationData {
    continuation: string;
    clickTrackingParams: string;
}

export interface SubMenu {
    searchSubMenuRenderer: SearchSubMenuRenderer;
}

export interface SearchSubMenuRenderer {
    title: TitleElement;
    groups: Group[];
    trackingParams: string;
}

export interface Group {
    searchFilterGroupRenderer: SearchFilterGroupRenderer;
}

export interface SearchFilterGroupRenderer {
    title: LabelClass;
    filters: Filter[];
    trackingParams: string;
}

export interface Filter {
    searchFilterRenderer: SearchFilterRenderer;
}

export interface SearchFilterRenderer {
    label: LabelClass;
    status?: string;
    navigationEndpoint: SearchFilterRendererNavigationEndpoint;
    tooltip: string;
    trackingParams: string;
}

export interface LabelClass {
    simpleText: string;
}

export interface SearchFilterRendererNavigationEndpoint {
    clickTrackingParams: string;
    commandMetadata: EndpointCommandMetadata;
    searchEndpoint: NavigationEndpointSearchEndpoint;
}

export interface NavigationEndpointSearchEndpoint {
    query: string;
    params?: string;
}

export interface FrameworkUpdates {
    entityBatchUpdate: EntityBatchUpdate;
}

export interface EntityBatchUpdate {
    mutations: Mutation[];
    timestamp: Timestamp;
}

export interface Mutation {
    entityKey: string;
    type: string;
    payload: Payload;
}

export interface Payload {
    subscriptionStateEntity: SubscriptionStateEntity;
}

export interface SubscriptionStateEntity {
    key: string;
    subscribed: boolean;
}

export interface Timestamp {
    seconds: string;
    nanos: number;
}

export interface ResponseContext {
    serviceTrackingParams: ServiceTrackingParam[];
    webResponseContextExtensionData: WebResponseContextExtensionData;
}

export interface ServiceTrackingParam {
    service: string;
    params: Param[];
}

export interface WebResponseContextExtensionData {
    webResponseContextPreloadData: WebResponseContextPreloadData;
    ytConfigData: YtConfigData;
    hasDecorated: boolean;
}

export interface WebResponseContextPreloadData {
    preloadMessageNames: string[];
}

export interface YtConfigData {
    visitorData: string;
    rootVisualElementType: number;
}

export interface Topbar {
    mobileTopbarRenderer: MobileTopbarRenderer;
}

export interface MobileTopbarRenderer {
    trackingParams: string;
    searchCommand: SearchCommand;
    voiceSearchButton: VoiceSearchButtonClass;
    topbarLogo: TopbarLogo;
}

export interface SearchCommand {
    clickTrackingParams: string;
    commandMetadata: EndpointCommandMetadata;
    searchEndpoint: SearchCommandSearchEndpoint;
}

export interface SearchCommandSearchEndpoint {
    params: string;
    hack: boolean;
}

export interface TopbarLogo {
    topbarLogoRenderer: TopbarLogoRenderer;
}

export interface TopbarLogoRenderer {
    iconImage: Icon;
    tooltipText: TitleElement;
    endpoint: Endpoint;
    trackingParams: string;
    overrideEntityKey: string;
}

export interface VoiceSearchDialogRenderer {
    placeholderHeader: TitleElement;
    promptHeader: TitleElement;
    exampleQuery1: TitleElement;
    exampleQuery2: TitleElement;
    promptMicrophoneLabel: TitleElement;
    loadingHeader: TitleElement;
    connectionErrorHeader: TitleElement;
    connectionErrorMicrophoneLabel: TitleElement;
    permissionsHeader: TitleElement;
    permissionsSubtext: TitleElement;
    disabledHeader: TitleElement;
    disabledSubtext: TitleElement;
    microphoneButtonAriaLabel: TitleElement;
    exitButton: VoiceSearchButtonClass;
    trackingParams: string;
    microphoneOffPromptHeader: TitleElement;
}

export interface FluffyPopup {
    voiceSearchDialogRenderer: VoiceSearchDialogRenderer;
}

export interface FluffyOpenPopupAction {
    popup: FluffyPopup;
    popupType: string;
}

export interface FluffyAction {
    clickTrackingParams: string;
    openPopupAction: FluffyOpenPopupAction;
}

export interface ServiceEndpointSignalServiceEndpoint {
    signal: string;
    actions: FluffyAction[];
}

export interface FluffyServiceEndpoint {
    clickTrackingParams: string;
    commandMetadata: OnUnsubscribeEndpointCommandMetadata;
    signalServiceEndpoint: ServiceEndpointSignalServiceEndpoint;
}

export interface VoiceSearchButtonButtonRenderer {
    style: string;
    size: string;
    isDisabled: boolean;
    serviceEndpoint?: FluffyServiceEndpoint;
    icon: Icon;
    tooltip?: string;
    trackingParams: string;
    accessibilityData: AccessibilityData;
}

export interface VoiceSearchButtonClass {
    buttonRenderer: VoiceSearchButtonButtonRenderer;
}
