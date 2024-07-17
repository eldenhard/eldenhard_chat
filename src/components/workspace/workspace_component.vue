<template>
  <div class="workspace_block">
    <answerByAIVue />
    <inputUserQuestions @update:loading="loading = $event" @update:error="error = $event"
      @update:response="response = $event" />
    <div v-if="loading">Загрузка...</div>
    <div v-if="error">{{ error }}</div>
    <div v-if="response">{{ response }}</div>
  </div>
  
</template>

<script setup lang="ts">
import { ref } from 'vue'
import answerByAIVue from './modules/answerByAI.vue'
import inputUserQuestions from './modules/inputUserQuestions.vue'

const loading = ref(false);
const error = ref<string | null>(null);
const response = ref<string | null>(null);


</script>


<style scoped>
@import url('../workspace/style/workspace_style.scss');
</style>