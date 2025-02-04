export class ApiResponse {
    success: boolean;
    message: string;
    data?: Object;

    constructor(success: boolean, message: string, data?: Object) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}