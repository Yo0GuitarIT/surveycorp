import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import UsersAPI from "./data/UsersAPI";
import TokenAPI from "./data/TokenAPI";

interface ContextValue {
  dataSources: {
    usersAPI: UsersAPI;
    tokenAPI: TokenAPI;
  };
}

const server = new ApolloServer<ContextValue>({
  typeDefs,
  resolvers,
});

(async () => {
  try {
    const { url } = await startStandaloneServer(server, {
      context: async () => {
        const usersAPI = new UsersAPI();
        const tokenAPI = new TokenAPI();
        return {
          dataSources: {
            usersAPI,
            tokenAPI
          },
        };
      },
    });
    console.log(`server is running at ${url}`);
  } catch (err) {
    console.log("Failed to start server:", err);
  }
})();
