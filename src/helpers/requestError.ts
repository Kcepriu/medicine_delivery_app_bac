interface IMesage {
  [index: number]: string;
}

const messages: IMesage = {
  204: "No Content",
  400: "Bad Request",
  401: "Unautorized",
  403: "Forbidden",
  404: "NotFound",
  409: "Conflict",
};

interface IError extends Error {
  status: number;
}

const RequestError = (
  status: number = 404,
  message: string = messages[status]
): IError => {
  const error: IError = new Error(message) as IError;
  error.status = status;
  return error;
};

export default RequestError;
