export type ErrType<T> = { code: number; message: string; data: T }
export enum ErrCode {
  SUCCESS = 0,
  ERROR = 1,
}
function success<T>(message: string, data: T): ErrType<T> {
  return { code: ErrCode.SUCCESS, message, data }
}
function error<T>(message: string, data: T): ErrType<T> {
  return { code: ErrCode.ERROR, message, data }
}
const Err = {
  success,
  error,
}

export default Err
