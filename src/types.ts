export enum UserRoles {
    DRIVER = "driver",
    CLEANER = "cleaner",
    ADMIN = "admin"
}

export type User = {
    id: string
    name: string
    email: string
    roles: UserRoles[]
}

export enum DatabaseUrls {
    TRANSACTIONS = "transactions",
    RAW_ORDERS = "rawOrders",
    USERS = `users`,
    CRONJOBS = `cronjobs`,
    CRONJOBS_DEPOSITS = `deposits`,
    CRONJOBS_ORDERS = `orders`
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