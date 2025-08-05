export type AccountType = "LDAP" | "Локальная";

export interface Label {
    text: string;
}

export interface Account {
    id: string;
    labels: Label[];
    type: AccountType;
    login: string;
    password: string | null;
}

export const MAX_LABEL_LENGTH = 50;
export const MAX_LOGIN_LENGTH = 100;
export const MAX_PASSWORD_LENGTH = 100;
