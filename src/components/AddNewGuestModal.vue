// -------------------------------- TEMPLATE ------------------------------- ***
<template>
  <form
    @submit.prevent="onSubmit"
    class="fixed left-0 top-0 z-40 flex h-screen w-screen flex-col items-center justify-center bg-add-modal-pattern"
  >
    <div
      class="flex h-full max-h-650 w-full max-w-1090 flex-col justify-between bg-black py-10"
    >
      <!---------------------------- GHOST ------------------------------------>
      <div class="flex justify-center pt-32">
        <img
          src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1681980799/KPA%20Test/ghost-right_wy8gas.gif"
          alt="ghost right"
          v-if="!showNextGhost"
          :class="{ 'animate-move-right': animateRight }"
        />
        <img
          src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1681980799/KPA%20Test/ghost-left_rany9o.gif"
          alt="ghost left"
          v-if="showNextGhost"
          :class="{ 'animate-move-left': animateLeft }"
        />
      </div>
      <!----------------------------------------------------------------------->
      <div class="-ml-10 -mt-10 flex items-end justify-center gap-56">
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
                v-if="totalTicketsPlusInput >= 20"
                class="absolute left-0 top-36 z-50 mt-3 flex w-full justify-center text-center text-3xl text-eggshell"
              >
                "That puts your guests over at max capacity,
                {{ totalTicketsPlusInput }} guests total please remove some
                tickets."
              </p>
              <p
                v-if="errors[0]"
                class="absolute left-0 top-0 z-30 mt-48 flex w-full justify-center text-center text-3xl text-eggshell"
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
          <div
            class="mt-5 flex items-center justify-center px-2 py-1 text-3xl text-eggshell"
          >
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
                  class="absolute left-0 top-0 z-30 mt-56 flex w-full justify-center text-center text-3xl text-eggshell"
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
        <div class="flex items-center gap-10">
          <!------------------------- OK BUTTON --------------------------------->
          <div
            :class="{
              'hover:border-opacity-20': isSubmitDisabled,
            }"
            class="group -mr-3 w-auto border-2 border-transparent p-0.5 hover:border-2 hover:border-eggshell"
          >
            <button
              :disabled="isSubmitDisabled"
              :class="{
                'opacity-50': isSubmitDisabled,
                'group-hover:border-opacity-20': isSubmitDisabled,
                'line-through': isSubmitDisabled,
              }"
              type="submit"
              @click="onSubmit()"
              class="border border-transparent px-3 py-1 text-5xl text-eggshell group-hover:border group-hover:border-eggshell"
            >
              OK
            </button>
          </div>
          <!--------------------------------------------------------------------->
          <!--------------------- FORCE EDIT BUTTON ----------------------------->
          <div
            class="group -mr-36 border-2 border-transparent p-0.5 hover:border-2 hover:border-eggshell"
          >
            <button
              type="submit"
              @click="onSubmit()"
              class="border border-transparent px-3 py-1 text-5xl text-eggshell group-hover:border group-hover:border-eggshell"
            >
              FORCE EDIT
            </button>
          </div>
          <!--------------------------------------------------------------------->
        </div>
      </div>
    </div>
  </form>
</template>
// ------------------------------------------------------------------------- ***
// --------------------------------- SCRIPT -------------------------------- ***
<script>
export default {
  name: 'AddNewGuestModal',
  props: {
    showAddNewGuestModal: {
      type: Boolean,
      required: true,
    },
    guest: {
      type: Object,
      required: true,
    },
    newGuest: {
      type: Function,
      required: true,
    },
    totalTickets: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      showNextGhost: false,
      email: 'email@email.com',
      tickets: 1,
      animateLeft: false,
      animateRight: false,
      totalTicketsPlusInput: 0,
      isSubmitDisabled: false,
    };
  },
  mounted() {
    this.totalTicketsPlusInput = parseInt(this.totalTickets);

    if (this.totalTicketsPlusInput >= 20) {
      this.isSubmitDisabled = true;
    } else if (this.totalTicketsPlusInput < 20) {
      this.isSubmitDisabled = false;
    }

    this.showNextGhost = !this.showNextGhost;
    this.animateLeft = this.showNextGhost;
    this.animateRight = !this.showNextGhost;

    setInterval(() => {
      this.showNextGhost = !this.showNextGhost;
      this.animateLeft = this.showNextGhost;
      this.animateRight = !this.showNextGhost;
    }, 4000);
  },
  watch: {
    tickets(newValue) {
      this.totalTicketsPlusInput =
        parseInt(this.totalTickets) + parseInt(newValue);
      console.log('totalTicketsPlusInput: ', this.totalTicketsPlusInput);

      if (this.totalTicketsPlusInput >= 20) {
        this.isSubmitDisabled = true;
      } else if (this.totalTicketsPlusInput < 20) {
        this.isSubmitDisabled = false;
      }
    },
  },
  methods: {
    onSubmit() {
      if (
        this.$refs.emailValidator.messages[0] ||
        this.$refs.ticketsValidator.messages[0]
      ) {
        this.isSubmitDisabled = true;
        return null;
      } else {
        const newGuest = {
          email: this.email,
          tickets: this.tickets,
        };

        this.newGuest(newGuest);
        this.$emit('close');
      }
    },
  },
};
</script>
// ------------------------------------------------------------------------- ***
