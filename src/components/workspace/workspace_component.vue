<template>
    <div class="workspace_block">
       <answerByAIVue />
      <inputUserQuestionsVue />
       
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import answerByAIVue from './modules/answerByAI.vue'
import inputUserQuestionsVue from './modules/inputUserQuestions.vue'

// import Button from 'primevue/button';
// import AutoComplete from 'primevue/autocomplete';


</script>


<style scoped>
@import url('../workspace/style/workspace_style.scss');
</style>