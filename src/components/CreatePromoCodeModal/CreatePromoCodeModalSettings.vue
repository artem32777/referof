<script setup lang="ts">
import FormInput from '@/components/ui/input/FormInput.vue'
import { Button } from '@/components/ui/button'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import {
  CreatePromoCodeSendSettings,
  type CreatePromoCodeSettingsForm,
  CreatePromoCodeValues,
} from '@/components/CreatePromoCodeModal/types.ts'
import { today, getLocalTimeZone, now } from '@internationalized/date'
import FormRadioGroup from '@/components/ui/radio-group/FormRadioGroup.vue'
import FormDatePicker from '@/components/ui/datepicker/FormDatePicker.vue'
import { computed, ref } from 'vue'
import BaseCheckbox from '@/components/ui/checkbox/BaseCheckbox.vue'

const emit = defineEmits<{
  onClickCreate: [formData: CreatePromoCodeSettingsForm]
  onClickBack: [void]
}>()

const isEndDateDisabled = ref(false)

const form = useForm({
  validationSchema: computed(() =>
    toTypedSchema(
      z.object({
        [CreatePromoCodeValues.startDate]: z.string().datetime({ offset: true }),
        [CreatePromoCodeValues.endDate]: z.string().datetime({ offset: true }).optional(),
        [CreatePromoCodeValues.limit]: z.coerce
          .number({ message: 'Введите число' })
          .min(1, { message: 'Минимум одна активация' }),
        [CreatePromoCodeValues.settings]: z.nativeEnum(CreatePromoCodeSendSettings),
      }),
    ),
  ),
  initialValues: {
    [CreatePromoCodeValues.startDate]: now(getLocalTimeZone()).toString(),
    [CreatePromoCodeValues.endDate]: now(getLocalTimeZone()).add({ days: 1 }).toString(),
    [CreatePromoCodeValues.limit]: 1000,
    [CreatePromoCodeValues.settings]: CreatePromoCodeSendSettings.WithoutSending,
  },
})

const onSubmit = form.handleSubmit((values) => {
  emit('onClickCreate', values)
  form.resetForm()
})
</script>

<template>
  <form @submit="onSubmit">
    <div class="mb-2.5 -translate-y-1 text-center text-sm font-semibold sm:text-left">
      Срок действия промокода<span class="text-destructive">*</span>
    </div>
    <div class="mb-2.5 flex flex-col items-center gap-5 sm:flex-row">
      <FormDatePicker
        :name="CreatePromoCodeValues.startDate"
        :form
        :minValue="today(getLocalTimeZone())"
        label="Дата начала"
      />
      <FormDatePicker
        v-show="!isEndDateDisabled"
        :name="CreatePromoCodeValues.endDate"
        :form
        :minValue="today(getLocalTimeZone())"
        label="Дата конца"
      />
    </div>
    <BaseCheckbox
      v-model="isEndDateDisabled"
      label="Без даты конца"
      @update:model-value="
        () => {
          if (isEndDateDisabled === true) {
            form.setFieldValue(CreatePromoCodeValues.endDate, undefined)
          }
        }
      "
    />
    <div class="mt-5 border-t border-t-[#EBEBF0] pt-5.5">
      <FormInput
        :name="CreatePromoCodeValues.limit"
        required
        label="Введите лимит активаций (шт.)"
        onlyNumbers
        class="mb-5.5"
      />
      <FormRadioGroup
        :name="CreatePromoCodeValues.settings"
        label="Настроить получение промокода"
        :items="[
          {
            name: 'Создать промокод без отправки',
            value: CreatePromoCodeSendSettings.WithoutSending,
          },
          {
            name: 'Отправить промокод всем пользователям',
            value: CreatePromoCodeSendSettings.ToAllUsers,
          },
        ]"
      />
    </div>
    <div class="mt-4.5 flex gap-3">
      <Button variant="secondary" type="button" @click="emit('onClickBack')" class="flex-1">
        Назад
      </Button>
      <Button type="submit" class="flex-1">Создать</Button>
    </div>
  </form>
</template>
