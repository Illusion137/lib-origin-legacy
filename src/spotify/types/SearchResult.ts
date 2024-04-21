export type SearchResult = {
    data: {
        searchV2: {
            albumsV2: {
                __typename: string
                items: Array<{
                    __typename: string
                    data: {
                        __typename: string
                        artists: {
                            items: Array<{
                                profile: {
                                    name: string
                                }
                                uri: string
                            }>
                        }
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
                        date: {
                            year: number
                        }
                        name: string
                        uri: string
                    }
                }>
                totalCount: number
            }
            artists: {
                items: Array<{
                    __typename: string
                    data: {
                        __typename: string
                        profile: {
                            name: string
                            verified: boolean
                        }
                        uri: string
                        visuals: {
                            avatarImage?: {
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
                    }
                }>
                totalCount: number
            }
            audiobooks: {
                items: Array<{
                    __typename: string
                    data: {
                        __typename: string
                        accessInfo: any
                        authors: Array<{
                            name: string
                        }>
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
                        isPreRelease: boolean
                        mediaType: string
                        name: string
                        publishDate: {
                            isoString: string
                        }
                        topics: {
                            items: Array<any>
                        }
                        uri: string
                    }
                }>
                totalCount: number
            }
            chipOrder: {
                items: Array<{
                    typeName: string
                }>
            }
            episodes: {
                items: Array<{
                    __typename: string
                    data: {
                        __typename: string
                        contentRating: {
                            label: string
                        }
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
                        description: string
                        duration: {
                            totalMilliseconds: number
                        }
                        mediaTypes: Array<string>
                        name: string
                        playability: {
                            reason: string
                        }
                        playedState: {
                            playPositionMilliseconds: number
                            state: string
                        }
                        podcastV2: {
                            __typename: string
                            data: {
                                __typename: string
                                coverArt: {
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
                        releaseDate: {
                            isoString: string
                            precision: string
                        }
                        restrictions: {
                            paywallContent: boolean
                        }
                        uri: string
                    }
                }>
                totalCount: number
            }
            genres: {
                items: Array<any>
                totalCount: number
            }
            playlists: {
                items: Array<{
                    __typename: string
                    data: {
                        __typename: string
                        attributes: Array<{
                            key: string
                            value: string
                        }>
                        description: string
                        format: string
                        images: {
                            items: Array<{
                                extractedColors: {
                                    colorDark: {
                                        hex: string
                                        isFallback: boolean
                                    }
                                }
                                sources: Array<{
                                    height?: number
                                    url: string
                                    width?: number
                                }>
                            }>
                        }
                        name: string
                        ownerV2: {
                            __typename: string
                            data: {
                                __typename: string
                                avatar: {
                                    sources: Array<{
                                        height: number
                                        url: string
                                        width: number
                                    }>
                                }
                                name: string
                                uri: string
                                username: string
                            }
                        }
                        uri: string
                    }
                }>
                totalCount: number
            }
            podcasts: {
                items: Array<{
                    __typename: string
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
                        topics: {
                            items: Array<{
                                __typename: string
                                title: string
                                uri: string
                            }>
                        }
                        uri: string
                    }
                }>
                totalCount: number
            }
            topResultsV2: {
                featured: Array<{
                    __typename: string
                    data: {
                        __typename: string
                        attributes: Array<{
                            key: string
                            value: string
                        }>
                        description: string
                        format: string
                        images: {
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
                        name: string
                        ownerV2: {
                            __typename: string
                            data: {
                                __typename: string
                                avatar: {
                                    sources: Array<{
                                        height: number
                                        url: string
                                        width: number
                                    }>
                                }
                                name: string
                                uri: string
                                username: string
                            }
                        }
                        uri: string
                    }
                }>
                itemsV2: Array<{
                    item: {
                        __typename: string
                        data: {
                            __typename: string
                            albumOfTrack?: {
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
                                id: string
                                name: string
                                uri: string
                            }
                            artists?: {
                                items: Array<{
                                    profile: {
                                        name: string
                                    }
                                    uri: string
                                }>
                            }
                            associations?: {
                                associatedVideos: {
                                    totalCount: number
                                }
                            }
                            contentRating?: {
                                label: string
                            }
                            duration?: {
                                totalMilliseconds: number
                            }
                            id?: string
                            name?: string
                            playability?: {
                                playable: boolean
                            }
                            uri: string
                            profile?: {
                                name: string
                                verified: boolean
                            }
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
                            attributes?: Array<any>
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
                                        height: number
                                        url: string
                                        width: number
                                    }>
                                }>
                            }
                            ownerV2?: {
                                __typename: string
                                data: {
                                    __typename: string
                                    avatar: {
                                        sources: Array<{
                                            height: number
                                            url: string
                                            width: number
                                        }>
                                    }
                                    name: string
                                    uri: string
                                    username: string
                                }
                            }
                        }
                    }
                    matchedFields: Array<string>
                }>
            }
            tracksV2: {
                items: Array<{
                    item: {
                        __typename: string
                        data: {
                            __typename: string
                            albumOfTrack: {
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
                                id: string
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
                            duration: {
                                totalMilliseconds: number
                            }
                            id: string
                            name: string
                            playability: {
                                playable: boolean
                            }
                            uri: string
                        }
                    }
                    matchedFields: Array<string>
                }>
                totalCount: number
            }
            users: {
                items: Array<{
                    __typename: string
                    data: {
                        __typename: string
                        avatar?: {
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
                        id: string
                        displayName: string
                        uri: string
                        username: string
                    }
                }>
                totalCount: number
            }
        }
    }
    extensions: {
        requestIds: {
            "/searchV2": {
                "search-api": string
            }
            "/searchV2/topResultsV2": {
                "search-api": string
            }
        }
    }
}
