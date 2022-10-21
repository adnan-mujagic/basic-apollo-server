import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type Author {
    name: String
    surname: String
    id: Int
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    authors: [Author]
    author(id: Int): Author
  }

  # The "Mutation" type is used when inserting or mutating data on the server/database.
  type Mutation {
    addAuthor(name: String, surname: String): Author
  }
`;

type Book = { title: string; author: string };

const books: Book[] = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

type Author = { name: string; surname: string; id: number };

const authors: Author[] = [
  {
    name: "John",
    surname: "Harcker",
    id: 1,
  },
  {
    name: "Bram",
    surname: "Stoker",
    id: 2,
  },
  {
    name: "Paul",
    surname: "Auster",
    id: 3,
  },
];

const resolvers = {
  Query: {
    books: () => books,
    authors: () => authors,
    author: (parent, { id }) => {
      return authors.find((author) => author.id === id);
    },
  },
  Mutation: {
    addAuthor: (parent, { name, surname }) => {
      const author: Author = { name, surname, id: authors.length + 1 };
      authors.push(author);
      return author;
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
