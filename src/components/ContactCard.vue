<template>
  <div v-if="contact">
    <RouterLink
      :to="{
        name: 'contact.edit',
        params: { id: contact._id },
      }"
    >
      <strong>Họ tên: {{ contact.name }}</strong>
    </RouterLink>

    <p><strong>Email:</strong> {{ contact.email }}</p>
    <p><strong>Địa chỉ:</strong> {{ contact.address }}</p>
  </div>
</template>

<script>
export default {
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
};
</script>