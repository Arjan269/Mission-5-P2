#! /usr/bin/env node

const seedDatabase = require("./commands/seed");
const unseedDatabase = require("./commands/unseed");
const { program } = require("commander");

program
  .command("seed")
  .description("Seed the database with initial data")
  .action(async () => {
    await seedDatabase();
  });

program
  .command("unseed")
  .description("Remove seed data from the database")
  .action(async () => {
    await unseedDatabase();
  });

program.parse();
