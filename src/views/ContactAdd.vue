<template>
  <div class="page">
    <h4 class="text-center">Thêm Liên hệ</h4>

    <ContactForm
      :contact="contact"
      @submit:contact="createContact"
    />

    <p class="text-center mt-3">{{ message }}</p>
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
      try {
        await ContactService.create(data);
        alert("Liên hệ được thêm thành công.");
        this.$router.push({ name: "contactbook" });
      } catch (error) {
        console.log(error);
        alert(JSON.stringify(error.response?.data || error.message));
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/form.css";
</style>