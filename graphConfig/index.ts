import { ApolloClient, InMemoryCache } from '@apollo/client'


const APIURL = 'http://35.229.70.210:8000/subgraphs';


export const apolloClient = new ApolloClient({
    uri: APIURL,
    cache: new InMemoryCache(),
})

