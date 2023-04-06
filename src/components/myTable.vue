<template>
    <div class="table-content pd-10">
        <el-table
                ref="tableRef"
                class="mgt-10"
                :data="tableData"
                :height="height"
                :max-height="mHeight"
                :stripe="stripe"
                :border="border"
                :size="size"
                :fit="fit"
                :show-header="header"
                :highlight-current-row="hLight"
                :row-key="rowKey"
                :span-method="spanMethod"
                @current-change="currentChange"
                @select="select"
                @selection-change="selectionChange"
                @row-click="rowClick"
        >
            <slot name="_front" />
            <el-table-column
                    v-for="(item, i) in columns"
                    :key="i"
                    :label="item.label"
                    :prop="item.prop"
                    :show-overflow-tooltip="tooltip"
                    :align="item.align || 'left'"
                    :min-width="item.minWidth"
                    :width="item.width"
                    :resizable="resizable"
                    :formatter="item.format"
            >
            </el-table-column>
            <slot name="_end" />
        </el-table>
        <el-pagination
                v-if="pagination"
                class="mgt-10"
                :style="{ textAlign: pagination && pagination.align || 'right' }"
                :page-size="pagination && pagination.pageSize"
                :total="total"
                layout="total, sizes, prev, pager, next, jumper"
                :page-sizes="[10, 20, 50, 100]"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
        />
    </div>
</template>

<script>
    export default {
        name: "myTable",
        props: {
            tableData: {
                type: Array,
                default: () => [],
            },
            height: {
                type: Number,
                default: 360
            },
            mHeight: {
                type: Number,
                default: null
            },
            stripe: {
                type: Boolean,
                default: false
            },
            border: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: "default"
            },
            fit: {
                type: Boolean,
                default: true
            },
            header: {
                type: Boolean,
                default: true
            },
            hLight: {
                type: Boolean,
                default: true
            },
            rowKey: {
                type: String,
                default: ''
            },
            spanMethod: {
                type: Function,
                default: () => {}
            },
            tooltip: {
                type: Boolean,
                default: true
            },
            resizable: {
                type: Boolean,
                default: false
            },
            pagination: {
                type: Object,
                default: null
            },
            columns: {
                type: Array,
                default: () => []
            },
            total: {
                type: Number,
                default: 0
            }
        },
        data(){
            return {

            }
        },
        methods: {
            currentChange(val) {
                this.$emit('current-change', val);
            },
            select(val,row){
                this.$emit('select', val, row)
            },
            selectionChange(val) {
                this.$emit('selection-change', val);
            },
            rowClick(row, column, event){
                this.$emit('row-click', row,column);
            },
            handleSizeChange(a) {
                this.pagination.pageSize = a;
                this.pagination.currentPage = 1;
                this.$emit('pageChange');
            },
            handleCurrentChange(a) {
                this.pagination.currentPage = a;
                this.$emit('pageChange');
            },
            clearSelection() {
                this.$refs['tableRef'].clearSelection();
            },
        }
    }
</script>

<style>
    .table-content table thead tr th{
        background-color: #F2F8FF !important;
        color: #333;
    }
</style>