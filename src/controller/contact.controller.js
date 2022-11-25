const ContactServiceFGO = require('../services/contact.servicesFGO');
const ContactServicePR = require('../services/contact.servicesPR');
const ApiError = require('../api-error');

// module that check if create servant work or not
exports.createFGO = async function(req, res, next) {
    if (!req.body?.servant) {
        return next(new ApiError(400, 'Servant name cannot be empty'))
    }
    try {
        const contactService = new ContactServiceFGO();
        const contactFGO = await contactService.createFGOch(req.body);
        return res.send(contactFGO);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'Error creating character')
        );
    }
};
exports.deleteFGO = function(req, res, next) {
    try {
        const contactService = new ContactServiceFGO();
        const deleteFGO = contactService.deleteFGOchar(req.params.id);
        if (!deleteFGO) {
            return next(new ApiError(404, 'can\'t find  contact'));
        }
        return res.send({message : `Delete character with id = ${req.params.id} successfully`});
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Error deleting character with id = ${req.params.id}`)
        )
    }
}
exports.fixFGO = function(req, res, next) {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update can\'t be empty'));
    }
    try {
        const contactService = new ContactServiceFGO();
        const fixfate = contactService.fixFGOchar(req.params.id, req.body);
        if (!fixfate) {
            return next(new ApiError(404, 'Character not found'));
        }
        return res.send({message : `Character with id=${req.params.id} updated successfully`});
    } catch (error) {
        new ApiError(500, `Error fixing character with id ${req.params.id}!`);
    }
};

// module that check if create character work or not
exports.createPR = async function(req, res, next) {
    if (!req.body?.charname) {
        return next(new ApiError(400, 'Character name cannot be empty'));
    }
    try {
        const contactService = new ContactServicePR();
        const contactPR = await contactService.createPRch(req.body);
        return res.send(contactPR);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, 'Error creating character')
        );
    }
};
exports.deletePR = function(req, res, next) {
    try {
        const contactService = new ContactServicePR();
        const deletePR = contactService.deletePRchar(req.params.id);
        if (!deletePR) {
            return next(new ApiError(404, 'can\'t find  contact'));
        }
        return res.send({message : `Delete character with id = ${req.params.id} successfully`});
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Error deleting character with id = ${req.params.id}`)
        )
    }
}
exports.fixPR = function(req, res, next) {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update can\'t be empty'));
    }
    try {
        const contactService = new ContactServicePR();
        const fixPRch = contactService.fixPRchar(req.params.id, req.body);
        if (!fixPRch) {
            return next(new ApiError(404, 'Character not found'));
        }
        return res.send({message : `Character with id=${req.params.id} updated successfully`});
    } catch (error) {
        new ApiError(500, `Error fixing character with id ${req.params.id}!`);
    }
};
