import Joi from "joi";

const schemaCreate = Joi.object({
  isCreate: Joi.boolean().required(),
});

const schemaDelete = Joi.object({
  isDelete: Joi.boolean().required(),
});

export const shemas = {
  schemaCreate,
  schemaDelete,
};
