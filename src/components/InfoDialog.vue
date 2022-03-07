<script setup lang="ts">
import { useStore } from 'vuex';
import { key } from '@/store';

const store = useStore(key);
</script>

<template>
  <q-dialog
    v-model="store.state.infoModalOpen"
    persistent
    maximized
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card class="row justify-center bg-blue-grey-1">
      <q-card-section
        class="column col-12 col-sm-10 col-md-8 col-lg-4 q-pa-lg"
        horizontal
      >
        <div class="row items-center no-wrap">
          <h1 class="col-grow text-h4">
            Eliza Chatbot
          </h1>
          <q-btn
            dense
            flat
            icon="close"
            @click="store.commit('toggleModal')"
          >
            <q-tooltip
              class="bg-teal"
            >
              Close
            </q-tooltip>
          </q-btn>
        </div>
        <p class="text-body1 text-grey-8">
          This app is an implementation of
          <q-btn
            color="teal"
            flat
            href="https://en.wikipedia.org/wiki/ELIZA"
            label="Eliza"
            padding="xs xs"
          />
          Websockets chatbot made with Vue3, Vite & Quasar Framework.
        </p>
        <p class="text-body1 text-grey-8">
          Send <span class="text-pink-7 text-subtitle2">quit</span>
          to finish conversation and disconnect.
        </p>
        <h2 class="text-h6">
          Check out more
        </h2>
        <q-list>
          <q-item
            v-ripple
            clickable
            href="https://github.com/super16/eliza-chatbot"
          >
            <q-item-section avatar>
              <q-icon name="code" />
            </q-item-section>
            <q-item-section>
              Source Code
            </q-item-section>
          </q-item>
          <q-item
            v-ripple 
            clickable
            href="https://github.com/super16/eliza-chatbot-fastapi"
          >
            <q-item-section avatar>
              <q-icon name="source" />
            </q-item-section>
            <q-item-section>
              Chatbot Websockets Backend
            </q-item-section>
          </q-item>
        </q-list>
        <p class="text-caption text-right text-grey-8">
          App made by
          <q-btn
            color="teal"
            flat
            href="https://github.com/super16"
            label="super16"
            no-caps
            padding="xs xs"
            size="sm"
          />
        </p>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
