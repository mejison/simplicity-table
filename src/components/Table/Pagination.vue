<template>
  <nav class="pagination is-small" role="navigation" aria-label="pagination">
    <a class="pagination-previous" :disabled=" ! canPrev" @click.prevent="onHandlePrev">Previous</a>
    <a class="pagination-next" :disabled=" ! canNext" @click.prevent="onHandleNext">Next page</a>
    <ul class="pagination-list">
      <li
        v-for="(pageItem, indexPage) in new Array(pagesLength)"
        :key="indexPage"
        @click="onHandleChangePage(indexPage + 1)"
      >
        <a
          class="pagination-link"
          :class="{'is-current': indexPage + 1 == page}"
        >{{ indexPage + 1 }}</a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "table-pagination",

  props: {
    perPage: {
      type: Number,
      default: 5
    },
    page: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    }
  },

  computed: {
    pagesLength() {
      return Math.ceil(this.total / this.perPage);
    },
    canNext() {
      return this.page != this.pagesLength;
    },
    canPrev() {
      return this.page != 1;
    }
  },

  methods: {
    onHandleChangePage(newPage) {
      this.$emit("change", newPage);
    },
    onHandlePrev() {
      if (this.canPrev) {
        this.$emit("change", this.page - 1);
      }
    },
    onHandleNext() {
      if (this.canNext) {
        this.$emit("change", this.page + 1);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
</style>