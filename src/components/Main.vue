// -------------------------------- TEMPLATE ------------------------------- ***
<template>
  <main
    class="min-w-screen flex min-h-screen flex-col items-center justify-center bg-eggshell px-10"
  >
    <!------------------------------ MODALS ----------------------------------->
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
    <!------------------------------------------------------------------------->
    <!------------------------------ HEADER ----------------------------------->
    <Header
      :guests="guests"
      :totalTickets="totalTickets"
      :isGuestOver="isGuestOver"
      @update-add-new-guest-modal="showAddNewGuestModal = $event"
    />
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
          v-for="(guest, index) in guests"
          :key="guest.email"
          :email="guest.email"
          :guest="guest"
          :index="index"
          :deleteGuest="deleteGuest"
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
import Header from './Header.vue';

const guestRepository = new GuestRepository();

export default {
  components: {
    Guest,
    EditGuestModal,
    AddNewGuestModal,
    Header,
  },
  data: () => {
    return {
      guests: [],
      showEditGuestModal: false,
      showAddNewGuestModal: false,
      guest: {},
      guestUpdated: false,
      totalTickets: 0,
      isGuestOver: false,
    };
  },
  async mounted() {
    try {
      const guests = await guestRepository.load();
      this.guests = guests;

      this.totalTickets = this.guests.reduce(
        (acc, guest) => acc + parseInt(guest.tickets),
        0
      );

      await guestRepository.save(guests);
    } catch (error) {
      console.error('Error loading guests', error);
    }
  },
  watch: {
    totalTickets(newValue) {
      if (newValue >= 20) {
        this.isGuestOver = true;
      } else if (newValue < 20) {
        this.isGuestOver = false;
      }
    },
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
    async newGuest(newGuest) {
      try {
        const guests = await guestRepository.load();

        guests.push(newGuest);

        await guestRepository.save(guests);

        // Re-render the component by updating the guests state
        this.guests = guests;

        this.totalTickets = this.guests.reduce(
          (acc, guest) => acc + parseInt(guest.tickets),
          0
        );
      } catch (error) {
        console.log(error);
      }
    },
    async updateGuest(currentGuest, updatedGuest) {
      try {
        const guests = await guestRepository.load();

        // Find index position of current guest
        const index = guests.findIndex(
          (guest) => guest.email === currentGuest.email
        );

        if (index === -1) {
          console.error('Guest not found');
          return;
        }

        // Replace current guest with updated guest in guests array
        guests.splice(index, 1, updatedGuest);

        // Save the updated array to the localStorage
        await guestRepository.save(guests);

        // Re-render the component by updating the guests state
        this.guests = guests;

        this.totalTickets = this.guests.reduce(
          (acc, guest) => acc + parseInt(guest.tickets),
          0
        );
      } catch (error) {
        console.error(error);
      }
    },
    async deleteGuest(index) {
      try {
        const guests = await guestRepository.load();

        guests.splice(index, 1);

        await guestRepository.save(guests);

        // Re-render the component by updating the guests state
        this.guests = guests;

        this.totalTickets = this.guests.reduce(
          (acc, guest) => acc + parseInt(guest.tickets),
          0
        );
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
// ------------------------------------------------------------------------- ***
