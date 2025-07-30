<script setup lang="ts">
import { Dialog, DialogTrigger, DialogTitle, DialogScrollContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import CreatePromoCodeModalGeneral from '@/components/CreatePromoCodeModal/CreatePromoCodeModalGeneral.vue'
import CreatePromoCodeModalSettings from '@/components/CreatePromoCodeModal/CreatePromoCodeModalSettings.vue'
import { ref } from 'vue'
import CreatePromoCodeModalSteps from '@/components/CreatePromoCodeModal/CreatePromoCodeModalSteps.vue'
import {
  type CreatePromoCodeForm,
  CreatePromoCodeStep,
} from '@/components/CreatePromoCodeModal/types.ts'

const isModalOpen = ref(false)
const activeStep = ref(CreatePromoCodeStep.Settings)
const promoCodeData = ref<Partial<CreatePromoCodeForm>>({})
</script>

<template>
  <Dialog v-model:open="isModalOpen">
    <DialogTrigger as-child>
      <Button>Создать промокод</Button>
    </DialogTrigger>
    <DialogScrollContent>
      <DialogTitle class="mb-5 text-xl font-semibold">Создание промокода</DialogTitle>
      <CreatePromoCodeModalSteps :activeStep />
      <CreatePromoCodeModalGeneral
        v-show="activeStep === CreatePromoCodeStep.General"
        @onClickNext="
          (formData) => {
            Object.assign(promoCodeData, formData)
            activeStep = CreatePromoCodeStep.Settings
          }
        "
        @onClickCancel="isModalOpen = false"
      />
      <CreatePromoCodeModalSettings
        v-show="activeStep === CreatePromoCodeStep.Settings"
        @onClickCreate="
          (formData) => {
            Object.assign(promoCodeData, formData)
            isModalOpen = false
            activeStep = CreatePromoCodeStep.General
            console.log(
              Object.fromEntries(
                Object.entries(promoCodeData).filter(([key, value]) => value !== undefined),
              ),
            )
          }
        "
        @onClickBack="activeStep = CreatePromoCodeStep.General"
      />
    </DialogScrollContent>
  </Dialog>
</template>
