<script setup lang="ts">
import { ref, onBeforeMount, useTemplateRef, watch } from "vue";
import type { Editor, Page } from "@/interfaces";
import { DEFAULT_EDITOR } from "./constants";
import { parseEditor } from "./lib/parser";

const debugData = defineModel<string>();
const editor = ref<Editor>(DEFAULT_EDITOR);
const numbers = useTemplateRef("numbers");
const overlay = useTemplateRef("overlay");
const code = useTemplateRef("code");

function editorScroll() {
    if (numbers.value) {
        numbers.value.scrollTop = code.value?.scrollTop ?? 0;
    }

    if (overlay.value) {
        overlay.value.scrollTop = code.value?.scrollTop ?? 0;
        overlay.value.scrollLeft = code.value?.scrollLeft ?? 0;
    }
}

interface Props {
    parsed: Page;
}

const props = defineProps<Props>();

watch(debugData, () => {
    editor.value = parseEditor(debugData.value ?? "", props.parsed);
});

onBeforeMount(() => {
    editor.value = parseEditor(debugData.value ?? "", props.parsed);
});
</script>

<template>
    <div class="editor">
        <textarea
            ref="numbers"
            v-model="editor.numbersText"
            class="numbers"
            :cols="editor.numbersCols"
            rows="10"
            readonly
        ></textarea>
        <textarea
            ref="code"
            v-model="debugData"
            class="code"
            rows="10"
            :class="parsed.error !== null ? 'error' : ''"
            @scroll="editorScroll"
        ></textarea>
        <div class="overlay">
            <textarea :cols="editor.numbersCols" rows="10" readonly></textarea>
            <textarea
                ref="overlay"
                v-model="editor.overlayText"
                class="code"
                rows="10"
                readonly
            ></textarea>
        </div>
    </div>
    <div v-if="parsed.error" class="message">
        {{ parsed.error }}
    </div>
</template>

<style scoped>
.editor {
    display: flex;
    overflow-y: scroll;
    position: relative;
}

.editor textarea {
    margin: 0;
    resize: none;
    outline: none;
    font-size: 13px;
    text-wrap: nowrap;
}

.code {
    flex-grow: 1;
}

.numbers {
    overflow: hidden;
    border: 1px solid #0000;
    background: none;
    text-align: right;
    pointer-events: none;
}

.overlay {
    display: flex;
    position: absolute;
    width: 100%;
    opacity: 50%;
    pointer-events: none;
}

.overlay > textarea {
    border: 1px solid #0000;
    overflow: hidden;
    background: none;
}

textarea.error {
    border: 1px solid #f44336;
}

.message {
    text-align: right;
    color: #f44336;
}
</style>
