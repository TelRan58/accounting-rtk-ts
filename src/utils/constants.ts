export const base_url = '/account';
export const createToken = (login: string, password: string) => btoa(login + ':' + password);