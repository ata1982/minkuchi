#!/usr/bin/env node

/* eslint-disable */
const fs = require('fs');
const path = require('path');

// Ensure prisma directory exists
const prismaDir = path.join(process.cwd(), 'prisma');
const schemaFile = path.join(prismaDir, 'schema.prisma');

console.log('Checking Prisma setup...');
console.log('Current working directory:', process.cwd());
console.log('Prisma directory:', prismaDir);
console.log('Schema file:', schemaFile);

if (!fs.existsSync(prismaDir)) {
  console.error('ERROR: prisma directory not found!');
  process.exit(1);
}

if (!fs.existsSync(schemaFile)) {
  console.error('ERROR: prisma/schema.prisma not found!');
  process.exit(1);
}

console.log('✓ Prisma setup verified');
console.log('✓ Schema file exists');

// List all files in prisma directory
console.log('Files in prisma directory:');
const files = fs.readdirSync(prismaDir);
files.forEach(file => {
  console.log(`  - ${file}`);
});