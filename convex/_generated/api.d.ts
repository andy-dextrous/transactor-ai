/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as context from "../context.js";
import type * as documents from "../documents.js";
import type * as financials from "../financials.js";
import type * as messages from "../messages.js";
import type * as properties from "../properties.js";
import type * as providers from "../providers.js";
import type * as seed from "../seed.js";
import type * as seedData from "../seedData.js";
import type * as tools from "../tools.js";
import type * as transactions from "../transactions.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  context: typeof context;
  documents: typeof documents;
  financials: typeof financials;
  messages: typeof messages;
  properties: typeof properties;
  providers: typeof providers;
  seed: typeof seed;
  seedData: typeof seedData;
  tools: typeof tools;
  transactions: typeof transactions;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
