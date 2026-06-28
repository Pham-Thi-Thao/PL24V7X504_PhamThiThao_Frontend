<template>
  <div class="container mt-4">
    <div class="card shadow">
      <div class="card-body">

        <div class="mb-3">
          <InputSearch v-model="searchText" />
        </div>
        <div class="alert alert-info">
  <strong>Tổng liên hệ:</strong> {{ contacts.length }}
  <br>
  <strong>Liên hệ yêu thích:</strong> {{ favoriteCount }}
</div>
<div class="form-check mt-2">
  <input
    class="form-check-input"
    type="checkbox"
    id="favoriteOnly"
    v-model="showFavoriteOnly"
  />

  <label class="form-check-label" for="favoriteOnly">
    Chỉ hiển thị liên hệ yêu thích
  </label>
</div>

        <div class="row">

          <!-- Danh sách -->
          <div class="col-md-6">
            <div class="card">
              <div class="card-header bg-primary text-white">
                <h5 class="mb-0">
                  Danh bạ
                  <i class="fas fa-address-book"></i>
                </h5>
              </div>

              <div class="card-body">

                <ContactList
  v-if="filteredContactsCount > 0"
  :contacts="filteredContacts.slice((currentPage - 1) * perPage, currentPage * perPage)"
  v-model:activeIndex="activeIndex"
/>

<Paginate
    v-if="filteredContactsCount > 0"
    v-model="currentPage"
  :page-count="Math.ceil(filteredContacts.length / perPage)"
  :click-handler="page => currentPage = page"
  :prev-text="'<<'"
  :next-text="'>>'"
  :container-class="'pagination justify-content-center mt-3'"
  :page-class="'page-item'"
  :page-link-class="'page-link'"
  :prev-class="'page-item'"
  :prev-link-class="'page-link'"
  :next-class="'page-item'"
  :next-link-class="'page-link'"
/>

                <p v-if="filteredContactsCount === 0">
  Không có liên hệ nào.
</p>

              </div>

              <div class="card-footer text-center">

                <button
                  class="btn btn-primary btn-sm me-2"
                  @click="refreshList"
                >
                  Làm mới
                </button>

                <button
                  class="btn btn-success btn-sm me-2"
                  @click="goToAddContact"
                >
                  Thêm mới
                </button>
                  <button
                  class="btn btn-warning btn-sm me-2"
                  @click="exportExcel"
                >
                  Xuất Excel
                </button>
                <button
                  class="btn btn-danger btn-sm"
                  @click="removeAllContacts"
                >
                  Xóa tất cả
                </button>

              </div>

            </div>
          </div>

          <!-- Chi tiết -->
<div class="col-md-6">

  <div class="card" v-if="activeContact">
    <div class="card-header bg-info text-white">
      <h5 class="mb-0">Chi tiết liên hệ</h5>
    </div>

    <div class="card-body">
      <ContactCard :contact="activeContact" />
    </div>
  </div>

  <div class="card" v-else>
    <div class="card-body text-center text-muted">
      Chọn một liên hệ để xem chi tiết.
    </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  </div>
</template>
<script>
import ContactCard from "../components/ContactCard.vue";
import InputSearch from "../components/InputSearch.vue";
import ContactList from "../components/ContactList.vue";
import ContactService from "../services/contact.service.js";
import Paginate from "vuejs-paginate-next";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default {
  components: {
  ContactCard,
  InputSearch,
  ContactList,
  Paginate,
},

  data() {
    return {
  contacts: [],
  activeIndex: -1,
  searchText: "",
  showFavoriteOnly: false,
  currentPage: 1,
  perPage: 5,
    };
  },

  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },

  computed: {
    contactStrings() {
      return this.contacts.map((contact) => {
        const { name, email, address, phone } = contact;
        return [name, email, address, phone].join("");
      });
    },

    filteredContacts() {
  let contacts = this.contacts;

if (this.showFavoriteOnly) {
    contacts = contacts.filter(contact => contact.favorite);
}

if (this.searchText === "") {
    return contacts;
}

  return contacts.filter((contact) => {
    const text = (
      (contact.name || "") +
      " " +
      (contact.email || "") +
      " " +
      (contact.address || "") +
      " " +
      (contact.phone || "")
    ).toLowerCase();

    return text.includes(this.searchText.toLowerCase());
  });
},

    activeContact() {
      if (this.activeIndex < 0) return null;
      return this.filteredContacts[this.activeIndex];
    },

    filteredContactsCount() {
    return this.filteredContacts.length;
},

favoriteCount() {
    return this.contacts.filter(contact => contact.favorite).length;
},
  },

  methods: {
    async retrieveContacts() {
  try {
    const data = await ContactService.getAll();
    console.log("DATA =", data);
    this.contacts = data;
    console.log("CONTACTS =", this.contacts);
  } catch (error) {
    console.log(error);
  }
},

    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },
    refreshList() {
  this.retrieveContacts();
  this.activeIndex = -1;
},

exportExcel() {
  const worksheet = XLSX.utils.json_to_sheet(this.contacts);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "DanhBa");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const data = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(data, "DanhBa.xlsx");
},


    async removeAllContacts() {
      if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
        try {
          await ContactService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },

    goToAddContact() {
      this.$router.push({ name: "contact.add" });
    },
  },

  mounted() {
    this.refreshList();
  },
};
</script>
<style scoped>
.page {
    text-align: left;
}

.card {
    border-radius: 10px;
}

.card-header {
    font-weight: bold;
}

button {
    min-width: 100px;
}
</style>