<template>
    <div class="search_block">
        <textarea type="text" placeholder="Задай вопрос ChatGPT" v-model="userQuestion"
            @keydown.enter="sendQuestionForAI"></textarea>
        <button :disabled="isDisabledButton" @click="sendQuestionForAI">
            <i class="pi pi-arrow-up" style="font-size: 1.2rem;" :class="{ active_button: !isDisabledButton }"></i>
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue';
import { useChatGPT } from "../../../composables/useChatGPT";
import { useUserChat } from '../../../store/userChat';

const userQuestion = ref<string>("");
const isDisabledButton = ref<boolean>(true);

const messageInChat = useUserChat();
const { loading, error, response, sendMessage } = useChatGPT();
const emit = defineEmits(['update:loading', 'update:error', 'update:response']);

const sendQuestionForAI = async () => {
 
    if (userQuestion.value.trim()) {
        messageInChat.saveMessageInChat({ role: 'user', content: userQuestion.value });
        const responseAI = await sendMessage(userQuestion.value);
        userQuestion.value = "";
        messageInChat.saveMessageInChat({ role: 'assistant', content: responseAI });
       
    }
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
    if (newVal) {
        emit('update:response', newVal);
    }
});
</script>

<style scoped>
@import url('../style/workspace_style.scss');
</style>