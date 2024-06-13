import { auth, updatePassword } from "../configuraciones.js";

export async function updateAuthenticationPassword(newPassword) {

    const user = auth.currentUser;
    return await updatePassword(user, newPassword)

}