import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./schema";
import resolvers from "./resolvers";
import UsersAPI from "./data/UsersAPI";
import TokenAPI from "./data/TokenAPI";
import SpotifyTokenAPI from "./data/SpotifyTokenAPI";

interface ContextValue {
  dataSources: {
    usersAPI: UsersAPI;
    tokenAPI: TokenAPI;
    spotifyTokenAPI: SpotifyTokenAPI;
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
        const spotifyTokenAPI = new SpotifyTokenAPI();
        return {
          dataSources: {
            usersAPI,
            tokenAPI,
            spotifyTokenAPI,
          },
        };
      },
    });
    console.log(`server is running at ${url}`);
  } catch (err) {
    console.log("Failed to start server:", err);
  }
})();
