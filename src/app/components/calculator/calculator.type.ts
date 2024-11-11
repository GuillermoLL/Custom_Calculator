export enum Icon {
    THUNDER = 'lightning-charge',
    SPARKLE = 'brightness-high',
    MOON = 'moon',
    MOON2 = 'moon-stars',
    UNKNOWN = 'question-lg',
    AIRPLANE = 'airplane',
    ALARM = 'alarm',
    BACKPACK = 'backpack2',
    BALLOON = 'balloon',
    BALLOONHEART = 'balloon-heart',
    BANCK = 'bank',
    BOOK = 'book',
    BOX = 'box-seam',
    BRILLIANCE = 'brilliance',
    BUG = 'bug',
    CAKE = 'cake2',
    CAMERA = 'camera-video',
    MEDICINE = 'capsule-pill',
    CASH = 'cash-coin',
    CLOCK = 'clock',
    CLOUD1 = 'cloudy',
    CLOUD2 = 'cloud-moon',
    CONE = 'cone-striped',
    CREDIT = 'credit-card',
    CPU = 'cpu',
    COOKIE = 'cookie',
    DICE1 = 'dice-1',
    DICE2 = 'dice-2',
    DICE3 = 'dice-3',
    DICE4 = 'dice-4',
    DICE5 = 'dice-5',
    DICE6 = 'dice-6',
    DISC = 'disc',
    HEART = 'droplet',
    HEART2 = 'heart',
    EXCLAMATION = 'exclamation-lg',
    EYE = 'eye',
    EYE2 = 'eye-slash',
    EYEDROPPER = 'eyedropper',
    EYEGLASSES = 'eyeglasses',
    FILM = 'film',
    FIRE = 'fire',
    FLAG = 'flag',
    FLOPPY = 'flppy',
    FLOWER = 'flower3',
    FLORDER = 'folder',
    GEM = 'gem',
    GENDER1 = 'gender-ambiguous',
    GENDER2 = 'gender-female',
    GENDER3 = 'gender-male',
    GENDER4 = 'gender-neuter',
    GENDER5 = 'gender-trans',
    GIFT = 'gift',
    GLOBE = 'globe-americas',
    LIKE = 'hand-thumbs-up',
    DISLIKE = 'hand-thumbs-down',
    HOURGLASS = 'hourglass',
    HOUSE = 'house',
    LAMP = 'lamp',
    LIGHTBULB = 'lightbulb',
    MAGIC = 'magic',
    MUSIC = 'music-note',
    MUSIC2 = 'music-note-beamed',
    NUT = 'nut',
    PAINTBUCKET = 'paint-bucket',
    PALETTE = 'palette',
    PAPERCLIP = 'paperclip',
    USER = 'person',
    PHONE = 'phone',
    RADIOACTIVE = 'radioactive',
    ROCKET = 'rocket',
    ROCKET2 = 'rocket-takeoff',
    SCISSORS = 'scissors',
    SD = 'sd-card',
    SHIELD = 'shield',
    STOP = 'sign-stop',
    SNOW = 'snow',
    SNOW2 = 'snow2',
    SNOW3 = 'snow3',
    STAR = 'star',
    STAR2 = 'stars',
    STOPWATCH = 'stopwatch',
    CLUB = 'suit-club',
    DIAMOND = 'suit-diamond',
    HEART3 = 'suit-heart',
    SPADE = 'suit-spade',
    THERMOMETER = 'thermometer-half',
    TICKET = 'ticket',
    TRASH1 = 'trash3',
    TRASH2 = 'trash2',
    TREE = 'tree',
    TROPHY = 'trophy',
    TRUCK1 = 'truck',
    TRUCK2 = 'truck-flatbed',
    WAVE = 'tsunami',
    UMBRELLA = 'umbrella',
    LOCK = 'lock',
    UNLOCK = 'unlock',
    USB = 'usb-drive',
    VIRUS = 'virus2',
    WALLET = 'wallet2',
    WATER = 'water',
    YINYANG = 'yin-yang'
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

