export type UserPlaylist = {
    data: {
        albumUnion: {
            __typename: string
            copyright: {
                items: Array<{
                    text: string
                    type: string
                }>
                totalCount: number
            }
            courtesyLine: string
            date: {
                isoString: string
                precision: string
            }
            label: string
            name: string
            playability: {
                playable: boolean
                reason: string
            }
            saved: boolean
            sharingInfo: {
                shareId: string
                shareUrl: string
            }
            tracks: {
                items: Array<{
                    track: {
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
                        playcount: string
                        relinkingInformation: any
                        saved: boolean
                        trackNumber: number
                        uri: string
                    }
                    uid: string
                }>
                totalCount: number
            }
            type: string
            uri: string
            artists: {
                items: Array<{
                    id: string
                    profile: {
                        name: string
                    }
                    sharingInfo: {
                        shareUrl: string
                    }
                    uri: string
                    visuals: {
                        avatarImage: {
                            sources: Array<{
                                height: number
                                url: string
                                width: number
                            }>
                        }
                    }
                }>
                totalCount: number
            }
            coverArt: {
                extractedColors: {
                    colorDark: {
                        hex: string
                    }
                    colorLight: {
                        hex: string
                    }
                    colorRaw: {
                        hex: string
                    }
                }
                sources: Array<{
                    height: number
                    url: string
                    width: number
                }>
            }
            discs: {
                items: Array<{
                    number: number
                    tracks: {
                        totalCount: number
                    }
                }>
                totalCount: number
            }
            releases: {
                items: Array<any>
                totalCount: number
            }
            moreAlbumsByArtist: {
                items: Array<{
                    discography: {
                        popularReleasesAlbums: {
                            items: Array<{
                                coverArt: {
                                    sources: Array<{
                                        height: number
                                        url: string
                                        width: number
                                    }>
                                }
                                date: {
                                    year: number
                                }
                                id: string
                                name: string
                                playability: {
                                    playable: boolean
                                    reason: string
                                }
                                sharingInfo: {
                                    shareId: string
                                    shareUrl: string
                                }
                                type: string
                                uri: string
                            }>
                        }
                    }
                }>
            }
        }
    }
    extensions: {}
}