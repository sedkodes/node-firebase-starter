export function dateObjectToYYYYMMDD(date: Date) {
    return date.toISOString().split('T')[0]
}