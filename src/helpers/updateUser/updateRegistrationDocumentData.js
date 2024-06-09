import { updateIdentificationDocument } from "../../firebase/auth/auth_update_user_profile.js";

export async function updateRegistrationDocumentData(name) {

    await updateIdentificationDocument({
      	displayName: name
    })
}