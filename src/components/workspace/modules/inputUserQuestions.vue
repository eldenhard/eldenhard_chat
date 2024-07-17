<template>
    <div class="search_block">
        <input type="text" placeholder="Задай вопрос ChatGPT" v-model="userQuestion"  @keydown.enter="sendQuestionForAI()">
        <button :disabled="isDisabledButton" @click="sendQuestionForAI()">
            <i class="pi pi-arrow-up" style="font-size: 1.2rem;" :class="{active_button: !isDisabledButton}"></i>
        </button>
    </div>
</template>


<script setup lang="ts">
import { ref, watch, defineEmits  } from 'vue'
import { useChatGPT } from "../../../composables/useChatGPT";

const userQuestion = ref<string>("")
const isDisabledButton = ref<boolean>(true)

const { loading, error, response, sendMessage  } = useChatGPT()
const emit = defineEmits(['update:loading', 'update:error', 'update:response']);

const sendQuestionForAI = () => {
  sendMessage(userQuestion.value);
};

watch(userQuestion, (newValue) => {
  isDisabledButton.value = !newValue.trim();
});


watch(loading, (newVal) => {
  emit('update:loading', newVal);
});

watch(error, (newVal) => {
  emit('update:error', newVal);
});

watch(response, (newVal) => {
  emit('update:response', newVal);
});



</script>

<style scoped>
@import url('../style/workspace_style.scss');
</style>