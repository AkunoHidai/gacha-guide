const knex = require('../database/knex');

class ContactServicePR {
    constructor() {
        this.prconn = knex('princess-connect');
    }
    // define method for accessing fatego database
    #getContactPR(payload) {
        const contactPR = { ...payload };
        const contactPRproperties = [
            "image",
            "charname",
            "UB",
            "skill1",
            "skill2",
            "ex_skill",
        ];
        // remove non-existing properties
        Object.keys(contactPR).forEach((key) => {
                    if (contactPRproperties.indexOf(key) === -1) {
                        delete contactPR[key];
                    }
        });
        return contactPR;
    }

    async createPRch(payload) {
        const contactPR = await this.#getContactPR(payload);
        const [id] = await this.prconn.insert(contactPR);
        return { id, ...contactPR };
    }

    async fixPRchar(id, payload) {
        const update = this.#getContactPR(payload);
        return await this.prconn.where('id', id).update(update);
    }
    
    async deletePRchar(id) {
        return await this.prconn.where('id', id).delete();
    }
}

module.exports = ContactServicePR;
