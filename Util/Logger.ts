export class logger {

    static info(message: string) {
        console.log(`[INFO] ${message}`);
    }

    static error(message: string) {
        console.log(`[ERROR] ${message}`);
    }
}