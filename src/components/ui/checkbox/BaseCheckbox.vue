<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'

const model = defineModel<boolean>()

defineProps<{
  label?: string
}>()
</script>

<template>
  <label class="flex w-fit cursor-pointer items-center space-x-2">
    <Checkbox class="h-5 w-5" :model-value="model" @update:model-value="model = !model" />
    <span v-if="label" class="text-primary text-sm font-medium">{{ label }}</span>
  </label>
</template>
