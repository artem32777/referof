<script setup lang="ts">
import { TimeFieldInput, TimeFieldRoot } from 'reka-ui'
import {
  CalendarDateTime,
  getLocalTimeZone,
  now,
  Time,
  ZonedDateTime,
} from '@internationalized/date'
import { onMounted } from 'vue'

defineProps<{
  defaultValue?: Time
  disabled?: boolean
}>()

type TimeValue = Time | CalendarDateTime | ZonedDateTime

const model = defineModel<TimeValue | undefined>()

onMounted(() => {
  if (!model.value) {
    const nowZoned = now(getLocalTimeZone())
    model.value = new Time(nowZoned.hour, nowZoned.minute)
  }
})
</script>

<template>
  <div class="inline-flex">
    <TimeFieldRoot
      :hideTimeZone="false"
      v-model="model"
      :disabled
      v-slot="{ segments }"
      locale="ru-RU"
      :class="[
        'bg-light-grey focus-within:ring-ring/50 flex h-11 w-20 items-center rounded-lg pr-7.5 pl-3 text-center text-sm font-medium transition-all select-none focus-within:ring-1',
        disabled && 'pointer-events-none cursor-not-allowed opacity-50',
      ]"
    >
      <template v-for="item in segments" :key="item.part">
        <TimeFieldInput v-if="item.part === 'literal'" :part="item.part">
          {{ item.value }}
        </TimeFieldInput>
        <TimeFieldInput v-else :part="item.part" class="rounded focus:underline focus:outline-none">
          {{ item.value }}
        </TimeFieldInput>
      </template>
    </TimeFieldRoot>
  </div>
</template>
