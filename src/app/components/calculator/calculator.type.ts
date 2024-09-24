export type Calculator = {
    id: number
    name: string
    element: {
        id: number
        name: string
        icon?: 'heart' | 'thunder' | 'sparkle' | Blob
        color: string
        resultDefault: number
        resultActual: number
        customOperations: {
            operator: '+' | '-' | 'x' | '/'
            numberToApply: number
            color: string,
        }[]
    }[]
}