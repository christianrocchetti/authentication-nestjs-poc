export class CodeEnum {
    // ### SUCCESS ###
    public static LOGIN = new CodeEnum(0, 'Successfully logged');
    public static REFRESH = new CodeEnum(0, 'Successfully refreshed token');
    public static REGISTRATION = new CodeEnum(0, 'Registration successful');
    public static LOG = new CodeEnum(0, 'retrive all user log');
    // ### ERROR ###
    public static GENERIC_INTERNAL_ERROR = new CodeEnum(-1, 'generic internal error');
    public static USER_NOT_FOUND = new CodeEnum(-2, 'user or password incorrect');
    public static GENERIC_NESTJS_ERROR = new CodeEnum(-100, '');

    private readonly _code: number;
    private readonly _message: string;

    private constructor(code: number, message: string) {
        this._code = code;
        this._message = message;
    }

    get code(): number {
        return this._code;
    }

    get message(): string {
        return this._message;
    }
}
