<script setup lang="ts">
import { Icon } from "@iconify/vue";

interface Props {
    icon: string
}
defineProps<Props>()
</script>

<template>
    <Icon :icon/>
</template>