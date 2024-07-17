<template>
    <div class="search_block">
        <input type="text" placeholder="Задай вопрос ChatGPT" v-model="userQuestion">
        <button :disabled="isDisabledButton" @click="sendQuestionForAI()" @keydown.enter="sendQuestionForAI()">
            <i class="pi pi-arrow-up" style="font-size: 1.2rem;" :class="{active_button: !isDisabledButton}"></i>
        </button>
    </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue'
const userQuestion = ref<string>("")
const isDisabledButton = ref<boolean>(true)


watch(userQuestion, () => {
   return userQuestion.value.length > 0 ? isDisabledButton.value = false : isDisabledButton.value = true
})
const sendQuestionForAI = () => {
    alert(userQuestion.value)
}
</script>

<style scoped>
@import url('../style/workspace_style.scss');
</style>