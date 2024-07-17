<template>
    <div class="search_block">
        <input type="text" placeholder="Задай вопрос ChatGPT" v-model="userQuestion">
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
const userQuestion = ref<string>("")

</script>

<style scoped>
@import url('../style/workspace_style.scss');
</style>