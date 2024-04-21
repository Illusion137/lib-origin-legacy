export type Home = {
    data: {
        home: {
            __typename: string
            greeting: {
                text: string
            }
            sectionContainer: {
                sections: {
                    items: Array<{
                        data: {
                            __typename: string
                            title: {
                                text: string
                            }
                        }
                        sectionItems: {
                            items: Array<{
                                data: any
                                content: {
                                    __typename: string
                                    data: {
                                        __typename: string
                                        profile?: {
                                            name: string
                                        }
                                        uri?: string
                                        visuals?: {
                                            avatarImage: {
                                                extractedColors: {
                                                    colorDark: {
                                                        hex: string
                                                        isFallback: boolean
                                                    }
                                                }
                                                sources: Array<{
                                                    height: number
                                                    url: string
                                                    width: number
                                                }>
                                            }
                                        }
                                        artists?: {
                                            items: Array<{
                                                profile: {
                                                    name: string
                                                }
                                                uri: string
                                            }>
                                        }
                                        coverArt?: {
                                            extractedColors: {
                                                colorDark: {
                                                    hex: string
                                                    isFallback: boolean
                                                }
                                            }
                                            sources: Array<{
                                                height: number
                                                url: string
                                                width: number
                                            }>
                                        }
                                        name?: string
                                        attributes?: Array<{
                                            key: string
                                            value: string
                                        }>
                                        description?: string
                                        format?: string
                                        images?: {
                                            items: Array<{
                                                extractedColors: {
                                                    colorDark: {
                                                        hex: string
                                                        isFallback: boolean
                                                    }
                                                }
                                                sources: Array<{
                                                    height: any
                                                    url: string
                                                    width: any
                                                }>
                                            }>
                                        }
                                        ownerV2?: {
                                            data: {
                                                __typename: string
                                                name: string
                                            }
                                        }
                                        mediaType?: string
                                        publisher?: {
                                            name: string
                                        }
                                        contentRating?: {
                                            label: string
                                        }
                                        duration?: {
                                            totalMilliseconds: number
                                        }
                                        playedState?: {
                                            playPositionMilliseconds: number
                                            state: string
                                        }
                                        podcastV2?: {
                                            data: {
                                                __typename: string
                                                coverArt: {
                                                    extractedColors: {
                                                        colorDark: {
                                                            hex: string
                                                            isFallback: boolean
                                                        }
                                                    }
                                                    sources: Array<{
                                                        height: number
                                                        url: string
                                                        width: number
                                                    }>
                                                }
                                                mediaType: string
                                                name: string
                                                publisher: {
                                                    name: string
                                                }
                                                uri: string
                                            }
                                        }
                                        releaseDate?: {
                                            isoString: string
                                        }
                                        videoThumbnailImage: any
                                        accessInfo: any
                                        authors?: Array<{
                                            name: string
                                        }>
                                    }
                                }
                                uri: string
                            }>
                            totalCount: number
                        }
                        uri: string
                    }>
                    totalCount: number
                }
                uri: string
            }
            homeChips: Array<{
                id: string
                label: {
                    originalLabel: {
                        baseText: {
                            text: string
                        }
                    }
                    text: string
                }
            }>
        }
    }
    extensions: {}
}  