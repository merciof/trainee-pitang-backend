export function validation(schema) {
  return async function (request, response, next) {
    try {
      await schema.validate(request.body);
      return next();
    } catch (error) {
      return response.status(400).send(error);
    }
  };
}
