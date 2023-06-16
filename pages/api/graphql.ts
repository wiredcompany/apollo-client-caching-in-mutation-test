import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { gql } from "graphql-tag";

const users = [
  { id: 1, name: "와이어드" },
  { id: 2, name: "와이어드" },
];

const resolvers = {
  Query: {
    hello: () => "world",
    users: () => users,
  },
  Mutation: {
    updateUser: (_, { updateUserInput }) => {
      const { id, name } = updateUserInput;
      console.log({ id, name });
      const user = users.find((user) => user.id === id);
      user.name = name;
      return { user };
    },
  },
};

const typeDefs = gql`
  type Query {
    hello: String
    users: [User!]!
  }

  type Mutation {
    updateUser(updateUserInput: UpdateUserInput!): UpdateUserResponse!
  }

  input UpdateUserInput {
    id: Int!
    name: String!
  }

  type UpdateUserResponse {
    user: User!
  }

  type User {
    id: Int!
    name: String!
  }
`;

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

export default startServerAndCreateNextHandler(server);
