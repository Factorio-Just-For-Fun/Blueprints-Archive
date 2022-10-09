import fs from 'fs';
import strings from './util/strings.mjs';

class CustomObject {
  constructor() {}

  modify(consumer) {
    consumer(this);
    return this;
  }
}

class Blueprint extends CustomObject {
  // Accepts a object
  constructor(object) {
    super()

    if (!object) throw new Error("Attempting to create a blank blueprint");
    if (object.blueprint_book) throw new Error("Object passed to Blueprint is a Blueprint Book");
    if (!object.blueprint) throw new Error("Object passed to Blueprint is not a blueprint");

    // Assign values
    Object.assign(this, object.blueprint);
  }

  // Convert to an object compliant with factorio's json format
  toObject() {
      return { blueprint: { ...this } }
  }

  // Modify station names in-place and returns this.
  modifyAllStationNames(consumer) {
    if (this.entities) {
      const trainStops = this.entities.filter(it => it.name == 'train-stop');
      trainStops.forEach(stop => stop.station = consumer(stop.station));
    }

    // Schedules
    if (this.schedules) {
      const schedules = this.schedules.map(it => it.schedule);
      schedules.forEach(schedule => schedule.forEach(entry => entry.station = consumer(entry.station)));
    }

    return this;
  }

  // Modify descriptions and returns this.
  modifyAllDescriptions(consumer) {
    this.description = consumer(this.description);
    return this;
  }
}


class BlueprintBook extends CustomObject {
  // Accepts a blueprint book object
  constructor(object) {
    super()

    if (!object) throw new Error("Attempting to create a blank blueprint book: " + object);
    if (object.blueprint) throw new Error("Object passed to BlueprintBook is a Blueprint: " + object);
    if (!object.blueprint_book) throw new Error("Object passed to BlueprintBook is not a blueprint book: " + object);

    // Assign values
    Object.assign(this, object.blueprint_book);

    // Map to blueprint objects
    this.blueprints = [];
    if (object.blueprint_book.blueprints) {
      for (let child of object.blueprint_book.blueprints) {
        this.blueprints[child.index] = parseObject(child);
      }
    }
  }

  // Convert to an object compliant with factorio's json format
  toObject() {
    const object = { blueprint_book: { ...this } };

    object.blueprint_book.blueprints = [];
    for (let index in this.blueprints) {
      let blueprint = this.blueprints[index];
      if (!blueprint) continue;

      let child = blueprint instanceof CustomObject ? blueprint.toObject() : Object.assign({}, blueprint);
      child.index = index;

      object.blueprint_book.blueprints.push(child);
    }
    return object;
  }

  // Adds an object to the blueprint book and returns this
  addObject() {
    arguments.forEach(object => this.blueprints.push(object === undefined ? undefined : parseObject(object)));
    return this;
  }

  // Modify station names in-place and returns this.
  modifyAllStationNames(consumer) {
    for (let blueprint of this.blueprints) {
      if (blueprint instanceof CustomObject) blueprint.modifyAllStationNames(consumer);
    }

    return this;
  }

  // Call on all blueprints and sub-Blueprints
  forEachBlueprint(consumer) {
    for (let object of this.blueprints) {
      if (object instanceof Blueprint) consumer(object);
      else if (object instanceof BlueprintBook) object.forEachBlueprint(consumer);
    }

    return this;
  }

  // Modify descriptions and returns this.
  modifyAllDescriptions(consumer) {
    this.description = consumer(this.description);
    for (let blueprint of this.blueprints) {
      if (blueprint instanceof Blueprint || blueprint instanceof BlueprintBook) blueprint.modifyAllDescriptions(consumer);
    }

    return this;
  }

  // Finds the blueprint at an index, with a specific label, or that matches a function
  // Only returns 1. If multiple, errors
  findBlueprint(selector) {
    if (typeof selector === "number") {
      const blueprint = this.blueprints[selector];
      if (!blueprint) throw new Error("No blueprint at " + selector);

      return blueprint;
    } else if (typeof selector === "string") return this.findBlueprint(it => it.label == selector);
    else if (typeof selector === "function") { // Filter based on a function
      const options = this.blueprints.filter(selector);
      if (!options) return undefined;
      else if (options.length > 1) return new BlueprintBook({ blueprint_book: { label: "Query Result" }}).setContents(...options);
      else return options[0];
    } else throw new Error("Invalid selector " + selector);
  }

  // Sets the contents of this blueprint book
  // Can be used to filter (ie 0, 2, 3, 4, "PAX Train")
  // Can also load (ie 0, 2, 3, "blueprints/etc.txt", "PAX Train")
  setContents(...selectors) {
    const newContents = [];
    for (let index in selectors) {
      if (!selectors[index] && selectors[index] !== 0) continue;

      const selector = selectors[index];
      if (isObject(selector)) { // Test for valid blueprint object
        newContents[index] = parseObject(selector);
        continue;
      }

      // Test if it's a valid existing object
      if ([ "number", "string", "function" ].includes(typeof selector)) {
        const found = this.findBlueprint(selector);
        if (found) {
          newContents[index] = found;
          continue;
        }
      }

      // Load as a string
      newContents[index] = parseObject(selector);
    }

    this.blueprints = newContents;
    return this;
  }

  // Explodes BP books
  // This will remove all spacing
  explode() {
    let newContents = [];
    for (let index in this.blueprints) {
      const blueprint = this.blueprints[index];
      if (!blueprint) continue;

      // If no blueprint pull from backlogged
      if (blueprint instanceof BlueprintBook) newContents.push(...blueprint.blueprints);
      else newContents.push(blueprint);
    }
    this.blueprints = newContents;
    return this;
  }
}


// If this is an object (does not include strings pointing to file paths)
function isObject(object) {
  return object instanceof CustomObject || object.blueprint || object.blueprint_book || object.upgrade_planner || object.deconstruction_planner;
}

// Parse the input as an object
function parseObject(object) {
  if (!object) throw new Error("Invalid Object (false-y) " + object);

  try {
    if (typeof object === "string") {
      console.log("Loading " + object + " ... ");
      return parseObject(strings.decode(fs.readFileSync(object, 'utf-8')));
    } else if (object.blueprint) return new Blueprint(object);
    else if (object.blueprint_book) return new BlueprintBook(object);
    else if (object instanceof CustomObject) return object;
    else if (object.upgrade_planner || object.deconstruction_planner) return object;
  } catch (e) {
    throw new Error("Error while parsing object: " + object + "\n\n" + e.message + "\n" + e.stack);
  }
  throw new Error("Invalid Object " + object);
}

export {
  Blueprint,
  BlueprintBook,
  parseObject
}
