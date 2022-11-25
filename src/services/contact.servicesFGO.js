const knex = require('../database/knex');

class ContactServiceFGO {
    constructor() {
        this.fatego = knex('fatego');
    }
    // define method for accessing fatego database
    #getContactFGO(payload) {
        const contactFGO = { ...payload };
        const contactFGOproperties = [
            "servant",
            "image",
            "skill1",
            "skill2",
            "skill3",
            "descr",
        ];
        // remove non-existing properties
        Object.keys(contactFGO).forEach((key) => {
                    if (contactFGOproperties.indexOf(key) === -1) {
                        delete contactFGO[key];
                    }
        });
        return contactFGO;
    }

    async createFGOch(payload) {
        const contactFGO = await this.#getContactFGO(payload);
        const [id] = await this.fatego.insert(contactFGO);
        return { id, ...contactFGO };
    }

    async fixFGOchar(id, payload) {
        const update = this.#getContactFGO(payload);
        return await this.fatego.where('id', id).update(update);
    }
    
    async deleteFGOchar(id) {
        return await this.fatego.where('id', id).delete();
    }
}

module.exports = ContactServiceFGO;
