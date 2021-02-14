<template>
  <div id="address">
      <nav-bar>
          <template v-slot:center>地址管理</template>
      </nav-bar>
      <div class="address-item">
        <van-address-list
            v-if="from != 'mine'"
            v-model="chosenAddressId"
            :list="list"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
            @select="select"
        />
        <van-address-list
            v-else
            v-model="chosenAddressId"
            :list="list"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
        />
      </div>
  </div>
</template>

<script>
import NavBar from 'common/navbar/NavBar'
import { getAddressList } from 'network/address'

import Vue from 'vue'
import { AddressList } from 'vant';

Vue.use(AddressList);

export default {
    name: 'Address',
    components: {
        NavBar,
    },
    data () {
        return {
            title: '地址管理',
            list: [],
            from: this.$route.query.from,
            chosenAddressId: '1'
        }
    },
    async mounted() {
        const { data } = await getAddressList()
        this.list = data.map(item => {
            return {
                id: item.addressId,
                name: item.userName,
                tel: item.userPhone,
                address: `${item.provinceName} ${item.cityName} ${item.regionName} ${item.detailAddress}`,
                isDefault: !!item.defaultFlag
            }
        })
    },
    methods: {
        onAdd() {
        this.$router.push({ path: `address-edit?type=add&from=${this.from}` })
        },
        onEdit(item) {
        this.$router.push({ path: `address-edit?type=edit&addressId=${item.id}&from=${this.from}` })
        },
        select(item) {
        this.$router.push({ path: `createOrder?addressId=${item.id}&from=${this.from}` })
        }        
    }
}
</script>

<style lang="stylus" scoped>
.address-item
    margin-top 75px
    .van-address-list
        >>> .van-address-item
            padding 3.6vw
        >>> .van-address-item__name
            font-size 30px
            line-height 30px
        >>> .van-address-item__address
            font-size 25px
            line-height 25px
        >>> .van-address-item__tag
            line-height 25px
</style>