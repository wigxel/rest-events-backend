import { Request } from "express";

export interface ApolloServerContext {
    req: Request
}