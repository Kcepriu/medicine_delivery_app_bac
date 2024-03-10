import requestError from "../helpers/requestError";
import { ObjectSchema } from "joi";

const validateBody = (schema: ObjectSchema) => {
  const func = (req: any, _: any, next: any): void => {
    const { error } = schema.validate(req.body);

    if (error) {
      next(requestError(400, error.message));
    }

    next();
  };

  return func;
};

export default validateBody;
