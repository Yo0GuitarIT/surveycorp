const typeDefs = `#graphql
    type User{
        id: ID!
        name: String!
        email: String!
    }
    type Query{
        users: [User!]!
    }    

    type Mutation {
        getToken(code: String!) : TokenResponse
    }

    type TokenResponse{
        access_token: String
    }
`;

export default typeDefs;
