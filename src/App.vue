<script setup lang="ts">
import ChatArea from '@/components/ChatArea.vue';
import EnterDialog from '@/components/EnterDialog.vue';
import InfoDialog from '@/components/InfoDialog.vue';
</script>

<template>
  <EnterDialog />
  <InfoDialog />
  <q-layout class="bg-blue-grey-2">
    <q-page-container class="row justify-center">
      <q-page class="column col-12 col-sm-10 col-md-8 col-lg-4">
        <ChatArea />
      </q-page>
    </q-page-container>
  </q-layout>
</template>
