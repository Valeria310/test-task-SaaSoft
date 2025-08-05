<template>
    <v-form ref="formRef">
        <v-row dense>
            <v-col cols="3">
                <v-textarea
                    v-model="labelString"
                    auto-grow
                    :rules="[labelRule]"
                    rows="1"
                    @blur="handleLabelsUpdate"
                ></v-textarea>
            </v-col>
            <v-col cols="2">
                <v-select
                    v-model="localAccount.type"
                    :items="types"
                    :rules="[]"
                    @update:modelValue="onTypeChange"
                ></v-select>
            </v-col>
            <v-col :cols="localAccount.type === 'Локальная' ? 3 : 6">
                <v-textarea
                    v-model="localAccount.login"
                    :rules="[loginRule]"
                    rows="1"
                    auto-grow
                    @blur="emitUpdate"
                ></v-textarea>
            </v-col>
            <v-col cols="3" v-if="localAccount.type === 'Локальная'">
                <v-textarea
                    v-model="localAccount.password"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="toggleShowPassword"
                    :rules="[passwordRule]"
                    rows="1"
                    auto-grow
                    @blur="emitUpdate"
                ></v-textarea>
            </v-col>
            <v-col cols="1" class="mt-3">
                <v-btn color="error" @click="emitRemove">
                    <v-icon>mdi-delete</v-icon></v-btn
                >
            </v-col>
        </v-row></v-form
    >
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import type { Account } from "../types/account";
import {
    MAX_LABEL_LENGTH,
    MAX_LOGIN_LENGTH,
    MAX_PASSWORD_LENGTH,
} from "../types/account";

const props = defineProps<{
    account: Account;
    index: number;
}>();

const emit = defineEmits<{
    (e: "update", index: number, data: Account): void;
    (e: "remove", index: number): void;
}>();

const localAccount = reactive({ ...props.account });

const labelRule = (v: string) =>
    v.length < MAX_LABEL_LENGTH
        ? true
        : `Максимум ${MAX_LABEL_LENGTH} символов`;
const loginRule = (v: string) => {
    if (!v) {
        return "Обязательно для заполнения";
    }
    return v.length < MAX_LOGIN_LENGTH
        ? true
        : `Максимум ${MAX_LOGIN_LENGTH} символов`;
};

const passwordRule = (v: string) => {
    if (!v) {
        return "Обязательно для заполнения";
    }
    return v.length < MAX_PASSWORD_LENGTH
        ? true
        : `Максимум ${MAX_PASSWORD_LENGTH} символов`;
};

const types = ["LDAP", "Локальная"];

const showPassword = ref(false);

const labelString = ref(localAccount.labels.map((el) => el.text).join("; "));

const formRef = ref();

function handleLabelsUpdate() {
    localAccount.labels = labelString.value.split("; ").map((el) => {
        return { text: el };
    });
    emitUpdate();
}

async function emitUpdate() {
    const isValid = await formRef.value?.validate();
    if (isValid.valid) {
        emit("update", props.index, { ...localAccount });
    }
}

function emitRemove() {
    emit("remove", props.index);
}

function onTypeChange() {
    if (localAccount.type === "LDAP") {
        localAccount.password = null;
    }
    emitUpdate();
}

function toggleShowPassword() {
    showPassword.value = !showPassword.value;
}

watch(
    () => props.account,
    (newVal) => {
        Object.assign(localAccount, JSON.parse(JSON.stringify(newVal)));
        labelString.value = localAccount.labels.map((el) => el.text).join("; ");
    }
);
</script>

<style scoped></style>
