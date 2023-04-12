<template>
    <v-system-bar ref="sysbar" data-tauri-drag-region height="30" style="padding-right:0">
        <span class="ms-2" data-tauri-drag-region>Simon Hyll</span>
        <v-spacer></v-spacer>
        <v-btn height="30" variant="text" @click="minimize">
            <v-icon icon="mdi-window-minimize"></v-icon>
        </v-btn>
        <v-btn height="30" variant="text" @click="maximize">
            <v-icon icon="mdi-window-maximize"></v-icon>
        </v-btn>
        <v-btn height="30" variant="text" @click="close">
            <v-icon icon="mdi-close"></v-icon>
        </v-btn>
    </v-system-bar>
</template>

<script lang="ts">
import { invoke } from "@tauri-apps/api";
export default {
    methods: {
        minimize() {
            /* @ts-ignore */
            invoke("minimize");
        },
        maximize() {
            /* @ts-ignore */
            invoke("maximize");
        },
        close() {
            /* @ts-ignore */
            invoke("close");
        },
    }
}
</script>
