export interface CancelablePromise {
  promise: Promise<any>,
  cancel: Function,
}

export const makeCancelable = (promise: Promise<any>): CancelablePromise => {
    let hasCanceled_ = false;

    const wrappedPromise = new Promise<any>((resolve, reject) => {
        promise.then(
            (val: any) => hasCanceled_ ? reject({isCanceled: true}) : resolve(val),
            (error: any) => hasCanceled_ ? reject({isCanceled: true}) : reject(error)
        );
    });

    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled_ = true;
        },
    };
};