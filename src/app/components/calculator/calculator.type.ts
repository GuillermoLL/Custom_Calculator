export enum Icon {
    HEART = 'heart',
    THUNDER = 'thunder',
    SPARKLE = 'sparkle',
}

export enum Operator {
    ADDITION = '+',
    SUBTRACTION = '-',
    MULTIPLICATION = 'x',
    DIVISION = '/',
}

export enum OtherOperator {
    CORRECT = 'C',
    DELETE = 'Del',
    EQUAL = '='
}

export enum Color {
    RED = '#a83232',
    BLUE = '#324ea8',
    YELLOW = '#c0c23a',
    ORANGE = '#a85b32',
    GREEN = '#36a832',
    PURPLE = '#8732a8',
    WHITE = '#ffffff',
    BLACK = '#292b2e',
}

export type Calculator = {
    id: number
    name: string
    entity: Entity[]
}

export type Entity = {
    id: number
    name: string
    icon?: Icon | Blob | string
    color: Color
    resultDefault: number
    resultCurrent: number
    customOperations: Operation[]
}

export type Operation = {
    operator: Operator
    numberToApply: number
    color: Color
}   
