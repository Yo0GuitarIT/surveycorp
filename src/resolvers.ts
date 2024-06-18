import UsersAPI from "./data/UsersAPI";
import TokenAPI from "./data/TokenAPI";

const resolvers = {
  Query: {
    users: async (
      _: any,
      __: any,
      { dataSources }: { dataSources: { usersAPI: UsersAPI } }
    ) => {
      return dataSources.usersAPI.getUsers();
    },
  },

  Mutation: {
    getToken: async (
      _: any,
      { code }: { code: string },
      { dataSources }: { dataSources: { tokenAPI: TokenAPI } }
    ) => {
      return dataSources.tokenAPI.getToken(code);
    },
  },
};

export default resolvers;
