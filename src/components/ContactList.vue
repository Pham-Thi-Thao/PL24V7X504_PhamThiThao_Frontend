<template>
  <div>
    <ContactCard
      v-for="contact in contacts"
      :key="contact._id"
      :contact="contact"
    />
  </div>
</template>

<script>
import ContactCard from "./ContactCard.vue";

export default {
  components: {
    ContactCard,
  },
  props: {
    contacts: {
      type: Array,
      default: () => [],
    },
  },
};
</script>