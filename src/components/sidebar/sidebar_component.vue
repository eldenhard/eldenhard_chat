<template>
    <div class="sidebar_block" :class="current_class">
        <ResizeElementModule @resizeSidebar="resizeSidebar" />
    </div>
</template>

<script setup>
import ResizeElementModule from "../../modules/resize_sidebar/resize_module.vue";
import { computed, ref } from "vue";

const current_class = ref("");
const resizeSidebar = (value) => {
    console.log(value)
    current_class.value = value
}
</script>

<style scoped>
@import url('../sidebar/style/sidebar_style.scss');
</style>
