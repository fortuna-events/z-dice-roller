<script setup lang="ts">
import { ref, onMounted, onBeforeMount, watch, onUpdated, computed } from "vue";
import type { Page } from "@/interfaces";
import { DEFAULT_PAGE, ROLLING_DURATION, SAMPLE_DATA } from "./constants";
import { parsePage } from "./lib/parser";
import { decodeData, encodeDataToUrl } from "./lib/encoder";
import { updateIcons } from "./lib/icons";
import ZEditor from "./ZEditor.vue";
import SvgDice from "./SvgDice.vue";
import { getCookie, setCookie } from "./lib/cookies";
import { randRange } from "./lib/random";

const visible = ref<boolean>(false);
const debug = ref<boolean>(true);
const debugData = ref<string>(SAMPLE_DATA);
const debugUrl = ref<string>("");
const parsed = ref<Page>(DEFAULT_PAGE);
const dices = ref<number[]>([1, 2, 3]);
const rolling = ref<boolean>(false);
const readonly = ref<boolean>(false);
const savedData = ref<string>("");
const score = ref<number>(dices.value.reduce((sum, value) => sum + value, 0));
const success = computed<boolean>(
    () => score.value >= parsed.value.targetScore,
);
const alreadyRolled = computed<boolean>(
    () => !debug.value && savedData.value.length > 0,
);

function dataChanged(value: string) {
    parsed.value = parsePage(value);
    debugUrl.value = encodeDataToUrl(value);
    dices.value = Array(parsed.value.diceCount).fill(parsed.value.diceSides);
}

function roll() {
    rolling.value = true;
    setTimeout(() => {
        rolling.value = false;
        if (debug.value) {
            return;
        }
        readonly.value = true;
        if (parsed.value.expirationMinutes === 0) {
            return;
        }
        const url = new URL(window.location.href);
        setCookie(
            url.searchParams.get("z") ?? "",
            dices.value.join(","),
            parsed.value.expirationMinutes,
        );
    }, ROLLING_DURATION);
}

function updateDices() {
    dices.value = dices.value.map(() =>
        randRange(1, parsed.value.diceSides + 1),
    );
}

onBeforeMount(() => {
    const url = new URL(window.location.href);
    const zData = url.searchParams.get("z");
    if (zData !== null) {
        debugData.value = decodeData(zData);
        parsed.value = parsePage(debugData.value);
        debug.value = parsed.value.error !== null;
        savedData.value = getCookie(zData, "");
    }

    if (debug.value) {
        dataChanged(debugData.value);
    }

    setTimeout(() => {
        if (alreadyRolled.value) {
            dices.value = savedData.value
                .split(",")
                .map((value) => parseInt(value, 10));
        }
    });
});

onMounted(() => {
    setTimeout(() => {
        visible.value = true;
    });
    setInterval(() => {
        if (rolling.value) {
            updateDices();
        }
    }, 50);
    updateIcons();
});

onUpdated(updateIcons);

watch(debugData, dataChanged);
</script>

<template>
    <main :style="{ display: visible ? 'inherit' : 'none' }">
        <div v-if="debug">
            <h1>
                <i icon="dices"></i>
                Dice Roller
            </h1>
            <ZEditor v-model="debugData" :parsed="parsed"></ZEditor>
            <a
                v-if="debugUrl && parsed.error === null"
                :href="debugUrl"
                target="_blank"
            >
                <i icon="link"></i>
                Output link
            </a>
            <br />
            <br />
            <br />
            <hr />
        </div>
        <div class="header" v-html="parsed.header"></div>
        <div class="dices">
            <template v-for="(dice, index) in dices" :key="`dice-${index}`">
                <SvgDice :value="dice" />
            </template>
        </div>
        <button
            v-if="debug || (!readonly && !alreadyRolled)"
            class="button"
            :disabled="rolling"
            @click="roll"
            v-html="parsed.buttonText"
        ></button>
        <template v-if="debug || readonly || alreadyRolled">
            <div
                v-if="debug || success"
                class="green-800"
                v-html="parsed.successText"
            ></div>
            <template v-if="debug || !success">
                <div class="red-800" v-html="parsed.failureText"></div>
            </template>
        </template>
    </main>
</template>

<style scoped>
.header {
    margin: 2em 0 1rem;
}

.dices {
    width: 100%;
    margin: 0;
    text-align: center;
    line-height: 1em;
}
</style>
