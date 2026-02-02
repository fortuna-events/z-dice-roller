<script setup lang="ts">
import { computed } from "vue";
import { DICES } from "./constants";

interface Props {
    value: number;
}

const props = defineProps<Props>();
const diceSvg = computed<string>(
    () => DICES[Math.min(Math.max(1, props.value), DICES.length) - 1] ?? "",
);
</script>

<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10rem"
        height="10rem"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
    >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <path :d="diceSvg" />
    </svg>
</template>

<style scoped>
svg {
    display: inline-block;
    margin: 0 0.05em;
}
</style>
