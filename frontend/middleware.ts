import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Obtener el token de acceso de las cookies
  const token = request.cookies.get("access_token")?.value;

  // Si el usuario está autenticado, redirigirlo desde /login o /register a la página principal
  if ((pathname === "/login" || pathname === "/register") && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Si el usuario no está autenticado y trata de acceder a rutas protegidas
  if (
    (pathname.startsWith("/dashboard") || pathname === "/") &&
    !token &&
    pathname !== "/login"
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Configuración del matcher para aplicar el middleware en rutas específicas
export const config = {
  matcher: ["/", "/dashboard/:path*", "/login", "/register"],
};
