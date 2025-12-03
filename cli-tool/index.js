#! /usr/bin/env node

const seedDatabase = require("./commands/seed");
const { program } = require("commander");

program
  .command("seed")
  .description("Seed the database with initial data")
  .action(async () => {
    await seedDatabase();
  });

program.parse();
