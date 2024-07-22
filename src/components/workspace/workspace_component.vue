<template>
  <div class="workspace_block">
    <div class="block_answer">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <div class="sircle" v-if="message.role === 'assistant'">
          <i class="pi pi-microchip-ai"></i>
        </div>
        <span :class="['message-content', { isUser: message.role === 'user' }]">
          <div v-if="message.loading">
            <span v-show="message.role === 'assistant'">
              Загрузка...
            </span>
          </div>
          <template v-else>
            {{ message.content }}
          </template>
        </span>
      </div>
    </div>
    <inputUserQuestions @update:loading="handleLoading" @update:error="error = $event" @update:response="handleResponse" />
    <p class="description">ChatGPT может допускать ошибки. Рекомендуем проверять важную информацию.</p>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import inputUserQuestions from './modules/inputUserQuestions.vue';
import { useUserChat } from '../../store/userChat';

const messageInChat = useUserChat();
let messages = messageInChat.messages;
console.log('res', messages);

const loading = ref(false);
const error = ref<string | null>(null);

const handleLoading = (newVal: boolean) => {
  loading.value = newVal;
  if (newVal && !messages.some(message => message.loading)) {
    messageInChat.saveMessageInChat({ role: 'assistant', content: '', loading: true });
  }
};

const handleResponse = (response: string) => {
  loading.value = false;
  const lastMessage = messages[messages.length - 1];
  if (lastMessage && lastMessage.loading) {
    lastMessage.content = response;
    delete lastMessage.loading; // Удаляем флаг загрузки после получения ответа
  }
};
</script>

<style scoped>
@import url('../workspace/style/workspace_style.scss');
</style>
