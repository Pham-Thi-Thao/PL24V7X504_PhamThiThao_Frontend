<template>
  <div v-if="contact" class="page">
    <h4>Thêm Liên hệ</h4>

    <ContactForm
      :contact="contact"
      @submit:contact="createContact"
    />

    <p>{{ message }}</p>
  </div>
</template>

<script>
import ContactForm from "../components/ContactForm.vue";
import ContactService from "../services/contact.service";

export default {
  components: {
    ContactForm,
  },

  data() {
    return {
      contact: {
        name: "",
        email: "",
        address: "",
        phone: "",
        favorite: false,
      },
      message: "",
    };
  },

  methods: {
    async createContact(data) {
    console.log(data);

    try {
        const result = await ContactService.create(data);
        console.log(result);
        alert("Liên hệ được thêm thành công.");
        this.$router.push({ name: "contactbook" });
    } catch (error) {
        console.log(error);
        alert(JSON.stringify(error.response?.data || error.message));
    }
}
  },
};
</script>

<style scoped>
@import "../assets/form.css";
</style>