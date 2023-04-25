// -------------------------------- TEMPLATE ------------------------------- ***
<template>
  <section
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    class="-mb-2 flex w-full max-w-1440 items-end justify-between px-6"
  >
    <!-------------------------- LOGO / ANIMATED ------------------------------>
    <div class="flex items-center gap-5">
      <div>
        <img
          src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1682026756/KPA%20Test/cat_dgxgcv.png"
          alt="cat"
          v-show="!isHovered"
        />
        <img
          src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1682026821/KPA%20Test/cat-animated_brpelg.gif"
          alt="cat animated"
          v-show="isHovered"
        />
      </div>
      <h1 class="text-3xl text-charcoal">NYAN CAT SHOW</h1>
    </div>
    <!------------------------------------------------------------------------->
    <!---------------------------- TOTAL GUESTS ------------------------------->
    <div class="flex flex-col items-center">
      <p class="text-3xl text-charcoal">TOTAL GUESTS: {{ totalTickets }}</p>
      <p class="pb-2 text-3xl text-charcoal">
        {{ totalTickets >= 20 ? 'AT MAX CAPACITY 20 GUEST LIMIT!' : null }}
      </p>
    </div>
    <!------------------------------------------------------------------------->
    <!---------------------------- ADD NEW GUEST ------------------------------>
    <div
      :class="{
        'hover:border-opacity-20': isGuestOver,
      }"
      class="group -mr-3 border-2 border-transparent p-0.5 hover:border-2 hover:border-charcoal"
      @click="updateAddNewGuestModal(true)"
    >
      <button
        :disabled="isGuestOver"
        :class="{
          'opacity-50': isGuestOver,
          'group-hover:border-opacity-20': isGuestOver,
          'line-through': isGuestOver,
        }"
        class="border border-transparent px-3 py-1 text-3xl text-charcoal group-hover:border group-hover:border-charcoal"
      >
        ADD NEW GUEST
      </button>
    </div>
    <!------------------------------------------------------------------------->
  </section>
</template>
// ------------------------------------------------------------------------- ***
// --------------------------------- SCRIPT -------------------------------- ***
<script>
export default {
  name: 'Header',
  // -------------------------------- PROPS -------------------------------- ***
  props: {
    guests: {
      type: Array,
      required: true,
    },
    totalTickets: {
      type: Number,
      required: true,
    },
    isGuestOver: {
      type: Boolean,
      required: true,
    },
  },
  // ----------------------------------------------------------------------- ***
  // --------------------------------- DATA -------------------------------- ***
  data: () => {
    return {
      isHovered: false,
    };
  },
  // ----------------------------------------------------------------------- ***
  // -------------------------------- MOUNTED ------------------------------ ***
  mounted() {
    if (this.totalTickets >= 20) {
      this.isGuestOver = true;
    }
  },
  // ----------------------------------------------------------------------- ***
  // -------------------------------- METHODS ------------------------------ ***
  methods: {
    updateAddNewGuestModal(boolean) {
      this.$emit('update-add-new-guest-modal', boolean);
    },
  },
  // ----------------------------------------------------------------------- ***
};
</script>
// ------------------------------------------------------------------------- ***
