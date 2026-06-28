<template>
  <div v-if="contact">
    <h5>Chi tiết Liên hệ</h5>

    <p><strong>Tên:</strong> {{ contact.name }}</p>
    <p><strong>E-mail:</strong> {{ contact.email }}</p>
    <p><strong>Địa chỉ:</strong> {{ contact.address }}</p>
    <p><strong>Điện thoại:</strong> {{ contact.phone }}</p>
    <p>
      <strong>Liên hệ yêu thích:</strong>
      {{ contact.favorite ? "✓" : "" }}
    </p>

    <RouterLink
      :to="{
        name: 'contact.edit',
        params: { id: contact._id },
      }"
      class="btn btn-warning btn-sm"
    >
      Hiệu chỉnh
    </RouterLink>
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