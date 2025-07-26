# zod-to-d2

`zod-to-d2` is a TypeScript library that extends the [Zod](https://github.com/colinhacks/zod) schema validation library, enabling you to annotate your schemas and automatically generate [D2](https://d2lang.com/) diagrams. This helps visualize data models, relationships, and schema structures directly from your Zod definitions.

## Features

- **Schema Annotation**: Add metadata (primary keys, foreign keys, notes, table names) to Zod schemas.
- **Automatic Diagram Generation**: Convert annotated Zod schemas into D2 diagrams.
- **Relationship Mapping**: Visualize foreign keys, primary keys, and other relationships.
- **Extensible**: Supports custom extensions for notes, table names, and more.
- **CLI Tool**: Generate diagrams from files or directories via command line.
- **TypeScript Support**: Fully typed for safe and predictable usage.

## Installation

```bash
pnpm add @eng-tools/zod-to-d2
# or
npm install @eng-tools/zod-to-d2
# or
yarn add @eng-tools/zod-to-d2
```

## Usage

1. **Annotate your Zod schemas**

```ts
import { z } from "zod";
import "@eng-tools/zod-to-d2";

const userSchema = z.object({
  id: z.string().primaryKey(), //<-- marks the 'id' property as a PK
  name: z.string().note("The name of the user"), //<-- includes comments on this property on the output diagram
  email: z.string(),
});

const postSchema = z.object({
  id: z.string().primaryKey(),
  authorId: z.string().foreignKey(userSchema, "id"), //<- creates a FK relationship to the 'id' property of the 'userSchema'
  content: z.string(),
});
```

2. **Generate a D2 diagram (programmatic API)**

```ts
import { buildDiagram } from "@eng-tools/zod-to-d2";

const diagram = generateDiagramText([userSchema, postSchema]);
console.log(diagram); // D2 diagram source
```

3. **Generate a D2 diagram (CLI)**

```sh
> pnpm zod2d2 --file-paths src/schemas/user.ts src/schemas/post.ts --output-path diagram.d2 --title "My Diagram"
# or
> pnpm zod2d2 --directory src/schemas --output-path diagram.d2
```

## License

MIT

## Contributing

Contributions and suggestions are welcome! Please open issues or pull requests on GitHub.
