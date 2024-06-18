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
        getSpotifyToken: SpotifyTokenResponse 
    }

    type TokenResponse{
        access_token: String
    }

    type SpotifyTokenResponse{
        access_token: String
        token_type: String
        expires_in: Int
    }
`;

export default typeDefs;
