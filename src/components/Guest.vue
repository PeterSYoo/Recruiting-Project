// -------------------------------- Template ------------------------------- ***
<template>
  <section
    class="group w-full max-w-500 cursor-pointer border-2 border-transparent p-0.5 hover:border-2 hover:border-charcoal"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div
      class="flex items-center justify-between gap-5 border border-transparent px-6 py-4 group-hover:border group-hover:border-charcoal"
    >
      <div class="flex items-center gap-5">
        <div>
          <img
            src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1681811557/KPA%20Test/girl_xsqr5e.png"
            alt="girl"
            v-show="!isHovered"
          />
          <img
            src="https://res.cloudinary.com/dryh1nvhk/image/upload/v1681811352/KPA%20Test/girl-walk_w4vuij.gif"
            alt="girl walking"
            v-show="isHovered"
          />
        </div>
        <div class="flex flex-col">
          <p class="text-2xl">{{ email }}</p>
          <p class="text-2xl">
            {{ tickets }} {{ tickets > 1 ? 'TICKETS' : 'TICKET' }}
          </p>
        </div>
      </div>
      <div class="hover:text-charcoal-100">
        <svg
          v-if="isHovered"
          xmlns="http://www.w3.org/2000/svg"
          width="45"
          height="45"
          viewBox="0 0 256 256"
        >
          <path
            fill="currentColor"
            d="M216 48h-40v-8a24 24 0 0 0-24-24h-48a24 24 0 0 0-24 24v8H40a8 8 0 0 0 0 16h8v144a16 16 0 0 0 16 16h128a16 16 0 0 0 16-16V64h8a8 8 0 0 0 0-16ZM96 40a8 8 0 0 1 8-8h48a8 8 0 0 1 8 8v8H96Zm96 168H64V64h128Zm-80-104v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Zm48 0v64a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z"
          />
        </svg>
      </div>
    </div>
  </section>
</template>
// ------------------------------------------------------------------------- ***
// --------------------------------- Script -------------------------------- ***
<script>
export default {
  data: () => {
    return {
      isHovered: false,
    };
  },
  props: {
    email: {
      type: String,
      required: true,
    },
    tickets: {
      type: Number,
      required: true,
    },
  },
};
</script>
// ------------------------------------------------------------------------- ***
