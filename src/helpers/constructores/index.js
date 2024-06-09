class Account {
    constructor({
        displayName = "",
        typeRegister = "",
        photoURLUser = "",
        email = "",
        uid = "",
        publications_made = [],
        description = "",
        activeSession = false,
        password = ""
    }){
        this.displayName = displayName,
        this.typeRegister = typeRegister,
        this.photoURLUser = photoURLUser,
        this.email = email,
        this.uid = uid,
        this.publications_made = publications_made,
        this.description = description,
        this.activeSession = activeSession
        this.password = password
    }
}

export {
    Account
}