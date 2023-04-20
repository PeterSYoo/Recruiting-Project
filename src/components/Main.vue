// -------------------------------- TEMPLATE ------------------------------- ***
<template>
  <main
    class="min-w-screen flex min-h-screen flex-col items-center justify-center bg-eggshell px-10"
  >
    <AddNewGuestModal
      v-if="showAddNewGuestModal"
      @close="showAddNewGuestModal = false"
      :showAddNewGuestModal="showAddNewGuestModal"
      :guest="guest"
      :newGuest="newGuest"
    />
    <EditGuestModal
      v-if="showEditGuestModal"
      @close="showEditGuestModal = false"
      :showEditGuestModal="showEditGuestModal"
      :guest="guest"
      :updateGuest="updateGuest"
    />
    <!------------------------------ HEADER ----------------------------------->
    <section
      class="-mb-5 flex w-full max-w-1440 items-center justify-between px-6"
    >
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
        @click="showAddNewGuestModal = true"
      >
        <button
          class="border border-transparent px-3 py-1 text-3xl text-charcoal group-hover:border group-hover:border-charcoal"
        >
          ADD NEW GUEST
        </button>
      </div>
    </section>
    <!------------------------------------------------------------------------->
    <!------------------ GUEST TABLE TOP CORNER DIAMONDS ---------------------->
    <div class="flex w-full max-w-1440 justify-between">
      <div class="relative right-3 top-5">
        <img
          src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1681799007/KPA%20Test/left-diamond_qp6jin.png"
          alt="left diamond"
        />
      </div>
      <div class="relative left-3 top-5">
        <img
          src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1681799025/KPA%20Test/right-diamond_nkrti3.png"
          alt="right diamond"
        />
      </div>
    </div>
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
    <!----------------- GUEST TABLE BOTTOM CORNER DIAMONDS -------------------->
    <div class="flex w-full max-w-1440 justify-between">
      <div class="relative bottom-4 right-3">
        <img
          src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1681799007/KPA%20Test/left-diamond_qp6jin.png"
          alt="left diamond"
        />
      </div>
      <div class="relative bottom-4 left-3">
        <img
          src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1681799025/KPA%20Test/right-diamond_nkrti3.png"
          alt="right diamond"
        />
      </div>
    </div>
    <!------------------------------------------------------------------------->
  </main>
</template>
// ------------------------------------------------------------------------- ***
// --------------------------------- SCRIPT -------------------------------- ***
<script>
const GuestRepository = require('../guest-repository');
import Guest from './Guest.vue';
import EditGuestModal from './EditGuestModal.vue';
import AddNewGuestModal from './AddNewGuestModal.vue';

const guestRepository = new GuestRepository();

export default {
  components: {
    Guest,
    EditGuestModal,
    AddNewGuestModal,
  },
  data: () => {
    return {
      guests: [],
      showEditGuestModal: false,
      showAddNewGuestModal: false,
      guest: {},
      loading: true,
      guestUpdated: false,
    };
  },
  mounted() {
    if (this.loading) {
      guestRepository
        .load()
        .then((guests) => {
          console.log({ guests });
          this.guests = guests;
          guestRepository
            .save(guests)
            .then(() => {
              console.log('Guest updated successfully');
            })
            .catch((error) => {
              console.error('Error saving guests', error);
            });
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  methods: {
    openEditModal(guest) {
      this.guest = guest;
      this.showEditGuestModal = true;
    },
    openAddNewGuestModal(guest) {
      this.guest = guest;
      this.showAddNewGuestModal = true;
    },
    newGuest(newGuest) {
      console.log({ newGuest });
    },
    updateGuest(currentGuest, updatedGuest) {
      // Load the list of guests from the GuestRepository
      guestRepository
        .load()
        .then((guests) => {
          // Find the index of the current guest in the list
          const index = guests.findIndex(
            (guest) => guest.email === currentGuest.email
          );

          console.log({ index });
          if (index === -1) {
            console.error('Guest not found');
            return;
          }
          // Update the current guest with the updated guest
          guests.splice(index, 1, updatedGuest);

          // Save the updated list of guests back to the GuestRepository
          guestRepository
            .save(guests)
            .then(() => {
              console.log('Guest updated successfully');
              // Re-render the component by loading and saving again
              guestRepository.load().then((guests) => {
                console.log({ guests });
                this.guests = guests;
                guestRepository
                  .save(guests)
                  .then(() => {
                    console.log('Guest updated successfully');
                  })
                  .catch((error) => {
                    console.error('Error saving guests', error);
                  });
              });
            })
            .catch((error) => {
              console.error('Error saving guests', error);
            });
        })
        .catch((error) => {
          console.error('Error loading guests', error);
        });
    },
  },
};
</script>
// ------------------------------------------------------------------------- ***
