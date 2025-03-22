# Tax Calculator

A TypeScript utility that calculates effective tax rates for Federal, California, and Puerto Rico tax systems.

This calculator was built using Vibe Coding on Cursor.

## Features

- Calculates tax amounts based on progressive tax brackets
- Computes effective tax rates for each tax system
- Provides comparison between different tax jurisdictions
- Supports any income amount

## Usage

### Prerequisites

- Node.js or Bun runtime
- TypeScript compiler (if using Node.js)

### Running the application

With Bun:
```bash
bun app.ts
```

With Node.js:
```bash
# First compile TypeScript
tsc app.ts tax-calculator.ts
# Then run the compiled JavaScript
node app.js
```

### Custom Income Analysis

You can analyze a specific income amount by passing it as a command-line argument:

```bash
bun app.ts 85000
```

or with Node.js:

```bash
node app.js 85000
```

## Tax Brackets

The calculator uses the following tax brackets:

- Federal tax brackets (2023)
- California state tax brackets (2023)
- Puerto Rico tax brackets

For detailed tax bracket information, see [tax-comparison.md](./tax-comparison.md).
