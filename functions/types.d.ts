// Cloudflare Pages Functions Ambient Type Definitions

declare global {
  interface EventContext<Env, P extends string, Data> {
    request: Request;
    functionPath: string;
    waitUntil: (promise: Promise<any>) => void;
    next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
    env: Env;
    params: Record<P, string | string[]>;
    data: Data;
  }

  type PagesFunction<
    Env = unknown,
    P extends string = string,
    Data extends Record<string, unknown> = Record<string, unknown>
  > = (context: EventContext<Env, P, Data>) => Response | Promise<Response>;

  class HTMLRewriter {
    on(selector: string, handlers: any): this;
    transform(response: Response): Response;
  }
}

export {};
