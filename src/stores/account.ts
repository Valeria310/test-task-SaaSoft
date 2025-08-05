import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { Account, AccountType } from "@/types/account";
import { nanoid } from "nanoid";

export const useAccountStore = defineStore("account", () => {
    const accounts = ref<Account[]>([]);

    function addAccount() {
        accounts.value.push({
            id: nanoid(),
            labels: [],
            type: "Локальная" as AccountType,
            login: "",
            password: "",
        });
    }

    function updateAccount(index: number, updated: Partial<Account>) {
        accounts.value[index] = { ...accounts.value[index], ...updated };
    }

    function removeAccount(index: number) {
        accounts.value.splice(index, 1);
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

    watch(
        accounts,
        () => {
            uploadToLocalStorage();
        },
        { deep: true }
    );

    return {
        accounts,
        addAccount,
        updateAccount,
        removeAccount,
        unloadFromLocalStorage,
        uploadToLocalStorage,
    };
});
