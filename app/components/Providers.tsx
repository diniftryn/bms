"use client";
import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_URL + "/api/graphql",
    cache: new InMemoryCache()
  });
  return (
    <ChakraProvider>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ChakraProvider>
  );
};
