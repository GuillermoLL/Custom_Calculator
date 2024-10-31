export enum Icon {
    HEART = 'droplet',
    THUNDER = 'lightning-charge',
    SPARKLE = 'brightness-high',
    MOON = 'moon',
    UNKNOWN = 'question-lg'
}

export enum Color {
    RED = '#a83232',
    BLUE = '#324ea8',
    YELLOW = '#c0c23a',
    ORANGE = '#c9700b',
    GREEN = '#36a832',
    PURPLE = '#8732a8',
    GREY = '#495057',
    WHITE = '#ffffff',
    BLACK = '#292b2e',
}

export enum Operator {
    ADDITION = 'plus',
    SUBTRACTION = 'dash',
    MULTIPLICATION = 'x',
    DIVISION = 'slash',
}

export enum OtherOperator {
    CORRECT = 'backspace',
    DELETE = 'Del',
    EQUAL = '=',
    RELOAD = 'arrow-counterclockwise',
    BEFORE = 'arrow-90deg-left'
}

export type Calculator = {
    id: string
    name: string
    entity: Entity[]
}

export type Entity = {
    id: number
    name: string
    icon?: Icon
    color: Color
    resultDefault: number
    resultCurrent: number
    options: Options
    customOperations: Operation[]
}

export type Options = {
    [key: string]: boolean
    numberOverflow: boolean
    numberDecimals: boolean
    clearOperationWhenOperate: boolean
    clearOperationWhenSelectOperator: boolean
    // Valor digitLimit -> depende clearOperationWhenSelectEntity 
    // Pero valor clearOperationWhenSelectEntity !-> NO depende digitLimit 
    clearOperationWhenSelectEntity: boolean
    digitLimit: boolean
}

export type Operation = {
    operator: Operator
    numberToApply: number
    color: Color
}

