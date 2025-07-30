<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import FormInput from '@/components/ui/input/FormInput.vue'
import FormTextarea from '@/components/ui/textarea/FormTextarea.vue'
import refcoinIcon from '@/assets/icons/refcoin.svg'
import {
  type CreatePromoCodeGeneralForm,
  CreatePromoCodeValues,
} from '@/components/CreatePromoCodeModal/types.ts'

const emit = defineEmits<{
  onClickNext: [formData: CreatePromoCodeGeneralForm]
  onClickCancel: [void]
}>()

const form = useForm({
  validationSchema: toTypedSchema(
    z.object({
      [CreatePromoCodeValues.name]: z.string().max(30),
      [CreatePromoCodeValues.title]: z.string().max(120),
      [CreatePromoCodeValues.text]: z.string().max(250).optional(),
      [CreatePromoCodeValues.points]: z.coerce
        .number({ message: 'Введите число' })
        .min(1, { message: 'Минимум один балл' }),
    }),
  ),
})

const onSubmit = form.handleSubmit((values) => emit('onClickNext', values))
</script>

<template>
  <form @submit="onSubmit" class="space-y-4.5">
    <FormInput name="name" required label="Название промокода" placeholder="Введи название" />
    <FormInput
      :name="CreatePromoCodeValues.title"
      required
      label="Заголовок"
      placeholder="Введи заголовок"
      class="mb-4.5"
    />
    <FormTextarea
      :name="CreatePromoCodeValues.text"
      label="Сопроводительный текст"
      placeholder="Например: «Ты попал в число счастливчиков! Дарим 300 баллов»"
    />
    <FormInput
      :name="CreatePromoCodeValues.points"
      required
      label="Укажи количество баллов"
      placeholder="100"
      onlyNumbers
      :iconPath="refcoinIcon"
    />
    <div class="flex gap-3">
      <Button variant="secondary" type="button" @click="emit('onClickCancel')" class="flex-1">
        Отмена
      </Button>
      <Button type="submit" class="flex-1">Далее</Button>
    </div>
  </form>
</template>
