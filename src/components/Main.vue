// -------------------------------- TEMPLATE ------------------------------- ***
<template>
  <main
    class="min-w-screen flex min-h-screen flex-col items-center justify-center bg-eggshell px-10"
  >
    <EditModal
      v-if="showEditModal"
      @close="showEditModal = false"
      :showEditModal="showEditModal"
      :guest="guest"
      :updateGuest="updateGuest"
    />
    <!------------------------------ HEADER ----------------------------------->
    <section class="flex w-full max-w-1440 items-center justify-between px-6">
      <div class="flex items-center gap-5">
        <div>
          <img
            src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1681800072/KPA%20Test/logo-nyan_b7u9zp.png"
            alt="logo"
          />
        </div>
        <h1 class="text-3xl text-charcoal">NYAN CAT SHOW</h1>
      </div>
      <div>
        <p class="text-3xl text-charcoal">TOTAL GUESTS: {{ guests.length }}</p>
      </div>
      <div
        class="group -mr-3 border-2 border-transparent p-0.5 hover:border-2 hover:border-charcoal"
      >
        <button
          class="border border-transparent px-3 py-1 text-3xl text-charcoal group-hover:border group-hover:border-charcoal"
        >
          ADD NEW GUEST
        </button>
      </div>
    </section>
    <!------------------------------------------------------------------------->
    <!---------------------------- GUEST TABLE -------------------------------->
    <section class="mt-1 flex w-full max-w-1440 border-2 border-charcoal p-0.5">
      <div
        class="grid h-full w-full grid-cols-2 place-content-center gap-5 border border-charcoal p-28 text-charcoal"
      >
        <!-------------------------- GUESTS ----------------------------------->
        <Guest
          v-for="guest in guests"
          :key="guest.email"
          :email="guest.email"
          :guest="guest"
          @open-edit-modal="openEditModal"
        />
        <!--------------------------------------------------------------------->
      </div>
    </section>
    <!------------------------------------------------------------------------->
  </main>
</template>
// ------------------------------------------------------------------------- ***
// --------------------------------- SCRIPT -------------------------------- ***
<script>
const GuestRepository = require('../guest-repository');
import Guest from './Guest.vue';
import EditModal from './EditModal.vue';

export default {
  data: () => {
    return {
      guests: [],
      showEditModal: false,
      guest: {},
    };
  },
  components: {
    Guest,
    EditModal,
  },
  mounted() {
    const guestRepository = new GuestRepository();
    guestRepository.load().then((guests) => {
      this.guests = guests;
    });
  },
  methods: {
    openEditModal(guest) {
      this.guest = guest;
      this.showEditModal = true;
    },
    updateGuest() {
      console.log('updateGuest called');
    },
  },
};
</script>
// ------------------------------------------------------------------------- ***
