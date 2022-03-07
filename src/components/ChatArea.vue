<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';

export interface BotStatus {
  text: string,
  color: string,
}

export interface ScrollSizes {
  verticalSize: number,
}

export interface ScrollParams {
  getScroll: () => ScrollSizes,
  setScrollPosition: (axis: string, offset: number, duration: number) => void;
}

const store = useStore(key);

const botStatus = computed<BotStatus>(
  () => store.state.botOnline ? { text: 'Online', color: 'green' } :
    { text: 'Offline', color: 'red' },
);
const inputMessage = ref<string>('');
const scrollAreaRef = ref<ScrollParams>(
  {
    getScroll: () => { return { verticalSize: 0 }; },
    setScrollPosition: () => {},
  },
);

function send(message: string): void {
  if (message.length > 0 && !store.state.botIsTyping) {
    store.dispatch('sendMessage', message);
    inputMessage.value = '';
  }
}

function onScroll(): void {
  const scroll: ScrollSizes = scrollAreaRef.value.getScroll();
  scrollAreaRef.value.setScrollPosition(
    'vertical',
    scroll.verticalSize,
    900,
  );
}

watch(store.getters.getMessages, () => { onScroll(); });
</script>

<template>
  <q-card
    bordered
    class="column col-grow shadow-1"
  >
    <q-item>
      <q-item-section avatar>
        <q-avatar
          color="teal-2"
          rounded
          text-color="white"
        >
          <q-badge
            :color="botStatus.color"
            floating
            rounded
          />
          {{ store.getters.getBotNameFirstLetter }}
        </q-avatar>
      </q-item-section>
      <q-item-section>
        <q-item-label>
          {{ store.getters.getBotName }}
        </q-item-label>
        <q-item-label caption>
          {{ botStatus.text }}
        </q-item-label>
      </q-item-section>
      <q-card-actions>
        <q-btn
          color="grey-7"
          flat
          icon="more_vert"
          round
          size="md"
          @click="store.commit('toggleModal')"
        >
          <q-tooltip
            class="bg-teal"
          >
            View Info
          </q-tooltip>
        </q-btn>
      </q-card-actions>
    </q-item>
    <q-separator />
    <q-card-section class="column col-grow">
      <div class="col-grow q-ma-none">
        <q-scroll-area
          ref="scrollAreaRef"
          class="full-height"
        >
          <div class="q-pa-sm row reverse justify-center">
            <div style="width: 100%; max-width: 100%">
              <q-chat-message
                v-for="(message, index) in store.getters.getMessages"
                :key="index"
                class="q-py-xs"
                :name="message.author"
                :sent="message.author === store.getters.getUsername"
                size="4"
                :text="message.text"
              />
              <q-chat-message
                v-if="store.state.botIsTyping"
                class="q-py-xs"
                :name="store.state.botName"
                size="4"
              >
                <q-spinner-dots size="2em" />
              </q-chat-message>
            </div>
          </div>
        </q-scroll-area>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-input
        v-model="inputMessage"
        color="teal"
        outlined
        rounded
        @keyup.enter="send(inputMessage)"
      >
        <template #append>
          <q-btn
            color="teal"
            dense
            :disabled="store.state.botIsTyping"
            flat
            icon="send"
            round
            @click="send(inputMessage)"
          >
            <q-tooltip
              class="bg-teal"
            >
              Send
            </q-tooltip>
          </q-btn>
        </template>
      </q-input>
    </q-card-section>
  </q-card>
</template>
