<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input/index.ts'
import { type InputHTMLAttributes } from 'vue'

defineProps<{
  name: string
  label?: string
  placeholder?: string
  required?: boolean
  type?: InputHTMLAttributes['type']
  onlyNumbers?: boolean
  iconPath?: string
}>()
</script>

<template>
  <div>
    <FormField v-slot="{ componentField }" :name :validate-on-blur="false">
      <FormItem>
        <FormLabel v-if="label" :required class="mb-2">{{ label }}</FormLabel>
        <div class="relative">
          <FormControl>
            <slot :componentField="componentField">
              <Input
                :placeholder
                :onlyNumbers
                v-bind="componentField"
                :class="{ 'pl-11': iconPath }"
              />
              <span
                v-if="iconPath"
                class="absolute inset-y-0 start-0 flex items-center justify-center pl-3"
              >
                <img :src="iconPath" alt="icon" />
              </span>
            </slot>
          </FormControl>
        </div>
        <FormMessage class="mt-1 text-xs" />
      </FormItem>
    </FormField>
  </div>
</template>
