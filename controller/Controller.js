import { response, request } from "express";
export class Controller {
  constructor(model) {
    this.model = model;
  }

  async index(request, response) {
    try {
      const elements = await this.model.find({}).lean();
      response.json(elements);
    } catch (error) {
      response.status(400).send(error.message);
    }
  }

  async create(request, response) {
    try {
      const element = await this.model.create(request.body);
      response.send(element);
    } catch (error) {
      response.status(400).send(error.message);
    }
  }

  async read(request, response) {
    try {
      const element = await this.model.findById(request.params.id);
      response.send(element);
    } catch (error) {
      response.status(400).send(error.message);
    }
  }

  async update(request, response) {
    try {
      const element = await this.model.findByIdAndUpdate(
        request.params.id,
        request.body,
        {
          new: true,
        }
      );

      response.send({ element });
    } catch (error) {
      response.status(400).send(error.message);
    }
  }

  async delete(request, response) {
    try {
      const element = await this.model.findById(request.params.id);

      await element.remove();

      response.send("Element Removed");
    } catch (error) {
      response.status(400).send(error.message);
    }
  }
}
