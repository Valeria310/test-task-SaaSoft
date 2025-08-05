<template>
    <v-container>
        <v-row class="px-3">
            <h2>Учётные записи</h2>
            <v-btn color="primary" class="ml-3" @click="addAccount">+</v-btn>
        </v-row>
        <div class="mt-4 px-3 bg-light-blue-lighten-5 d-flex align-center">
            <v-icon class="mr-3">mdi-help-circle-outline</v-icon>
            <h4>
                Для указания нескольких меток для одной пары логин/пароль
                используйте разделитель ;
            </h4>
        </div>
        <v-row class="my-2 text-caption font-weight-bold">
            <v-col cols="3">Метка</v-col>
            <v-col cols="2">Тип записи</v-col>
            <v-col cols="3">Логин</v-col>
            <v-col cols="3">Пароль</v-col>
            <v-col cols="1"></v-col>
        </v-row>
        <v-row>
            <v-col
                cols="12"
                v-for="(account, index) in accounts"
                :key="account.id"
            >
                <AccountItem
                    :account="account"
                    :index="index"
                    @update="updateAccount"
                    @remove="removeAccount"
                />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import AccountItem from "./AccountItem.vue";
import type { Account } from "../types/account";
import { useAccountStore } from "../stores/account";
import { onBeforeMount } from "vue";
import { computed } from "vue";

const accountStore = useAccountStore();

const accounts = computed(() => accountStore.accounts);

function addAccount() {
    accountStore.addAccount();
}

function updateAccount(index: number, data: Account) {
    accountStore.updateAccount(index, data);
}

function removeAccount(index: number) {
    accountStore.removeAccount(index);
}

onBeforeMount(() => {
    accountStore.unloadFromLocalStorage();
});
</script>

<style scoped></style>
