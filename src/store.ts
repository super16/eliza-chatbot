import { InjectionKey } from 'vue';
import { createStore, Store } from 'vuex';

export interface State {
  botIsTyping: boolean,
  botName: string,
  botOnline: boolean,
  infoModalOpen: boolean,
  messages: Array<Message>,
  nameModalOpen: boolean,
  username: string,
  ws: WebSocket | null,
}

export interface Message {
  author: string,
  text: Array<string>,
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  strict: true,
  state: {
    botIsTyping: false,
    botName: 'Eliza',
    botOnline: false,
    infoModalOpen: false,
    messages: [],
    nameModalOpen: true,
    username: '',
    ws: null,
  },
  getters: {
    getBotName(state): string {
      return state.botName;
    },
    getBotNameFirstLetter(state): string {
      return state.botName[0];
    },
    getMessages(state): Array<Message> {
      return state.messages;
    },
    getNameModalOpen(state): boolean {
      return state.nameModalOpen;
    },
    getUsername(state): string {
      return state.username;
    },
  },
  mutations: {
    addMessage(
      state: any,
      message: Message,
    ): void {
      state.messages.push({
        author: message.author,
        text: message.text,
      });
    },
    changeBotStatus(state): void {
      if (state.botOnline) {
        state.botOnline = false;
      } else {
        state.botOnline = true;
      }
    },
    enterName(state, name: string): void {
      state.nameModalOpen = false;
      state.username = name;
    },
    initializeWebSocket(state, ws: WebSocket): void {
      state.ws = ws;
    },
    isTyping(state): void {
      state.botIsTyping = !state.botIsTyping;
    },
    toggleModal(state): void {
      state.infoModalOpen = !state.infoModalOpen;
    },
  },
  actions: {
    createConnection({ commit, state }) {
      return new Promise(function (resolve, reject) {
        const clientId: number = Date.now();
        const s = import.meta.env.VITE_SSL;
        const host = import.meta.env.VITE_WEBSOCKET_SERVER;
        const webSocket = new WebSocket(`ws${s}://${host}/ws/${clientId}`);
        commit('initializeWebSocket', webSocket);
        state.ws!.onerror = function (): void {
          reject({
            reason: 'error',
            message: 'Can\'t connect to chatbot server',
          });
        };
        state.ws!.onopen = function () {
          commit('changeBotStatus');
        };
        state.ws!.onclose = function (event: any) {
          if (event.code === 1000) {
            setTimeout(() => {
              commit('changeBotStatus');
              reject({
                reason: 'closed',
                message: 'Connection closed. Refresh the page to start new conversation',
              });
            }, 3500);
          } else {
            if (state.botOnline) {
              commit('changeBotStatus');
            }
            reject({
              reason: 'error',
              message: 'Connection to the server dropped',
            });
          }
        };
        state.ws!.onmessage = function (event: any): void {
          commit('isTyping');
          setTimeout(() => {
            commit('isTyping');
            commit('addMessage', {
              author: state.botName,
              text: [event.data],
            });
          }, Math.floor(
            Math.random() * (3500 - 1500 + 1)) + 1500,
          );
        };
      });
    },
    sendMessage({ commit, state }, message) {
      state.ws!.send(message);
      commit('addMessage', {
        author: state.username,
        text: [message],
      });
    },
  },
});
