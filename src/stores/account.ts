import { defineStore } from "pinia";
import { ref, watch } from "vue";
import type { Account, AccountType } from "../types/account.ts";
import { nanoid } from "nanoid";

export const useAccountStore = defineStore("account", () => {
    const accounts = ref<Account[]>([]);

    function addAccount() {
        accounts.value = [
            ...accounts.value,
            {
                id: nanoid(),
                labels: [],
                type: "Локальная" as AccountType,
                login: "",
                password: "",
            },
        ];
    }

    function updateAccount(index: number, updated: Account) {
        accounts.value[index] = { ...updated };
        accounts.value = [...accounts.value];
        uploadToLocalStorage();
    }

    function removeAccount(index: number) {
        accounts.value.splice(index, 1);
        accounts.value = [...accounts.value];
        uploadToLocalStorage();
    }

    function unloadFromLocalStorage() {
        const raw = localStorage.getItem("account-list");
        if (raw) {
            try {
                accounts.value = JSON.parse(raw);
            } catch (error) {
                console.error("Ошибка при парсе JSON", error);
            }
        }
    }

    function uploadToLocalStorage() {
        localStorage.setItem("account-list", JSON.stringify(accounts.value));
    }

    return {
        accounts,
        addAccount,
        updateAccount,
        removeAccount,
        unloadFromLocalStorage,
        uploadToLocalStorage,
    };
});
