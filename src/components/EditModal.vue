// -------------------------------- TEMPLATE ------------------------------- ***
<template>
  <section
    class="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-edit-modal-pattern"
  >
    <div
      class="flex h-full max-h-650 w-full max-w-1090 flex-col justify-between bg-charcoal-900 py-20"
    >
      <!---------------------------- AVATAR ----------------------------------->
      <div class="flex justify-center pt-14">
        <img
          src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1681811557/KPA%20Test/girl_xsqr5e.png"
          alt="girl"
          class="scale-150 transform"
        />
      </div>
      <!----------------------------------------------------------------------->
      <div class="flex justify-center gap-28">
        <!------------------------ EMAIL INPUT -------------------------------->
        <div class="flex w-1/3 flex-col items-center gap-5">
          <p class="text-7xl">📧</p>
          <div class="w-full border-2 border-eggshell p-0.5">
            <input
              type="text"
              class="focus:outline-none w-full border border-eggshell bg-transparent px-2 py-1 text-3xl text-eggshell"
              v-model="guest.email"
            />
          </div>
        </div>
        <!--------------------------------------------------------------------->
        <!----------------------- TICKETS INPUT ------------------------------->
        <div class="flex flex-col items-center gap-5">
          <p class="text-7xl">🎟️</p>
          <div class="border-2 border-eggshell p-0.5">
            <div
              class="flex items-center border border-eggshell px-2 py-1 text-3xl text-eggshell"
            >
              <input
                type="text"
                class="focus:outline-none w-8 bg-transparent px-2"
                v-model="guest.tickets"
              />
              <p class="">Ticket(s)</p>
            </div>
          </div>
        </div>
        <!--------------------------------------------------------------------->
      </div>
      <div class="flex justify-center gap-64">
        <!----------------------- CANCEL BUTTON ------------------------------->
        <div
          @click="$emit('close')"
          class="group -mr-3 border-2 border-transparent p-0.5 hover:border-2 hover:border-eggshell"
        >
          <button
            class="border border-transparent px-3 py-1 text-5xl text-eggshell group-hover:border group-hover:border-eggshell"
          >
            CANCEL
          </button>
        </div>
        <!--------------------------------------------------------------------->
        <!------------------------- OK BUTTON --------------------------------->
        <div
          @click="onSubmit()"
          class="group -mr-3 border-2 border-transparent p-0.5 hover:border-2 hover:border-eggshell"
        >
          <button
            class="border border-transparent px-3 py-1 text-5xl text-eggshell group-hover:border group-hover:border-eggshell"
          >
            OK
          </button>
        </div>
        <!--------------------------------------------------------------------->
      </div>
    </div>
  </section>
</template>
// ------------------------------------------------------------------------- ***
// --------------------------------- SCRIPT -------------------------------- ***
<script>
export default {
  props: {
    showEditModal: {
      type: Boolean,
      required: true,
    },
    guest: {
      type: Object,
      required: true,
    },
    updateGuest: {
      type: Function,
      required: true,
    },
  },
  methods: {
    onSubmit() {
      const updatedGuest = {
        ...this.guest,
        name: this.name,
        email: this.email,
        tickets: this.tickets,
      };

      this.updateGuest(updatedGuest);
      this.$emit('close');
    },
  },
};
</script>
// ------------------------------------------------------------------------- ***
