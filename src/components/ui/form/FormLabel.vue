<script lang="ts" setup>
import type { LabelProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Label } from '@/components/ui/label'
import { useFormField } from './useFormField'

const props = defineProps<
  LabelProps & {
    class?: HTMLAttributes['class']
    required?: boolean
  }
>()

const { error, formItemId } = useFormField()
</script>

<template>
  <Label data-slot="form-label" :data-error="!!error" :class="props.class" :for="formItemId">
    <slot />
    <span v-if="required" class="text-destructive">*</span>
  </Label>
</template>
