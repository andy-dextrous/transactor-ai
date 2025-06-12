import { mutation } from "./_generated/server"
import chatAgent from "./agent"

/*************************************************************************/
/*  THREAD CREATION
/*************************************************************************/

export const createThread = mutation({
  args: {},
  handler: async ctx => {
    const { threadId } = await chatAgent.createThread(ctx, {})
    return { threadId }
  },
})
