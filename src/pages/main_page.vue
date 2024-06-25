<template>
    <div class="workspace">
        <sidebar_component />
        <workspace_component />
    </div>
</template>


<script setup>
import { ref } from 'vue'
import sidebar_component from '../components/sidebar/sidebar_component.vue'
import workspace_component from '../components/workspace/workspace_component.vue'

console.log('привет script setup')
</script>