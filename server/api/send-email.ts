import sgMail from '@sendgrid/mail'
import { defineEventHandler, readBody, useRuntimeConfig } from '#imports'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { to, subject, text } = await readBody(event)
  sgMail.setApiKey(config.SENDGRID_API_KEY)

  const msg = {
    to,
    from: {
      name: 'REUNION(リユニオン)',
      email: config.FROM_EMAIL,
    },
    subject,
    text,
  }

  try {
    await sgMail.send(msg)
    console.log('メール送信成功:', msg)
    return { status: 'success' }
  } catch (error) {
    console.error('送信エラー:', error)
    return { status: 'error', message: 'メール送信に失敗しました' }
  }
})