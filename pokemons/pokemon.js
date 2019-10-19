const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
let DB_URL =
  "mongodb+srv://59161146:02539d07c7@cluster0-fbqsx.gcp.mongodb.net/test?retryWrites=true&w=majority";
const DB_NAME = "pokemondb";
const options = { useNewUrlParser: true, useUnifiedTopology: true };
let client;

let pokemons = [];
mockPokemon();

function Pokemon(name, type) {
  this.name = name;
  this.type = type;
  this.id = null;
  this.type2 = null;
}

// async function connectDatabase() {
//   if (client !== undefined && client !== null && client !== "") {
//     return client;
//   }

//   client = await MongoClient.connect(DB_URL, options).catch(err =>
//     console.error(err)
//   );
//   return
// }

// async function getCollection(name) {
//   client = await connectDatabase()
//     .connect(DB_URL, options)
//     .catch(err => console.error(err));
//   database = client.db(name);
//   return database;
// }

async function savePokemon(name, type) {
  let p = createPokemon(name, type);

  var collection, database;

  var client = await MongoClient.connect(DB_URL, options).catch(err =>
    console.error(err)
  );

  database = client.db(DB_NAME);
  collection = database.collection("pokemons");
  //   collection = getCollection(DB_NAME).collection("pokemons");
  try {
    var result = await collection.insert(p);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  } finally {
    client.close();
  }

  //   MongoClient.connect(
  //     DB_URL,
  //     { useNewUrlParser: true, useUnifiedTopology: true },
  //     (err, client) => {
  //       if (err) {
  //         return false;
  //       }

  //       database = client.db(DB_NAME);
  //       collection = database.collection("pokemons");
  //       collection.insert(p, (err, result) => {
  //         if (err) {
  //           return false;
  //         }
  //         return true;
  //       });
  //     }
  //   );
}

function createPokemon(name, type) {
  let p = new Pokemon(name, type);
  p.id = generateNewId(pokemons.length);
  return p;
}

function mockPokemon() {
  pokemons.push(createPokemon("Pikachu", "Electric"));
  pokemons.push(createPokemon("Paras", "Bug"));
}

function generateNewId(num) {
  return num + 1;
}

async function isPokemonExisted(id) {
  var objectId = new ObjectID(id);
  var collection, database;

  var client = await MongoClient.connect(DB_URL, options).catch(err =>
    console.error(err)
  );

  database = client.db(DB_NAME);
  collection = database.collection("pokemons");
  try {
    var result = await collection.findOne({ _id: objectId });
    return result !== undefined && result !== null;
  } catch (err) {
    console.error(err);
    return false;
  } finally {
    client.close();
  }
}

async function getPokemon(id) {
  var collection, database;

  var client = await MongoClient.connect(DB_URL, options).catch(err =>
    console.error(err)
  );

  database = client.db(DB_NAME);
  collection = database.collection("pokemons");
  try {
    var result = await collection.findOne({ _id: ObjectID(id) });
    return result;
  } catch (err) {
    console.error(err);
    return false;
  } finally {
    client.close();
  }
}

async function getAllPokemon() {
  var collection, database;

  var client = await MongoClient.connect(DB_URL, options).catch(err =>
    console.error(err)
  );

  database = client.db(DB_NAME);
  collection = database.collection("pokemons");
  try {
    var result = await collection.find({}).toArray();
    return result;
  } catch (err) {
    console.error(err);
    return false;
  } finally {
    client.close();
  }
}

async function update(id, type2) {
  var collection, database;

  var client = await MongoClient.connect(DB_URL, options).catch(err =>
    console.error(err)
  );

  database = client.db(DB_NAME);
  collection = database.collection("pokemons");
  try {
    var result = await collection.updateOne(
      { _id: ObjectID(id) },
      { $set: { type2: type2 } }
    );
    return true;
  } catch (err) {
    console.error(err);
    return false;
  } finally {
    client.close();
  }
}

function setDBUri(uri) {
  DB_URL = uri;
}

module.exports.isPokemonExisted = isPokemonExisted;
module.exports.savePokemon = savePokemon;
module.exports.getPokemon = getPokemon;
module.exports.getAllPokemon = getAllPokemon;
module.exports.update = update;
module.exports.dburi = setDBUri;
