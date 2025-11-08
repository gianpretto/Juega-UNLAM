import { Usuario } from "@interfaces/usuario.interface";
import { Juego } from "@interfaces/juego.interface";

/**
 * Interfaz que representa la relación entre un usuario y un juego en su biblioteca
 * Esta es la estructura que devuelve el endpoint /usuario-juegos
 */
export interface UsuarioJuego {
  id: number;
  detalle: string;            // Ej: "Comprado en oferta", "Primera compra", etc.
  fecha: string;              // Fecha en formato ISO
  usuarioId: number;
  usuario?: Usuario;          // Usuario propietario
  juegoId: number;
  juego: Juego;               // ⬅️ IMPORTANTE: El juego completo viene anidado aquí
}