<template>
    <el-upload
            class="resolve-csv d-ib"
            title="只能解析.csv文件"
            action=""
            :show-file-list="false"
            accept=".csv"
            :http-request="resolveCsv"
    >
        <slot></slot>
    </el-upload>
</template>

<script>
    export default {
        name: "resolveCsv",
        data(){
            return {

            }
        },
        methods: {
            resolveCsv(val){
                const {file} = val;
                const {size} = file;
                if(size > 2*1024*1024) {
                    this.$message.warning('请上传小于2MB的文件');
                    return false;
                }

                const fileReader = new FileReader();
                fileReader.readAsText(file);

                const that = this;

                fileReader.onload = function() {
                    let lines = this.result.split("\n");
                    let data = [];
                    lines.map(v => {
                        if (v) {
                            data.push(v.split(","));
                        }
                    });
                    that.$emit("getCsvData", data);
                };
            },
        }
    }
</script>

<style scoped>

</style>