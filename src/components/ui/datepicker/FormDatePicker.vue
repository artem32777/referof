<script setup lang="ts">
import { CalendarDate, DateFormatter, parseDate } from '@internationalized/date'
import type { DateValue } from '@internationalized/date'
import { toDate } from 'reka-ui/date'
import { ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils.ts'
import type { FormContext } from 'vee-validate'
import Timepicker from '@/components/ui/timepicker/Timepicker.vue'

const { name, form } = defineProps<{
  name: string
  form: FormContext
  minValue?: CalendarDate
  maxValue?: CalendarDate
  label?: string
  defaultValue?: string
  disabled?: boolean
}>()

const { setFieldValue, values } = form

const df = new DateFormatter('ru-RU', {
  dateStyle: 'short',
})

const userTimeZone = values[name] ? values[name].match(/[+-]\d{2}:\d{2}/)?.[0] : '+00:00'

const timeValue = ref()
const dateValue = ref<DateValue | undefined>(
  values[name] ? parseDate(values[name].split('T')[0]) : undefined,
)

watch([timeValue, dateValue], ([newTime, newDate]) => {
  if (newTime && newDate) {
    const val = `${newDate}T${newTime}${userTimeZone}`
    setFieldValue(name, val)
  }
})
</script>

<template>
  <div>
    <FormField :name :validate-on-blur="false">
      <FormItem>
        <FormLabel v-if="label" class="mb-1.5 text-[#797979]">
          {{ label }}
        </FormLabel>
        <Popover>
          <div class="flex gap-1">
            <PopoverTrigger as-child>
              <FormControl>
                <Button
                  variant="outline"
                  :disabled
                  :class="
                    cn(
                      'p-y-[5px] bg-light-grey grid h-11 w-35 grid-cols-[24px_auto] grid-rows-2 pl-2.5',
                    )
                  "
                >
                  <img src="@/assets/icons/calendar.svg" class="row-span-2 h-6" alt="calendar" />
                  <span class="text-muted-foreground text-left text-xs">Дата</span>
                  <span class="text-sm">
                    {{ dateValue ? df.format(toDate(dateValue as DateValue)) : 'Выберите дату' }}
                  </span>
                </Button>
                <input hidden />
              </FormControl>
            </PopoverTrigger>
            <Timepicker v-model="timeValue" />
          </div>
          <PopoverContent class="w-auto p-0">
            <Calendar
              v-model="dateValue as DateValue"
              calendar-label="Date of birth"
              initial-focus
              :minValue
              :maxValue
            />
          </PopoverContent>
        </Popover>
        <FormMessage />
      </FormItem>
    </FormField>
  </div>
</template>
