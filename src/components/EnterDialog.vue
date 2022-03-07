<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import { useQuasar } from 'quasar';

const $q = useQuasar();

const store = useStore(key);
const username = ref<string>('');

function saveName(): void {
  if (username.value.length > 0) {
    store.commit('enterName', username);
    store.dispatch('createConnection').catch((error) => {
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
  }
}
</script>

<template>
  <q-dialog
    v-model="store.getters.getNameModalOpen"
    persistent
  >
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">
          Introduce yourself
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          v-model="username"
          color="teal"
          dense
          :rules="[val => !!val || 'Name is required']"
          @keyup.enter="saveName"
        />
      </q-card-section>
      <q-card-actions
        align="right"
        class="text-primary"
      >
        <q-btn
          color="teal"
          flat
          label="Enter"
          @click="saveName"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
