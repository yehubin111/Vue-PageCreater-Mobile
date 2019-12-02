// interface ConfigArray {
//     name: string;
//     key: string;
//     default?: string;
//     type?: string;
//     bind?: string[];
//     accept?: string;
//     child?: ConfigArray[];
// }
import { InfoObject } from './type';
// import { Vue } from 'vue/types/vue'
// interface Mixins extends Vue { created: () => void };
const mixins: any = {
    created() {
        const allInfo: InfoObject = this.$getConfig(this, this.keyOption);
        this.$emit("initConfig", allInfo);
    }
}
export default mixins;