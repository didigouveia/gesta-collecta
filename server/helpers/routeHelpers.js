const Joi = require('@hapi/joi')
    .extend(require('@hapi/joi-date'));

module.exports = {
    validateParam: (schema, name) => {
        return (req, res, next) => {
            const result = schema.validate({ param: req.params[name] });
            if (result.error) {
                return res.status(400).json(result.error);
            } else {
                if (!req.value)
                    req.value = {};
                if (!req.value.params)
                    req.value.params = {};
                req.value.params[name] = result.value.param;
                next();
            }
        };
    },

    validateBody: (schema) => {
        return (req, res, next) => {
            const result = schema.validate(req.body);
            if (result.error) {
                return res.status(400).json(result.error);
            } else {
                if (!req.value)
                    req.value = {};
                if (!req.value.body)
                    req.value.body = {};
                addModalityFields(result.value);
                req.value.body = result.value;
                next();
            }
        };
    },

    schemas: {
        gestureSchema: Joi.object().keys({
            name: Joi.string().required(),
            subject: Joi.number().required(),
            date: Joi.string().required(), // TODO: verify date
            strokes: Joi.array().items(
                Joi.array().items(
                    Joi.object().keys({ // TODO: verify x, y, z, etc exclusivity
                        x: Joi.number().allow(null).required(),
                        y: Joi.number().allow(null).required(),
                        z: Joi.number().allow(null).required(),
                        w: Joi.number().allow(null).required(),
                        alpha: Joi.number().allow(null).required(),
                        beta: Joi.number().allow(null).required(),
                        gamma: Joi.number().allow(null).required(),
                        t: Joi.date().timestamp(),
                        strokeId: Joi.number().required()
                    }))),
            device: Joi.object().keys({
                os_browser_info: Joi.string().required(),
                resolution_height: Joi.number().required(),
                resolution_width: Joi.number().required(),
                window_height: Joi.number().required(),
                window_width: Joi.number().required(),
                pixel_ratio: Joi.number().required(),
                mouse: Joi.boolean().valid(true),
                pen: Joi.boolean().valid(true),
                finger: Joi.boolean().valid(true),
                acceleration: Joi.boolean().valid(true),
                webcam: Joi.boolean().valid(true)
            }).xor('mouse', 'pen', 'finger', 'acceleration', 'webcam')
        }),

        idSchema: Joi.object().keys({
            param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    }
};

const modalities = ['mouse', 'pen', 'finger', 'acceleration', 'webcam']; // TODO: move to constants or utilities file
function addModalityFields(gesture) {    
    modalities.forEach(modality => {
        if (!gesture.device[modality]) {
            gesture.device[modality] = false;
        }
    });
}