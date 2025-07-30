import { z } from 'zod'

z.setErrorMap((issue, ctx) => {
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      return { message: 'Поле обязательно для заполнения' }
      break
    case z.ZodIssueCode.too_small:
      return { message: `Минимум ${issue.minimum} символов` }
    case z.ZodIssueCode.too_big:
      return { message: `Максимум ${issue.maximum} символов` }
  }
  return { message: ctx.defaultError }
})
