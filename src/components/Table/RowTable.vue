<template>
  <tr class="row-table-item">
    <td v-if="action">
      <label class="checkbox">
        <input type="checkbox" :checked="selected" @change="onHandleSelectRow" />
      </label>
    </td>
    <td v-for="(column, index) in columns" :key="`table-body-column-${index}`">
      <div class="column-item">
        <div
          v-if="editableField != column.field"
          :key="`table-item-column-${index}`"
        >{{ getRowValue(column.field, row) }}</div>
        <div v-if="editableField == column.field" :key="`table-item-column-editable-${index}`">
          <div class="field">
            <div class="control">
              <input class="input is-small input-editable" v-model="editableValue" type="text" />
            </div>
          </div>
        </div>
        <span
          class="edit-action"
          v-if="column.editable"
          @click.prevent="onHandleEditable(column, index)"
        >
          <svg
            v-if="editableField != column.field"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="pencil-alt"
            class="svg-inline--fa fa-pencil-alt fa-w-16"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"
            />
          </svg>
          <svg
            v-if="editableField == column.field"
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="save"
            class="svg-inline--fa fa-save fa-w-14"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM272 80v80H144V80h128zm122 352H54a6 6 0 0 1-6-6V86a6 6 0 0 1 6-6h42v104c0 13.255 10.745 24 24 24h176c13.255 0 24-10.745 24-24V83.882l78.243 78.243a6 6 0 0 1 1.757 4.243V426a6 6 0 0 1-6 6zM224 232c-48.523 0-88 39.477-88 88s39.477 88 88 88 88-39.477 88-88-39.477-88-88-88zm0 128c-22.056 0-40-17.944-40-40s17.944-40 40-40 40 17.944 40 40-17.944 40-40 40z"
            />
          </svg>
        </span>
      </div>
    </td>
  </tr>
</template>
<script>
export default {
  name: "row-table",

  props: {
    row: {
      type: Object,
      default: () => {}
    },
    action: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: () => []
    },
    selected: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      editable: [...new Array(this.columns.length).map(() => false)],
      editableField: "",
      editableValue: "",
      editableInput: [...new Array(this.columns.length).map(() => false)]
    };
  },

  methods: {
    onHandleSelectRow(column) {
      this.$emit("change", column);
    },
    getRowValue(column, row) {
      if (!column.includes(".")) {
        return row[column];
      }
      const parts = column.split(".");
      return parts.reduce((prev, curr) => {
        return prev && prev[curr] ? prev[curr] : "";
      }, row);
    },
    setRowValue(column, row, value) {
      if (!column.includes(".")) {
        return (row[column] = value);
      }
      const parts = column.split(".");
      let accessor = parts.join("']['");

      if (value) {
        accessor = `row['${accessor}'] = value`;
        try {
          eval(accessor); // hmmm
        } catch (error) {
          console.error(error);
        }
      }
    },
    onHandleEditable(column, index) {
      if (!this.editable[index]) {
        this.editable[index] = true;
        this.editableField = column.field;
        this.editableValue = this.getRowValue(this.editableField, this.row);

        return;
      }
      this.editable[index] = false;
      this.setRowValue(this.editableField, this.row, this.editableValue);
      this.editableField = "";
    }
  }
};
</script>
<style lang="scss" scoped>
.row-table-item {
  th {
    vertical-align: bottom;
  }

  td {
    vertical-align: middle;
  }
}

.column-item {
  display: flex;
  align-items: center;

  .edit-action {
    opacity: 0;
    cursor: pointer;
    user-select: none;
    margin-left: 5px;

    svg {
      width: 10px;
      height: 10px;
      color: #999;
    }
  }

  .input-editable {
    width: 100%;
    transition: all 0.5s ease;
  }

  &:hover {
    .edit-action {
      opacity: 1;
    }
  }
}
</style>