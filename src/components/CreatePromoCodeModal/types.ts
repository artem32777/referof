type DateTimeISO = string

export const enum CreatePromoCodeStep {
  General = 'General',
  Settings = 'Settings',
}

export enum CreatePromoCodeSendSettings {
  WithoutSending = 'WithoutSending',
  ToAllUsers = 'ToAllUsers',
}

export const enum CreatePromoCodeValues {
  name = 'name',
  title = 'title',
  text = 'text',
  points = 'points',
  startDate = 'startDate',
  endDate = 'endDate',
  limit = 'limit',
  settings = 'settings',
}

export type CreatePromoCodeGeneralForm = {
  [CreatePromoCodeValues.name]: string
  [CreatePromoCodeValues.title]: string
  [CreatePromoCodeValues.text]?: string
  [CreatePromoCodeValues.points]: number
}

export type CreatePromoCodeSettingsForm = {
  [CreatePromoCodeValues.startDate]: DateTimeISO
  [CreatePromoCodeValues.endDate]?: DateTimeISO
  [CreatePromoCodeValues.limit]: number
  [CreatePromoCodeValues.settings]: CreatePromoCodeSendSettings
}

export type CreatePromoCodeForm = CreatePromoCodeGeneralForm & CreatePromoCodeSettingsForm
