export interface Channel {
    channelId: string
    thumbnail: Thumbnail
    displayName: DisplayName
    videoCountText: VideoCountText
    subscriberCountText: SubscriberCountText
    navigationEndpoint: NavigationEndpoint
    title: Title
    subscribeButton: SubscribeButton
    ownerBadges: OwnerBadge[]
    trackingParams: string
    tvBanner: TvBanner
}

interface Thumbnail {
    thumbnails: Thumbnail2[]
}

interface Thumbnail2 {
    url: string
    width: number
    height: number
}

interface DisplayName {
    runs: Run[]
}

interface Run {
    text: string
}

interface VideoCountText {
    runs: Run2[]
    accessibility: Accessibility
}

interface Run2 {
    text: string
}

interface Accessibility {
    accessibilityData: AccessibilityData
}

interface AccessibilityData {
    label: string
}

interface SubscriberCountText {
    runs: Run3[]
}

interface Run3 {
    text: string
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

interface Title {
    runs: Run4[]
    accessibility: Accessibility2
}

interface Run4 {
    text: string
}

interface Accessibility2 {
    accessibilityData: AccessibilityData2
}

interface AccessibilityData2 {
    label: string
}

interface SubscribeButton {
    subscribeButtonRenderer: SubscribeButtonRenderer
}

interface SubscribeButtonRenderer {
    buttonText: ButtonText
    subscribed: boolean
    enabled: boolean
    type: string
    channelId: string
    showPreferences: boolean
    subscribedButtonText: SubscribedButtonText
    unsubscribedButtonText: UnsubscribedButtonText
    trackingParams: string
    unsubscribeButtonText: UnsubscribeButtonText
    subscribeAccessibility: SubscribeAccessibility
    unsubscribeAccessibility: UnsubscribeAccessibility
    subscribedEntityKey: string
    onSubscribeEndpoints: OnSubscribeEndpoint[]
    onUnsubscribeEndpoints: OnUnsubscribeEndpoint[]
}

interface ButtonText {
    runs: Run5[]
}

interface Run5 {
    text: string
}

interface SubscribedButtonText {
    runs: Run6[]
}

interface Run6 {
    text: string
}

interface UnsubscribedButtonText {
    runs: Run7[]
}

interface Run7 {
    text: string
}

interface UnsubscribeButtonText {
    runs: Run8[]
}

interface Run8 {
    text: string
}

interface SubscribeAccessibility {
    accessibilityData: AccessibilityData3
}

interface AccessibilityData3 {
    label: string
}

interface UnsubscribeAccessibility {
    accessibilityData: AccessibilityData4
}

interface AccessibilityData4 {
    label: string
}

interface OnSubscribeEndpoint {
    clickTrackingParams: string
    commandMetadata: CommandMetadata2
    subscribeEndpoint: SubscribeEndpoint
}

interface CommandMetadata2 {
    webCommandMetadata: WebCommandMetadata2
}

interface WebCommandMetadata2 {
    sendPost: boolean
    apiUrl: string
}

interface SubscribeEndpoint {
    channelIds: string[]
    params: string
}

interface OnUnsubscribeEndpoint {
    clickTrackingParams: string
    commandMetadata: CommandMetadata3
    signalServiceEndpoint: SignalServiceEndpoint
}

interface CommandMetadata3 {
    webCommandMetadata: WebCommandMetadata3
}

interface WebCommandMetadata3 {
    sendPost: boolean
}

interface SignalServiceEndpoint {
    signal: string
    actions: Action[]
}

interface Action {
    clickTrackingParams: string
    openPopupAction: OpenPopupAction
}

interface OpenPopupAction {
    popup: Popup
    popupType: string
}

interface Popup {
    confirmDialogRenderer: ConfirmDialogRenderer
}

interface ConfirmDialogRenderer {
    trackingParams: string
    dialogMessages: DialogMessage[]
    confirmButton: ConfirmButton
    cancelButton: CancelButton
    primaryIsCancel: boolean
}

interface DialogMessage {
    runs: Run9[]
}

interface Run9 {
    text: string
}

interface ConfirmButton {
    buttonRenderer: ButtonRenderer
}

interface ButtonRenderer {
    style: string
    size: string
    isDisabled: boolean
    text: Text
    serviceEndpoint: ServiceEndpoint
    accessibility: Accessibility3
    trackingParams: string
}

interface Text {
    runs: Run10[]
}

interface Run10 {
    text: string
}

interface ServiceEndpoint {
    clickTrackingParams: string
    commandMetadata: CommandMetadata4
    unsubscribeEndpoint: UnsubscribeEndpoint
}

interface CommandMetadata4 {
    webCommandMetadata: WebCommandMetadata4
}

interface WebCommandMetadata4 {
    sendPost: boolean
    apiUrl: string
}

interface UnsubscribeEndpoint {
    channelIds: string[]
    params: string
}

interface Accessibility3 {
    label: string
}

interface CancelButton {
    buttonRenderer: ButtonRenderer2
}

interface ButtonRenderer2 {
    style: string
    size: string
    isDisabled: boolean
    text: Text2
    accessibility: Accessibility4
    trackingParams: string
}

interface Text2 {
    runs: Run11[]
}

interface Run11 {
    text: string
}

interface Accessibility4 {
    label: string
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

interface TvBanner {
    thumbnails: Thumbnail3[]
}

interface Thumbnail3 {
    url: string
    width: number
    height: number
}
