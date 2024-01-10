import { loginPersistence } from "./firebase/auth/auth_setPersistence.js";
import { changeView } from "./view-controler/router.js";

let container = document.getElementById('container');
container.innerHTML= ''
let navegador = document.getElementById('navegador');
navegador.innerHTML= ''
export function App() {
    changeView(container,navegador)
    loginPersistence()
}