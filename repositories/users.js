//require the fs module
const fs = require('fs')
const crypto = require('crypto')
const util = require('util');

//require the Repository class for use here
const Repository = require('./repository')

const scrypt = util.promisify(crypto.scrypt)

//create a class that'll allow us store user data
class usersRepository extends Repository {
 //this method compares the hashed+salted passwords
    async comparePasswords(saved, supplied) {
        //saved password = password saved in our user records
        //supplied password = password given by user at login
        const [hashed, salt] = saved.split('.')
        const hashedSupplied = await scrypt(supplied, salt, 64)

        return hashed === hashedSupplied.toString('hex')
    }


    //this method creates a new set of user records
    async create(attributes) {
        attributes.id = this.randomId()

        //add a way to generate hashed + salted passwords
        const salt = crypto.randomBytes(8).toString('hex')
        const hashed = await scrypt(attributes.password, salt, 64)

        //replace th password with the hashed+salted equivalent
        const records = await this.getAll();
        const record = { 
            ...attributes,
            password: `${hashed.toString('hex')}.${salt}`
        }
        records.push(record)

        //add the updated records to our records array
        await this.writeAll(records)

        return record
    }

}

//make code available to other files in our application by exporting an instance of our class
module.exports = new usersRepository('users.json');
