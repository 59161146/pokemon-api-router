const express = require("express");
const router = express.Router();
const pokemon = require("./pokemon");

function isSufficientParam(v) {
  return v !== undefined && v !== null && v !== "";
}

// GET /pokemons -> list all pokemons http://localhost:3000/pokemons
router.get("/pokemons", (req, res) => {
  pokemon
    .getAllPokemon()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.error(err);
      res.status(400).send({ error: "pokemons is not found" });
    });
});

// POST /pokemons -> add pokemon to list
router.post("/pokemons", (req, res) => {
  if (!isSufficientParam(req.body.name) || !isSufficientParam(req.body.type)) {
    res.status(400).send({
      error: "Insufficient parameters: name and type are required parameter"
    });
    return;
  }

  let success = pokemon
    .savePokemon(req.body.name, req.body.type)
    .then(result => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.error(err);
      res.status(400).send({ error: "Create pokemon is unsuccessfully:" });
    });
});

// GET http://localhost:3000/pokemon/1
router.get("/pokemon/:id", (req, res) => {
  if (!isSufficientParam(req.params.id)) {
    res
      .status(400)
      .send({ error: "Insufficient paramsters: id is required parameter" });
    return;
  }

  let id = req.params.id;
  pokemon
    .getPokemon(id)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.error(err);
      res.status(400).send({ error: "Pokemon is not found" });
    });
});

// PUT http://localhost:3000/pokemon/1
// Add type2
router.put("/pokemon/:id", (req, res) => {
  if (!isSufficientParam(req.body.type2)) {
    res
      .status(400)
      .send({ error: "Insufficient parameters: type2 is required parameter" });
    return;
  }

  if (!isSufficientParam(req.params.id)) {
    res
      .status(400)
      .send({ error: "Insufficient parameters: id is required parameter" });
    return;
  }

  let id = req.params.id;
  pokemon
    .isPokemonExisted(id)
    .then(result => {
      return
    })
    .catch(err => {
      console.error(err);
      res.status(400).send({ error: "Cannot update pokemon: Pokemon is not found" });
    });

  pokemon
    .update(id, req.body.type2)
    .then(result => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.error(err);
      res.status(400).send({ error: "Pokemon is not found" });
    });
});

router.delete("/pokemon/:id", (req, res) => {
  if (!isSufficientParam(req.params.id)) {
    res
      .status(400)
      .send({ error: "Insufficient parameters: id is required parameter" });
    return;
  }

  let id = req.params.id;
  if (!isPokemonExisted(id)) {
    res
      .status(400)
      .send({ error: "Cannot delete pokemon: Pokemon is not found" });
    return;
  }

  delete pokemons[id - 1];
  res.sendStatus(204);
});

module.exports = router;
