import { setup, createMachine } from "xstate";

export const machine = setup({
  types: {
    context: {} as { maxRetries: number; retryCount: number },
    events: {} as
      | { type: "CONNECT" }
      | { type: "DISCONNECT" }
      | { type: "RECONNECT" },
  },
  actions: {
    resetRetryCount: function ({ context, event }, params) {
    },
    setChannelContext: function ({ context, event }, params) {
    },
    incrementRetryCount: function ({ context, event }, params) {
    },
    clearChannelContext: function ({ context, event }, params) {
    },
  },
  actors: {
    connectToChannel: createMachine({  }),
  },
  guards: {
    canRetry: function ({ context }) {
      return context.retryCount < context.maxRetries;
    },
  },
}).createMachine({
  context: {
    maxRetries: 3,
    retryCount: 0,
  },
  id: "voiceChannel",
  initial: "disconnected",
  states: {
    disconnected: {
      on: {
        CONNECT: {
          target: "connecting",
          actions: {
            type: "resetRetryCount",
          },
        },
      },
    },
    connecting: {
      invoke: {
        id: "voiceChannel.connecting:invocation[0]",
        input: {},
        onDone: {
          target: "connected",
          actions: {
            type: "setChannelContext",
          },
        },
        onError: {
          target: "waiting",
          actions: {
            type: "incrementRetryCount",
          },
        },
        src: "connectToChannel",
      },
    },
    connected: {
      on: {
        DISCONNECT: {
          target: "disconnected",
          actions: {
            type: "clearChannelContext",
          },
        },
        "RECONNECT": {
          target: "connecting",
          actions: {
            type: "clearChannelContext",
          },
        },
      },
    },
    waiting: {
      after: {
        "5000": [
          {
            target: "connecting",
            guard: {
              type: "canRetry",
            },
          },
          {
            target: "disconnected",
            actions: {
              type: "resetRetryCount",
            },
          },
        ],
      },
    },
  },
});
