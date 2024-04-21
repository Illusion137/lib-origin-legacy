export type Collection = {
    data: {
        me: {
            library: {
                tracks: {
                    __typename: string
                    items: Array<{
                        __typename: string
                        addedAt: {
                            isoString: string
                        }
                        track: {
                            _uri: string
                            data: {
                                __typename: string
                                albumOfTrack: {
                                    artists: {
                                        items: Array<{
                                            profile: {
                                                name: string
                                            }
                                            uri: string
                                        }>
                                    }
                                    coverArt: {
                                        sources: Array<{
                                            height: number
                                            url: string
                                            width: number
                                        }>
                                    }
                                    name: string
                                    uri: string
                                }
                                artists: {
                                    items: Array<{
                                        profile: {
                                            name: string
                                        }
                                        uri: string
                                    }>
                                }
                                associations: {
                                    associatedVideos: {
                                        totalCount: number
                                    }
                                }
                                contentRating: {
                                    label: string
                                }
                                discNumber: number
                                duration: {
                                    totalMilliseconds: number
                                }
                                name: string
                                playability: {
                                    playable: boolean
                                }
                                trackNumber: number
                            }
                        }
                    }>
                    pagingInfo: {
                        limit: number
                        offset: number
                    }
                    totalCount: number
                }
            }
        }
    }
    extensions: {}
}
