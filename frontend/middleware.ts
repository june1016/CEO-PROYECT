import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

// Define un tipo personalizado que incluya 'role'
interface CustomJwtPayload {
  role: string;
  // otras propiedades del token si es necesario
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  // Redireccionar a la página de inicio si el usuario está logueado y accede a la página de login o register
  if ((pathname === "/login" || pathname === "/register") && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Proteger las rutas que requieren autenticación
  const protectedPaths = ["/dashboard", "/"];
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );
  // Redireccionar a la página de login si el usuario no está logueado y accede a una ruta protegida
  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Redireccionar a la página de login si el usuario no está logueado y accede a una ruta de tutor
  if (!token) {
    if (pathname.startsWith("/tutor")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }
  // Decodificar el token para obtener el rol del usuario
  const decoded = jwtDecode<CustomJwtPayload>(token);
  const role = decoded.role; // Asegúrate de que el token incluye el rol

  // Redireccionar a la página de inicio si el usuario no es tutor y accede a una ruta de tutor
  if (pathname.startsWith("/tutor") && role !== "tutor") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/login",
    "/register",
    "/auth/requestPasswordReset",
    "/auth/passwordReset/:path*",
    "/tutor/:path*", // Añadido para incluir rutas de tutor
  ],
};
