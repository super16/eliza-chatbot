<script setup lang="ts">
import ChatArea from '@/components/ChatArea.vue';
import InfoDialog from '@/components/InfoDialog.vue';

import { key } from '@/store';

import { useQuasar } from 'quasar';
import { useStore } from 'vuex';

const $q = useQuasar();
const store = useStore(key);

(function start() {
  $q.dialog({
    color: 'teal',
    message: 'Introduce yourself',
    ok: {
      color: 'teal',
      label: 'Enter',
    },
    persistent: true,
    prompt: {
      isValid: (val) => !!val.trim(),
      model: '',
      type: 'text',
    },
  }).onOk((username) => {
    store.commit('enterName', username);
    store.dispatch('createConnection')
      .catch((error) => {
        if (error.reason === 'error') {
          $q.notify({
            actions: [
              {
                color: 'white',
                handler: () => { window.location.reload(); },
                label: 'Try Again',
              },
            ],
            type: 'negative',
            message: error.message,
            timeout: 0,
          });
        } else {
          $q.notify({
            actions: [
              {
                color: 'black',
                handler: () => { window.location.reload(); },
                label: 'Reload',
              },
            ],
            type: 'warning',
            message: error.message,
            timeout: 0,
          });
        }
      });
  });
})();
</script>

<template>
  <InfoDialog />
  <q-layout class="bg-blue-grey-2">
    <q-page-container class="row justify-center">
      <q-page class="column col-12 col-sm-10 col-md-8 col-lg-4">
        <ChatArea />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
