<script setup lang="ts">
import { ref, onMounted, onBeforeMount, watch, onUpdated } from "vue";
import type { Page } from "@/interfaces";
import { DEFAULT_PAGE, SAMPLE_DATA } from "./constants";
import { parsePage } from "./lib/parser";
import { decodeData, encodeDataToUrl } from "./lib/encoder";
import { updateIcons } from "./lib/icons";
import ZEditor from "./ZEditor.vue";

const visible = ref<boolean>(false);
const debug = ref<boolean>(true);
const debugData = ref<string>(SAMPLE_DATA);
const debugUrl = ref<string>("");
const parsed = ref<Page>(DEFAULT_PAGE);

function dataChanged(value: string) {
    parsed.value = parsePage(value);
    debugUrl.value = encodeDataToUrl(value);
}

onBeforeMount(() => {
    const url = new URL(window.location.href);

    if (url.searchParams.get("z") !== null) {
        debugData.value = decodeData(url.searchParams.get("z") ?? "");
        parsed.value = parsePage(debugData.value);
        debug.value = parsed.value.error;
    }

    if (debug.value) {
        dataChanged(debugData.value);
    }
});

onMounted(() => {
    setTimeout(() => {
        visible.value = true;
    });
    updateIcons();
});

onUpdated(updateIcons);

watch(debugData, dataChanged);
</script>

<template>
    <main :style="{ display: visible ? 'inherit' : 'none' }">
        <div v-if="debug">
            <!-- TODO: 1. rename app -->
            <h1>
                <i icon="cog"></i>
                Z-App
            </h1>
            <ZEditor v-model="debugData" :parsed="parsed"></ZEditor>
            <a v-if="debugUrl" :href="debugUrl" target="_blank">
                <i icon="link"></i>
                Output link
            </a>
            <br />
            <br />
            <hr />
        </div>
        <!-- TODO: 5. implement custom logic -->
        <div class="header" v-html="parsed.header"></div>
        <div v-for="(d, i) in parsed.parts" :key="`data-${i}`" v-html="d"></div>
    </main>
</template>

<style scoped>
.header {
    margin: 2em 0 1rem;
}

.button {
    display: block;
    width: 100%;
    text-decoration: none;
    padding: 1em;
    margin-bottom: 0.75em;
    border: 1px solid var(--color-primary);
    border-radius: 0.5em;
    background-color: var(--background);
    cursor: pointer;
    font-size: 1.333em;
}

.button:hover {
    background-color: var(--background-secondary);
}
</style>
