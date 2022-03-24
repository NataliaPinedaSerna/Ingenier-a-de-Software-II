const SuperheroModel = require('../models/superheroModel');
class SuperheroService {
  async createSuperhero(superhero) {
    superhero.save();
    return superhero;
  }
  async listSuperhero() {
    return SuperheroModel.find();
  }
  async showSuperhero(superheroId) {
    return SuperheroModel.findById({ _id: superheroId });
  }
  async editSuperhero(
    superheroId,
    superhero,
    real_name,
    features,
    superhero_sidekick
  ) {
    return SuperheroModel.updateOne(
      { _id: superheroId },
      { superhero, real_name, features, superhero_sidekick }
    );
  }
  async removeSuperhero(superheroId) {
    const superhero_remove = SuperheroModel.findById({ _id: superheroId });
    return SuperheroModel.deleteOne(superhero_remove);
  }
}
module.exports = SuperheroService;