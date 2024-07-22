<template>
    <div class="search_block">
        <Textarea v-model="userQuestion" variant="filled" :rows="rows" cols="30" placeholder="Задай вопрос ChatGPT" @input="autoResize" />
        <button :disabled="isDisabledButton" @click="sendQuestionForAI">
            <i class="pi pi-arrow-up" style="font-size: 1.2rem;" :class="{ active_button: !isDisabledButton }"></i>
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits } from 'vue';
import { useChatGPT } from "../../../composables/useChatGPT";
import { useUserChat } from '../../../store/userChat';
import Textarea from 'primevue/textarea';

const userQuestion = ref<string>("");
const isDisabledButton = ref<boolean>(true);
const rows = ref<number>(1);
const maxRows = 10;

const messageInChat = useUserChat();
const { loading, error, response, sendMessage } = useChatGPT();
const emit = defineEmits(['update:loading', 'update:error', 'update:response']);

const sendQuestionForAI = async () => {
    if (userQuestion.value.trim()) {
        messageInChat.saveMessageInChat({ role: 'user', content: userQuestion.value });
        emit('update:loading', true);
        const question = userQuestion.value;
        userQuestion.value = ""; 
        const responseAI = await sendMessage(question);
        emit('update:response', responseAI);
        emit('update:loading', false);
    }
};

// Функция для автоматического изменения размера текстового поля
const autoResize = (event: Event) => {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.rows = 1; // Сбрасываем количество строк на 1 для пересчета
    const lineHeight = 24; // Высота строки (можно настроить в зависимости от стилей)
    const currentRows = Math.floor(textarea.scrollHeight / lineHeight);
    rows.value = Math.min(currentRows, maxRows); // Ограничиваем максимальное количество строк
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
