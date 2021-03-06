//require the fs module
const fs = require('fs')
const crypto = require('crypto')


//this class will house all the repositories: functions + classes for users and products
module.exports = class Repository {
    constructor(filename) {
        if (!filename) {
            throw new Error("Sorry! You have to provide a filename.");
        }
        
        this.filename = filename;
        //check to see if a file exists
        try {
            fs.accessSync(this.filename)
        } catch (error) {
            //create file it it doesn't exist
            fs.writeFileSync(this.filename, '[]')
        }
    }

    //this method will create a new record 
    async create(attributes) {
        attributes.id = this.randomId()

        const records = await this.getAll()
        records.push(attributes)
        await this.writeAll(records)

        return attributes
    }

    //this method gets a list of all users
    async getAll() {
        //open the file called this.filename and read its contents and return the parsed data
        return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf8'}))
    }

    //this method writes/saves all users to the users.json file
    async writeAll(records) {
        await fs.promises.writeFile(this.filename,
            JSON.stringify(records, null, 2))
    }

    //this method generates a random identifier
    randomId() {
        return crypto.randomBytes(5).toString('hex')
}

    //this method retrieves one user record
    async getOne(id) {
        const records = await this.getAll()
        return records.find(record => record.id === id)
    }

    //this method will let us delete a user record
    async delete(id) {
        const records = await this.getAll()
        const filteredRecords = records.filter(record => record.id != id)
        await this.writeAll(filteredRecords)
    }

    //this method will update a user record
    async update(id, attributes) {
        const records = await this.getAll()
        const record = records.find(record => record.id == id)

        //handle an error here
        if (!record) {
            throw new Error(`The record with an ID: ${id} was not found`)
        }

        //update the properties
        Object.assign(record, attributes)
        await this.writeAll(records)

    }

    //this method will get the first record that matches the filter given
    async getOneBy(filters) {
        const records = await this.getAll()

        for (let record of records) {
            let found = true

            for (let key in filters) {
                if (record[key] !== filters[key]) {
                    found = false
                }
            }
            if (found === true) {
                return record
            }
        }
    }
}