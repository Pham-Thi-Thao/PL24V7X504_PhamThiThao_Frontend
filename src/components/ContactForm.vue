<template>
  <Form @submit="submitContact" :validation-schema="contactFormSchema">

    <div class="mb-3">
      <label for="name" class="form-label">Tên</label>
      <Field
        name="name"
        type="text"
        class="form-control"
        v-model="contactLocal.name"
      />
      <ErrorMessage name="name" class="error-feedback" />
    </div>

    <div class="mb-3">
      <label for="email" class="form-label">E-mail</label>
      <Field
        name="email"
        type="email"
        class="form-control"
        v-model="contactLocal.email"
      />
      <ErrorMessage name="email" class="error-feedback" />
    </div>

    <div class="mb-3">
      <label for="address" class="form-label">Địa chỉ</label>
      <Field
        name="address"
        type="text"
        class="form-control"
        v-model="contactLocal.address"
      />
      <ErrorMessage name="address" class="error-feedback" />
    </div>

    <div class="mb-3">
      <label for="phone" class="form-label">Điện thoại</label>
      <Field
        name="phone"
        type="tel"
        class="form-control"
        v-model="contactLocal.phone"
      />
      <ErrorMessage name="phone" class="error-feedback" />
    </div>

    <div class="form-check mb-3">
      <Field
        name="favorite"
        type="checkbox"
        class="form-check-input"
        v-model="contactLocal.favorite"
      />
      <label class="form-check-label" for="favorite">
        Liên hệ yêu thích
      </label>
    </div>

    <div class="text-center mt-3">
      <button class="btn btn-primary">
        Lưu
      </button>

      <button
        v-if="contactLocal._id"
        type="button"
        class="btn btn-danger ms-2"
        @click="deleteContact"
      >
        Xóa
      </button>

      <button
        type="button"
        class="btn btn-secondary ms-2"
        @click="Cancel"
      >
        Thoát
      </button>
    </div>

  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },

  emits: ["submit:contact", "delete:contact"],

  props: {
    contact: {
      type: Object,
      required: true,
    },
  },

  data() {
    const contactFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),

      email: yup
        .string()
        .email("E-mail không đúng.")
        .max(50, "E-mail tối đa 50 ký tự."),

      address: yup
        .string()
        .max(100, "Địa chỉ tối đa 100 ký tự."),

      phone: yup
        .string()
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/g,
          "Số điện thoại không hợp lệ."
        ),
    });

    return {
      contactLocal: { ...this.contact },
      contactFormSchema,
    };
  },

  methods: {
    submitContact() {
      this.$emit("submit:contact", this.contactLocal);
    },

    deleteContact() {
      this.$emit("delete:contact", this.contactLocal._id);
    },

    Cancel() {
      const reply = window.confirm(
        "You have unsaved changes! Do you want to leave?"
      );

      if (reply) {
        this.$router.push({ name: "contactbook" });
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/form.css";
</style>
form {
    max-width: 500px;
    margin: 0 auto;
}

.form-control {
    width: 100%;
    max-width: 500px;
    margin-bottom: 12px;
}

label {
    display: block;
    text-align: center;
}

.form-check {
    text-align: center;
}

button {
    margin-right: 8px;
}