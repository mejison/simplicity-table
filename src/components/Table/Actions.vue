<template>
  <div class="actions">
    <div
      class="selected-text"
      v-if="selectedRows && selectedRows.length"
    >Selected {{ selectedRows.length }} elements</div>
    <div class="actions-select">
      <div class="select is-small">
        <select v-model="selected">
          <option :value="false">Actions</option>
          <option
            v-for="(operation, index) in operations"
            :value="operation"
            :key="index"
          >{{ operation.label }}</option>
        </select>
      </div>
      <div class="actions-runner">
        <button
          class="button is-link is-small"
          :disabled=" ! canRun"
          @click.prevent="onHandlerRun"
        >Run</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "actions",

  data() {
    return {
      selected: false,
      state: this.toggle
    };
  },

  props: {
    selectedRows: {
      type: Array,
      default: () => {
        return [];
      }
    },
    operations: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },

  watch: {
    toggle() {
      this.state = this.toggle;
    }
  },

  methods: {
    onHandlerRun() {
      if (this.selected) {
        this.selected.executor();
      }
    }
  },

  computed: {
    canRun() {
      return this.selected;
    }
  }
};
</script>
<style lang="scss" scoped>
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .selected-text {
    font-size: 14px;
  }

  .actions-select {
    display: flex;
    justify-content: space-between;
    margin-left: auto;

    .select,
    .actions-runner {
      margin: 4px;
    }
  }
}
</style>