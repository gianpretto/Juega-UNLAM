import type {JuegoRepository} from "../repository/juego.repository.js";

export class JuegoService{
    constructor(private juegoRepository: JuegoRepository){}

    public obtenerJuegos = async()=>{
        return this.juegoRepository.obtenerJuegos();
    }
    
    public obtenerJuegoPorId = async(id:number)=>{
        return this.juegoRepository.obtenerJuegoPorId(id);
    }

    public eliminarJuego = async(id:number)=>{
        return this.juegoRepository.eliminarJuego(id);
    }
}