import { Client } from "@notionhq/client";

declare type ElementType<T> = T extends (infer U)[] ? U : never;

declare type MatchType<T, U, V = never> = T extends U ? T : V;

export type BlockObject = MatchType<
  ElementType<
    Awaited<ReturnType<Client["blocks"]["children"]["list"]>>["results"]
  >,
  {
    type: unknown;
  }
>;
