<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  defaultValue?: string | number
  modelValue?: string | number
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <textarea
    v-model="modelValue"
    data-slot="textarea"
    rows="20"
    :class="
      cn(
        'border-input dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 bg-light-grey aria-invalid:ring-destructive flex field-sizing-content h-[90px] w-full rounded-[12px] py-4 pr-20 pl-3 text-base leading-[18px] shadow-xs ring-1 ring-transparent transition-colors outline-none placeholder:text-[#929299] focus-visible:bg-gray-200/60 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        props.class,
      )
    "
  />
</template>
