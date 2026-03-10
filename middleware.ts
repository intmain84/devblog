import {
  apiAuthPrefix,
  authRoutes,
  LOGIN_REDIRECT_URL,
  publicRoutes,
} from "./routes";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";

const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  console.log("isLoggedIn>>>>:", isLoggedIn);
  console.log("nextUrl>>>>:", nextUrl.pathname);

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  if (isApiAuthRoute) return; //Нужно пропустить этот маршрут, так как он обрабатывается отдельно

  if (isAuthRoute) {
    //если попытка зайти на страницы логина или регистрации
    if (isLoggedIn) {
      //и пользователь уже авторизован, то перенаправляем на другую страницу
      return NextResponse.redirect(new URL(LOGIN_REDIRECT_URL, nextUrl));
    }
    return; //если пользователь не авторизован, то пропускаем на логин или регистрацию
  }

  if (!isLoggedIn && !isPublicRoute) {
    //если пользователь не авторизован и не на публичной странице, то перенаправляем на логин
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return; //если все проверки прошли успешно, то пропускаем на страницу
});

export const config = {
  matcher: [
    //миддлвар должен работать на всех маршрутах, кроме статических файлов и разрешены для /api и /trpc
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
