# zod-to-d2

`zod-to-d2` is a TypeScript library that extends the [Zod](https://github.com/colinhacks/zod) schema validation library, enabling you to annotate your schemas and automatically generate [D2](https://d2lang.com/) diagrams. This helps visualize data models, relationships, and schema structures directly from your Zod definitions.

## Features

- **Schema Annotation**: Add metadata to Zod schemas for diagram generation.
- **Automatic Diagram Generation**: Convert annotated Zod schemas into D2 diagrams.
- **Relationship Mapping**: Visualize foreign keys, primary keys, and other relationships.
- **Extensible**: Supports custom extensions for notes, table names, and more.
- **TypeScript Support**: Fully typed for safe and predictable usage.

## Installation

```bash
pnpm add zod-to-d2
# or
npm install zod-to-d2
# or
yarn add zod-to-d2
```

## Usage

1. **Annotate your Zod schemas**

```ts
import { z } from 'zod';
import { withPrimaryKey, withForeignKey, withNotes, withTableName } from 'zod-to-d2/extensions';

const User = withTableName(
  withPrimaryKey(
    z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
    }),
    'id'
  ),
  'User'
);

const Post = withTableName(
  withForeignKey(
    z.object({
      id: z.string(),
      authorId: z.string(),
      content: z.string(),
    }),
    'authorId',
    'User',
    'id'
  ),
  'Post'
);
```

2. **Generate a D2 diagram**

```ts
import { buildDiagram } from 'zod-to-d2/builder';

const diagram = buildDiagram([User, Post]);
console.log(diagram); // D2 diagram source
```

3. **Render the diagram**

Use the [D2 CLI](https://d2lang.com/docs/cli/) or online tools to render the output.

## Extensions

- `withPrimaryKey(schema, key)`: Annotate a primary key.
- `withForeignKey(schema, key, refTable, refKey)`: Annotate a foreign key.
- `withNotes(schema, notes)`: Add notes to a table or property.
- `withTableName(schema, name)`: Specify a table name for the diagram.

## API Reference

- **Builder**: `buildDiagram`, `buildTable`, `buildColumn`, `buildRelationship`
- **Parser**: Functions to extract properties, relationships, and metadata from Zod schemas.
- **Extensions**: Utilities to annotate schemas with diagram metadata.

## Testing

Run tests with:

```bash
pnpm test
```

## License

MIT

## Contributing

Contributions and suggestions are welcome! Please open issues or pull requests on GitHub.
