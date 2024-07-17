<template>
    <div class="resize_block">
        <button class="resize_block__button" @click="resizeSidebar()">
            <i class="pi pi-window-minimize" style="font-size: 1.2rem; color: #B4B4B4"></i>
        </button>
        <button class="resize_block__button">
            <i class="pi pi-pen-to-square" style="font-size: 1.2rem; color: #B4B4B4"></i>
        </button>
    </div>
</template>


<script setup>
const emit = defineEmits(['resizeSidebar']);

const resizeSidebar = () => {
  emit('resizeSidebar', 'collapse'); // передаем строку 'resize'
};
</script>

<style scoped>
@import url('../../modules/resize_sidebar/style/resize.scss');
</style>