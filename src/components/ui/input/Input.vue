<script setup lang="ts">
import { computed, type HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
  onlyNumbers?: boolean
  iconPath?: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const isNumericLogic = computed(() => {
  if (!props.onlyNumbers) return

  return (e: KeyboardEvent) => {
    const allowed = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab']
    const isDigit = /^[0-9]$/.test(e.key)
    if (!isDigit && !allowed.includes(e.key)) {
      e.preventDefault()
    }
  }
})
</script>

<template>
  <input
    v-model="modelValue"
    data-slot="input"
    @keydown="isNumericLogic"
    :class="
      cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input bg-light-grey flex h-11 w-full min-w-0 rounded-[12px] px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'transition-colors focus-visible:bg-gray-200/60',
        'aria-invalid:ring-destructive dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive ring-1 ring-transparent',
        props.class,
      )
    "
  />
</template>
