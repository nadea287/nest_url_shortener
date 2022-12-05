import {Config} from "../interfaces/config.interface";

const config: Config = {
  database: {
      host: 'localhost',
      username: 'root',
      password: '1',
      database: 'nest_url_shortener',
      port: 3306,
      charset: 'utf8mb4_general_ci'
  }
}

export default config

export enum UserType {
    ADMIN = 'admin',
    USER = 'user'
}

