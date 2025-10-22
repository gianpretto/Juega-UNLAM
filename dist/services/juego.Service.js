export class JuegoService {
    juegoRepository;
    constructor(juegoRepository) {
        this.juegoRepository = juegoRepository;
    }
    obtenerJuegos = async () => {
        return this.juegoRepository.obtenerJuegos();
    };
    obtenerJuegoPorId = async (id) => {
        return this.juegoRepository.obtenerJuegoPorId(id);
    };
}
//# sourceMappingURL=juego.service.js.map