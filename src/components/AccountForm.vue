<template>
    <v-container>
        <v-row>
            <h2>Учётные записи</h2>
            <v-btn color="primary" @click="addAccount">+</v-btn>
        </v-row>
        <v-row>
            <v-col cols="12" v-for="account in accounts" :key="account.id">
                {{ account }}
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { useAccountStore } from "../stores/account";

const accountStore = useAccountStore();

const accounts = accountStore.accounts;

function addAccount() {
    accountStore.addAccount();
}
</script>

<style scoped></style>
