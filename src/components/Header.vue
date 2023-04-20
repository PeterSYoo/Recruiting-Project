// -------------------------------- TEMPLATE ------------------------------- ***
<template>
  <section
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    class="-mb-5 flex w-full max-w-1440 items-center justify-between px-6"
  >
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
    <div>
      <p class="text-3xl text-charcoal">TOTAL GUESTS: {{ guests.length }}</p>
    </div>
    <div
      class="group -mr-3 border-2 border-transparent p-0.5 hover:border-2 hover:border-charcoal"
      @click="updateAddNewGuestModal(true)"
    >
      <button
        class="border border-transparent px-3 py-1 text-3xl text-charcoal group-hover:border group-hover:border-charcoal"
      >
        ADD NEW GUEST
      </button>
    </div>
  </section>
</template>
// ------------------------------------------------------------------------- ***
// --------------------------------- SCRIPT -------------------------------- ***
<script>
export default {
  props: {
    guests: {
      type: Array,
      required: true,
    },
  },
  data: () => {
    return {
      isHovered: false,
    };
  },
  methods: {
    updateAddNewGuestModal(boolean) {
      this.$emit('update-add-new-guest-modal', boolean);
    },
  },
};
</script>
// ------------------------------------------------------------------------- ***
