import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JuegoService {
  
  getJuegoById(id: number) {
    //por ahora hardcodeado
    return {
      id: id,
      nombre: 'Hollow Knight: Silksong',
      descripcion: "Conviértete en la princesa guerrera¡Encarnando a la letal cazadora Hornet, explora un reino de gobernado por la seda y el canto! Tras ser capturada y llevada a un mundo desconocido, prepárate para luchar contra poderosos enemigos y resolver misterios mientras asciendes en un peregrinaje mortal hasta la cima del reino <br>Hollow Knight: Silksong es la épica secuela del premiado videojuego de acción y aventura Hollow Knight. Viaja a tierras totalmente nuevas, descubre nuevos poderes, combate contras vastas hordas de bichos y bestias y revela secretos ligados a tu naturaleza y a tu pasado.",
      precio: 19.99,
      imagenes: [
      'assets/images/imagen1.jpg',
      'assets/images/imagen2.jpg',
      'assets/images/imagen3.jpg',
      'assets/images/imagen4.jpg',
      'assets/images/imagen5.jpg',
      ],
      reviews: [
        {
          id: 1,
          descripcion: 'Tras pasarme el juego al 100% no puedo recomendar más este juego. Voy a intentar ser lo más neutral posible para analizar el juego pero hay experiencias que las he vivido de una manera y para cada uno será distinto.',
          valoracion: 'Muy positiva'
        },
        {
          id: 2,
          descripcion: 'Más grande, fluído, bonito y exigente que el original Hollow Knight. El rey de los Metroidvania por excelencia. Obra maestra que eleva a team Cherry al Panteón del género',
          valoracion: 'Muy positiva'
        },
        {
          id: 3,
          descripcion: 'Habiéndome jugado por completo el primer juego, afirmo que silksong es mucho mas difícil (sobretodo en el acto 3 donde la dificultad se eleva muchísimo) haciéndose injusta en algunas ocasiones, pero eso no lo hace un mal juego, lo hace desafiante lo cual lo veo como un punto bueno. en los otros apartados tanto en el diseño artístico como en la música, sigue estando a la altura del primer hollow knight, e incluso mejor.',
          valoracion: 'Extremadamente positiva'
        }
      ]
    };
  }
}
