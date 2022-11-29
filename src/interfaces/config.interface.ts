interface ConfigDatabase {
    host: string
    username: string
    password: string
    database: string
    port: number
    charset: string
}

export interface Config {
    database: ConfigDatabase
}