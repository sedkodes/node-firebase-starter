export type Transaction = {
    userId: String
    type: TransactionType
    date: Object
}

export enum TransactionType {
    BUY = "buy",
    SELL = "sell",
    DEPOSIT = "deposit",
    WITHDRAW = "withdraw"
}

export enum TransactionStatus {
    ACCEPTED = "accepted",
    FILLED = "filled",
}

export type BuySellTransaction = Transaction & {
    symbol: String
    notional?: String
    qty?: Number
    status: TransactionStatus
}

export type FilledBuySellTransaction = BuySellTransaction & {
    price: Float32Array
    cashAmount: number
    filled_at: Object
}

export enum UserStatus {
    NEW = "new",
    READY = "ready",
    KYC_SUBMITTED = "kyc-finished",
}

export type User = {
    status: UserStatus
    id: string
    name: string
    email: string
    accounts?: PlaidAccount[]
    plaidReady?: boolean
    alpacaReady?: boolean
    plaidAccessToken?: string
    processorToken?: string
    brokerDetails?: AlpacaDetails
}

export type AlpacaDetails = {
    id: string
    account_number: string,
    status: string,
    crypto_status: string,
    currency: string,
    last_equity: string,
    created_at: string,
    ach_relationship_id?: string
}

export enum DatabaseUrls {
    TRANSACTIONS = "transactions",
    RAW_ORDERS = "rawOrders",
    USERS = `users`,
    CRONJOBS = `cronjobs`,
    CRONJOBS_DEPOSITS = `deposits`,
    CRONJOBS_ORDERS = `orders`
}

export type PlaidAccount = {
    account_id: string,
    balances: {
        available: number,
        current: number,
        iso_currency_code: string
    },
    mask: string,
    name: string,
    official_name: string,
    subtype: PlaidAccountTypes,
    type: string,
}

export enum PlaidAccountTypes {
    CHECKING = "checking",
    SAVINGS = "savings"
}

export type CronJobItem = {
    status: CronjobStatus,
    userId: string
    amount: number
}

export enum CronjobType {
    EXECUTE_ORDERS = "execute_orders",
    SCHEDULE_DEPOSITS = "schedule_deposits",
    EXECUTE_DEPOSITS = "execute_deposits"
}

export enum CronjobStatus {
    ACCEPTED = "ACCEPTED",
    FINISHED = "FINISHED",
    FAILED = "FAILED",
}