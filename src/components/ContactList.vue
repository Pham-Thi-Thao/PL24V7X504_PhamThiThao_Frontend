<template>
  <div>
    <div class="mb-2">
      <button class="btn btn-outline-secondary btn-sm" @click="sortAZ">
        Sắp xếp A → Z
      </button>

      <button
        class="btn btn-outline-secondary btn-sm ms-2"
        @click="sortZA"
      >
        Sắp xếp Z → A
      </button>
    </div>

    <ul class="list-group">
      <li
        v-for="(contact, index) in sortedContacts"
        :key="contact._id"
        class="list-group-item"
        :class="{ active: index === activeIndex }"
        @click="$emit('update:activeIndex', contacts.findIndex(c => c._id === contact._id))"
        style="cursor:pointer"
      >
        {{ contact.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    contacts: {
      type: Array,
      default: () => [],
    },
    activeIndex: {
      type: Number,
      default: -1,
    },
  },

  emits: ["update:activeIndex"],

  data() {
    return {
      sortedContacts: [],
    };
  },

  watch: {
    contacts: {
      immediate: true,
      handler(newContacts) {
        this.sortedContacts = [...newContacts];
      },
    },
  },

  methods: {
    sortAZ() {
      this.sortedContacts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    },

    sortZA() {
      this.sortedContacts.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    },
  },
};
</script>