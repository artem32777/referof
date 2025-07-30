<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

defineProps<{
  name: string
  items: {
    name: string
    value: string
  }[]
  label?: string
}>()
</script>

<template>
  <FormField v-slot="{ componentField }" type="radio" :name>
    <FormItem>
      <FormLabel v-if="label" class="mb-4.5 font-semibold">{{ label }}</FormLabel>
      <FormControl>
        <RadioGroup class="flex flex-col space-y-[1px]" v-bind="componentField">
          <FormItem
            v-for="item in items"
            :key="item.value"
            class="flex w-fit cursor-pointer items-center gap-x-2"
          >
            <FormControl>
              <RadioGroupItem :value="item.value" />
            </FormControl>
            <FormLabel class="cursor-pointer font-normal">{{ item.name }}</FormLabel>
          </FormItem>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
