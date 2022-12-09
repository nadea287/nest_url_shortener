import {ValidationPipe} from "@nestjs/common";

export const setupApp = (app: any) => {
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true
    }))
}