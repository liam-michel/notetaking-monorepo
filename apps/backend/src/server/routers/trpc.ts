import { initTRPC } from '@trpc/server';

type AppContext = {
  user: {
    id: string;
  };
};
export function createTRPCRouter() {
  const t = initTRPC.context<AppContext>().create();
  return t;
}
