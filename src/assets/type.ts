export interface GetSearch {
    (key: string, url?: string): string | null
}
export interface SetSearch {
    (key: string, val: string, url?: string): string
}
export interface TypeJudge {
    (data: any, type?: string): string | boolean
}