export const localStorageBool = (pre: string): boolean => {
    return localStorage.getItem(pre) === 'true';
}