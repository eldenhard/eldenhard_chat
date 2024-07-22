<template>
  <div class="workspace_block">
    <div class="block_answer">
      <div v-for="message in messages" :key="message.content" class="message">
        <div class="sircle" v-if="message.role === 'assistant'">
          <i class="pi pi-microchip-ai"></i>
        </div>
        <span :class="['message-content', { isUser: message.role === 'user' }]">{{ message.content }}</span>
      </div>
    </div>
    <inputUserQuestions @update:loading="loading = $event" @update:error="error = $event" @update:response="response = $event" />
    <p class="description">ChatGPT может допускать ошибки. Рекомендуем проверять важную информацию.</p>
    <!-- <div v-highlightjs>
    <code class="javascript">
      <div>
        <p class="typingEffect__line1">
          function helloWorld() 
        </p>
      </div>
    
    </code>
  </div> -->
    <div v-if="loading">Загрузка...</div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>



<script setup lang="ts">
import { ref } from 'vue'
import inputUserQuestions from './modules/inputUserQuestions.vue'
import { useUserChat } from '../../store/userChat';

const messageInChat = useUserChat()
let messages = messageInChat.messages
console.log('res', messages)


const loading = ref(false);
const error = ref<string | null>(null);
const response = ref<string | null>(null);


</script>


<style scoped>
@import url('../workspace/style/workspace_style.scss');
</style>