"use server";

import {
  generatePasswordResetToken,
  sendPasswordReset,
} from "@/lib/passwordResetToken";
import { getUserByEmail } from "@/lib/user";
import { PasswordSchema, PasswordSchemaType } from "@/schemas/PasswordSchema";

export const resetPasswordEmail = async (values: PasswordSchemaType) => {
  // 1. Сначала нужно провалидировать входные данные через safeParse.
  //    Если валидация не прошла, надо сразу вернуть ошибку вроде "Invalid email"
  //    и дальше ничего не делать.
  const validatedFields = PasswordSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid email" };

  // 2. Если валидация успешна, надо достать email из validatedFields.data.

  const { email } = validatedFields.data;

  // 3. Затем нужно проверить, существует ли пользователь с таким email в базе.
  //    Если пользователя нет, обычно все равно возвращают нейтральный успешный ответ
  //    вроде "If an account exists, we sent a reset email", чтобы не палить,
  //    зарегистрирован ли такой email в системе.

  const user = await getUserByEmail(email);
  if (!user) return { success: "If an account exists, we sent a reset email" };

  // 4. Если пользователь существует, нужно сгенерировать reset token
  //    через функцию, которая:
  //    - удалит старый токен для этого email, если он уже есть
  //    - создаст новый токен
  //    - сохранит его в базе с датой истечения

  const passwordResetToken = await generatePasswordResetToken(email);

  // 5. После этого нужно отправить письмо на email пользователя
  //    со ссылкой на сброс пароля, куда будет подставлен этот token.

  const { error } = await sendPasswordReset(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  // 6. Затем нужно проверить результат отправки письма.
  //    Если почта не отправилась, вернуть понятную ошибку
  //    вроде "Failed to send password reset email".
  if (error) {
    return {
      error: "Failed to send password reset email! Try again later.",
    };
  }

  // 7. Если все прошло успешно, вернуть success-сообщение,
  //    что ссылка для сброса пароля отправлена на почту.
  return {
    success: `Check your email for reset password! It was sent to ${email}!`,
  };

  // 8. На этом этапе пароль еще НЕ меняется.
  //    Этот action только принимает email, создает токен
  //    и запускает процесс восстановления через письмо.
};
