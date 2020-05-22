<template>
  <div class="box table-wrapper">
    <actions
      v-if="isActions"
      :selected-rows="selectedRows"
      :operations="actions"
      @selected-all="onHandleSelectedAll"
    />
    <table class="table" :class="{'is-striped': striped, 'is-bordered': bordered}">
      <thead>
        <tr>
          <th v-if="isActions">
            <label class="checkbox">
              <input type="checkbox" v-model="isSelectedAll" @change="onHandleSelectedAll" />
            </label>
          </th>
          <th v-for="(column, index) in columns" :key="`table-head-column-${index}`">
            <div class="column-row">
              {{ column.label }}
              <span
                v-if="column.sorted"
                class="icons-sorted"
                @click.stop="onHandleSort(column)"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="sort"
                  class="svg-inline--fa fa-sort fa-w-10"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    fill="currentColor"
                    d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
                  />
                </svg>
              </span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <row-table
          v-for="(row, indexRow) in paginatedData"
          :key="`table-body-row-${indexRow}`"
          :action="isActions"
          :row="row"
          :columns="columns"
          :selected="checkIfSelectedRow(row)"
          @change="onHandleSelectRow"
        />
        <tr v-if=" ! paginatedData || ! paginatedData.length">
          <td class="nothing-message" :colspan="columns.length + 1">Nothing here.</td>
        </tr>
      </tbody>
    </table>
    <pagination
      v-if="isPaginated"
      :per-page="paginator.perPage"
      :total="paginator.total"
      :page="paginator.page"
      @change="onHandleChangePage"
    />
  </div>
</template>
<script>
import "@/../node_modules/bulma/css/bulma.css";
import Pagination from "./Pagination.vue";
import Actions from "./Actions.vue";
import RowTable from "./RowTable.vue";

export default {
  name: "simplicity-table",

  components: {
    Pagination,
    Actions,
    RowTable
  },

  data() {
    return {
      paginator: {
        perPage: this.perPage,
        page: 1,
        total: 0
      },
      actions: [
        {
          label: "Deleted",
          executor: () => {
            this.deletedIds = this.selectedRows.map(
              selectRow => selectRow[this.identity]
            );
            this.isSelectedAll = false;
            this.$set(this, "isSelectedAll", false);
            this.reset();
          }
        }
      ],
      deletedIds: [],
      selectedRows: [],
      isSelectedAll: false,
      rows: [...this.data],
      sort: {
        field: this.identity,
        type: "desc"
      }
    };
  },

  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    columns: {
      type: Array,
      default: () => {
        return [];
      }
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    perPage: {
      type: Number,
      default: 5
    },
    isPaginated: {
      type: Boolean,
      default: true
    },
    isActions: {
      type: Boolean,
      default: false
    },
    identity: {
      type: String,
      default: "id"
    }
  },

  mounted() {
    this.calcTotal();
  },

  methods: {
    reset() {
      this.isSelectedAll = false;
      this.selectedRows = [];
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
    onHandleChangePage(newPage) {
      this.paginator = {
        ...this.paginator,
        page: newPage
      };
    },
    onHandleSelectRow(selectedRow) {
      const existRow = this.selectedRows.find(row => {
        return row[this.identity] == selectedRow[this.identity];
      });

      if (existRow) {
        this.selectedRows = this.selectedRows.filter(row => {
          return row[this.identity] != selectedRow[this.identity];
        });
        return;
      }
      this.selectedRows = [...this.selectedRows, selectedRow];
    },
    checkIfSelectedRow(row) {
      return !!this.selectedRows.find(
        selectedRow => selectedRow[this.identity] == row[this.identity]
      );
    },
    onHandleSelectedAll() {
      if (this.isSelectedAll) {
        this.selectedRows = [...this.paginatedData];
        return;
      }
      this.selectedRows = [];
    },
    setData(data) {
      this.rows = [...data];
      this.calcTotal();
    },
    calcTotal() {
      this.paginator.total = this.rows.length;
    },
    onHandleSort(column) {
      if (column.field == this.sort.field) {
        this.sort = {
          ...this.sort,
          type: this.sort.type == "desc" ? "asc" : "desc"
        };
        return;
      }

      this.sort = {
        field: column.field,
        type: column.sortType ? column.sortType : "desc"
      };
    }
  },

  computed: {
    paginatedData() {
      let data = this.rows;

      data = data.sort((rowLeft, rowRight) => {
        return this.sort.type == "asc"
          ? this.getRowValue(this.sort.field, rowLeft) >
            this.getRowValue(this.sort.field, rowRight)
            ? -1
            : 1
          : this.getRowValue(this.sort.field, rowLeft) <
            this.getRowValue(this.sort.field, rowRight)
          ? -1
          : 1;
      });

      if (this.deletedIds.length) {
        data = data.filter(row => {
          return !this.deletedIds.includes(row[this.identity]);
        });
        this.setData(data);
      }

      if (this.isPaginated) {
        const slicerPage = (this.paginator.page - 1) * this.paginator.perPage;
        return data.slice(slicerPage, slicerPage + this.paginator.perPage);
      }
      return data;
    }
  }
};
</script>
<style lang="scss" scoped>
.table-wrapper {
  margin: 15px;

  .table {
    width: 100%;

    .nothing-message {
      text-align: center;
    }

    .column-row {
      width: 100%;
      display: flex;
    }

    .icons-sorted {
      user-select: none;
      cursor: pointer;
      margin-left: 5px;

      svg {
        width: 10px;
        height: 15px;
      }
    }
  }
}
</style>