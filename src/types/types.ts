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
    USERS = `users`,
}