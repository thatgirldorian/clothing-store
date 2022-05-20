//create a class that'll allow us store user data
class usersRepository {
    constructor(filename) {
        if (!filename) {
            throw new Error("Sorry! You have to provide a filename.");
        }

        
        this.filename = filename;
    }

}

new usersRepository()