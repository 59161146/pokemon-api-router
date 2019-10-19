import test from "ava";
const MongoDBServer = require("mongomem").MongoDBServer;
require("chai").should();

const pokemon = require("../pokemons/pokemon");

test.before("start MongoDBServer", async t => {
  await MongoDBServer.start();
  const dburi = await MongoDBServer.getConnectionString();
  pokemon.dburi(dburi);
  await pokemon.savePokemon("Pidgeot", "Normal");
  await pokemon.savePokemon("Mew", "Psychic");
});

test("getPokemons()", async t => {
  let result = await pokemon.getAllPokemon();
  t.true(Array.isArray(result));
  let p = result[0];
  p.should.have.property("name");
});

// test("getPokemons(id)", async t => {
//   let result = await pokemon.getPokemon("5da1826672e6bc26f09453dd");
//   t.true(result, {
//     _id: "5da1826672e6bc26f09453dd",
//     id: 3,
//     name: "Pidgeot",
//     type: "Normal",
//     type2: "Flying"
//   });
//   let p = result[0];
//   p.should.have.property("name");
// });

test("savePokemon(name,type)", async t => {
  let result = await pokemon.savePokemon("Pidgeot", "Normal");
  t.true(result);
});

test("update(id,type2)", async t => {
  let result = await pokemon.update("5da1826672e6bc26f09453dd", "Flying");
  t.true(result);
});
