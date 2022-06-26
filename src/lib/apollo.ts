import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: 'https://api-sa-east-1.graphcms.com/v2/cl4o9azfi1f2c01z244q986t2/master',
    cache: new InMemoryCache()
})