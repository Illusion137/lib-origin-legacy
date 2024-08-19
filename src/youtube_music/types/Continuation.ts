export type Continutation = Continutation0[]

export interface Continutation0 {
  nextContinuationData: NextContinuationData
}

export interface NextContinuationData {
  continuation: string
  clickTrackingParams: string
}
