import BackTop from "content/backtop/BackTop";

export const backTopMixin = {
    data(){
        return{
            isShowBackTop: false,
            BACK_POSITION: 1600,
        }
    },
    components:{
        BackTop,
    },
    methods:{
        backTop(){
            this.$refs.scroll.scrollTo(0, 0, 300);
        },
        listenShowBackTop(position){
            this.isShowBackTop = -position.y > this.BACK_POSITION;
        }
    }

}