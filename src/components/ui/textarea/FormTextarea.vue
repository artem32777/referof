<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea/index.ts'
import { computed } from 'vue'

const props = defineProps<{
  name: string
  label?: string
  placeholder?: string
  required?: boolean
  maxLength?: number
}>()

const maxLength = computed(() => props.maxLength || 250)
</script>

<template>
  <FormField v-slot="{ componentField }" :name :validate-on-blur="false">
    <FormItem>
      <FormLabel v-if="label" :required class="mb-2.5">{{ label }}</FormLabel>
      <FormControl>
        <slot :componentField="componentField">
          <Textarea
            :placeholder
            v-bind="componentField"
            class="resize-none"
            :maxlength="maxLength"
          />
        </slot>
      </FormControl>
      <div class="mt-1 flex justify-end">
        <span
          class="text-xs"
          :class="{
            'text-[#ADAEB2]': (componentField.modelValue || '').length < maxLength,
            'text-destructive': (componentField.modelValue || '').length === maxLength,
          }"
        >
          {{ (componentField.modelValue || '').length }}/{{ maxLength }}
        </span>
      </div>
      <FormMessage class="text-xs" />
    </FormItem>
  </FormField>
</template>
