export class Controller {
  constructor(model) {
    this.model = model;
  }

  async index(request, response) {
    const users = await this.model.find({}).lean();

    response.json(users);
  }

  async create(request, response) {
    const element = await this.model.create(request.body);

    response.send(element);
  }

  async read(request, response) {
    const id = request.params.id;

    const user = await this.model.findById(id);

    if (user) {
      return response.send(user);
    }

    response.status(404).send({ message: "Element does not exist" });
  }

  async update(request, response) {
    const element = await this.model.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
      }
    );

    if (element) {
      return response.send({ element });
    }

    response.status(404).send({ message: "Element not found" });
  }

  async delete(request, response) {
    try {
      const element = await this.model.findById(request.params.id);

      if (element) {
        await element.remove();

        response.json({ message: "Element Removed" });
      }
    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }
}
