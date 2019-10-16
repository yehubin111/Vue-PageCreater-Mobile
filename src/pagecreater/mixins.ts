interface ConfigArray {
    name: string;
    key: string;
    default?: string;
    type?: string;
    bind?: string[];
    accept?: string;
    child?: ConfigArray[];
}

const mixins: any = {
    created() {
        const allInfo: ConfigArray[] = this.$getConfig(this, this.keyOption);
        this.$emit("initConfig", allInfo);
        console.log('abcdefg' + JSON.stringify(allInfo));
    }
}
export default mixins;