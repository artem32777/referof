<script setup lang="ts">
import { CreatePromoCodeStep } from '@/components/CreatePromoCodeModal/types.ts'

defineProps<{ activeStep: CreatePromoCodeStep }>()

const steps: {
  name: CreatePromoCodeStep
  label: string
}[] = [
  { name: CreatePromoCodeStep.General, label: 'Шаг 1: Основное' },
  { name: CreatePromoCodeStep.Settings, label: 'Шаг 2: Настройки промокода' },
]
</script>

<template>
  <div class="mb-5.5 grid grid-cols-1 gap-2.5 border-b px-2.5 text-sm font-semibold sm:grid-cols-2">
    <h3
      v-for="step in steps"
      :key="step.name"
      class="translate-y-[1px] pb-1.5 text-center"
      :class="{ 'text-active border-active border-b-2': activeStep === step.name }"
    >
      {{ step.label }}
    </h3>
  </div>
</template>
