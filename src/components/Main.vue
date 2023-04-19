// -------------------------------- Template ------------------------------- ***
<template>
  <main
    class="min-w-screen flex min-h-screen flex-col items-center justify-center bg-eggshell px-10"
  >
    <!------------------------------ Header ----------------------------------->
    <section class="flex w-full max-w-1440 items-center justify-between px-6">
      <div class="flex items-center gap-5">
        <div>
          <img
            src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1681800072/KPA%20Test/logo-nyan_b7u9zp.png"
            alt="logo"
          />
        </div>
        <h1 class="text-2xl text-charcoal">NYAN CAT SHOW</h1>
      </div>
      <div>
        <p class="text-2xl text-charcoal">TOTAL GUESTS: 8</p>
      </div>
      <div
        class="group -mr-3 border-2 border-transparent p-0.5 hover:border-2 hover:border-charcoal"
      >
        <button
          class="border border-transparent px-3 py-1 text-2xl text-charcoal group-hover:border group-hover:border-charcoal"
        >
          ADD NEW GUEST
        </button>
      </div>
    </section>
    <!------------------------------------------------------------------------->
    <!---------------------------- Guest Table -------------------------------->
    <section class="mt-1 flex w-full max-w-1440 border-2 border-charcoal p-0.5">
      <div
        class="grid h-full w-full grid-cols-2 place-content-center gap-20 border border-charcoal p-28 text-charcoal"
      >
        <!--------------------------- Guests ---------------------------------->
        <div v-for="guest in guests" :key="guest.email">
          <Guest :email="guest.email" :tickets="guest.tickets" />
        </div>
        <!--------------------------------------------------------------------->
      </div>
    </section>
    <!------------------------------------------------------------------------->
  </main>
</template>
// ------------------------------------------------------------------------- ***
// --------------------------------- Script -------------------------------- ***
<script>
const GuestRepository = require('../guest-repository');
import Guest from './Guest.vue';

export default {
  data: () => {
    return {
      guests: [],
    };
  },
  components: {
    Guest,
  },
  mounted() {
    const guestRepository = new GuestRepository();
    guestRepository.load().then((guests) => {
      this.guests = guests;
    });
  },
};
</script>
// ------------------------------------------------------------------------- ***
