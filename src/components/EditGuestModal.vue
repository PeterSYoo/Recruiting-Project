// -------------------------------- TEMPLATE ------------------------------- ***
<template>
  <form
    @submit.prevent="onSubmit"
    class="fixed left-0 top-0 z-40 flex h-screen w-screen flex-col items-center justify-center bg-edit-modal-pattern"
  >
    <div
      class="mt-20 flex h-full max-h-650 w-full max-w-1090 flex-col justify-between bg-black py-10"
    >
      <!--------------------------- SHOPKEEP ---------------------------------->
      <div class="flex justify-center pt-14">
        <img
          src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1681889466/KPA%20Test/wizard_ykxkmr.png"
          alt="wizard"
          class="scale-150 transform"
        />
      </div>
      <!----------------------------------------------------------------------->
      <div class="-ml-20 mt-14 flex justify-center gap-56">
        <!------------------------ EMAIL INPUT -------------------------------->
        <div class="flex w-1/4 flex-col items-center">
          <div>
            <img
              src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1682019545/KPA%20Test/email_fvvcyt.png"
              alt="email"
            />
          </div>
          <ValidationProvider
            ref="emailValidator"
            name="email"
            rules="required|email|max:26"
          >
            <template #default="{ errors }">
              <input
                type="email"
                class="focus:outline-none mt-5 w-full bg-transparent px-2 py-1 text-center text-3xl text-eggshell"
                v-model="email"
              />
              <p
                v-if="errors[0]"
                class="absolute left-0 top-80 z-50 -mt-5 flex w-full justify-center text-center text-3xl text-eggshell"
              >
                "{{ errors[0] }}"
              </p>
            </template>
          </ValidationProvider>
        </div>
        <!--------------------------------------------------------------------->
        <!----------------------- TICKETS INPUT ------------------------------->
        <div class="flex flex-col items-center">
          <div>
            <img
              src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1682019050/KPA%20Test/ticket_l67mha.png"
              alt="ticket"
            />
          </div>
          <div class="mt-5 flex items-center px-2 py-1 text-3xl text-eggshell">
            <ValidationProvider
              ref="ticketsValidator"
              name="tickets"
              rules="required|min: 1"
            >
              <template #default="{ errors }">
                <input
                  type="text"
                  class="focus:outline-none w-8 bg-transparent px-2"
                  v-model="tickets"
                  maxlength="1"
                  onkeydown="if (event.keyCode === 48) event.preventDefault()"
                  onkeypress="return (event.keyCode >= 49 && event.keyCode <= 57) || event.keyCode === 8 || event.keyCode === 46"
                />
                <span class="">Ticket(s)</span>
                <p
                  v-if="errors[0]"
                  class="absolute left-0 top-80 z-50 mt-3 flex w-full justify-center text-center text-3xl text-eggshell"
                >
                  "{{ errors[0] }}"
                </p>
              </template>
            </ValidationProvider>
          </div>
        </div>
        <!--------------------------------------------------------------------->
      </div>
      <div class="flex justify-center gap-96">
        <!----------------------- CANCEL BUTTON ------------------------------->
        <div
          @click="$emit('close')"
          class="group -ml-12 border-2 border-transparent p-0.5 hover:border-2 hover:border-eggshell"
        >
          <button
            type="button"
            class="border border-transparent px-3 py-1 text-5xl text-eggshell group-hover:border group-hover:border-eggshell"
          >
            CANCEL
          </button>
        </div>
        <!--------------------------------------------------------------------->
        <!------------------------- OK BUTTON --------------------------------->
        <div
          class="group -mr-3 border-2 border-transparent p-0.5 hover:border-2 hover:border-eggshell"
        >
          <button
            type="submit"
            @click="onSubmit()"
            class="border border-transparent px-3 py-1 text-5xl text-eggshell group-hover:border group-hover:border-eggshell"
          >
            OK
          </button>
        </div>
        <!--------------------------------------------------------------------->
      </div>
    </div>
    <div class="flex w-48 flex-1 justify-center bg-black">
      <div class="absolute bottom-0">
        <img
          src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1681969454/KPA%20Test/link-behindwalk_lnw8qr.gif"
          alt="link behind walking"
          class="translate-y-full transform"
          id="link-behind-walking"
          v-bind:class="{ hidden: showLinkBehind }"
        />
        <img
          src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1681969547/KPA%20Test/link-behind_ngxbdi.png"
          alt="link behind"
          class="mb-27vh"
          id="girl-behind"
          v-bind:class="{ hidden: !showLinkBehind }"
        />
      </div>
    </div>
  </form>
</template>
// ------------------------------------------------------------------------- ***
// --------------------------------- SCRIPT -------------------------------- ***
<script>
export default {
  props: {
    showEditGuestModal: {
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
  data() {
    return {
      showLinkBehind: false,
      email: this.guest.email,
      tickets: this.guest.tickets,
    };
  },
  mounted() {
    const offScreenImage = document.querySelector('.translate-y-full');
    offScreenImage.classList.add('animate-slide-up');
    setTimeout(() => {
      this.showLinkBehind = true;
    }, 3000);
  },
  methods: {
    onSubmit() {
      if (
        this.$refs.emailValidator.messages[0] ||
        this.$refs.ticketsValidator.messages[0]
      ) {
        return null;
      } else {
        const updatedGuest = {
          email: this.email,
          tickets: this.tickets,
        };

        this.updateGuest(this.guest, updatedGuest);
        this.$emit('close');
      }
    },
  },
};
</script>
// ------------------------------------------------------------------------- ***
