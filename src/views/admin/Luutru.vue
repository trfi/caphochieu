<template>
  <div class="dashboard">
    <h3 class="subheading grey--text">Lưu trữ</h3>

    <v-container class="my-5" style="max-width:900px">
      
      <v-card flat v-for="passport in passports" :key="passport.title">
        <v-layout row wrap :class="`pa-3 passport ${passport.trangthai}`">
          <v-flex xs6 sm4 md3>
            <div class="caption grey--text">Họ tên</div>
            <div>{{ passport.hoten }}</div>
          </v-flex>
          <v-flex xs3 sm2 md1>
            <div class="caption grey--text">Giới tính</div>
            <div>{{ passport.gioitinh }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">CMND</div>
            <div>{{ passport.cmnd }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Địa chỉ thường trú</div>
            <div>{{ passport.dcthuongtru }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="right">
              <v-chip small v-bind:class="passport.trangthai" class="white--text my-2 caption">{{ passport.trangthai | changeStatus }}</v-chip>
            </div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="right">
              <v-btn x-small class="ma-1" icon fab color="teal" @click="approving(passport, true)">
                <v-icon>mdi-check-outline</v-icon>
              </v-btn>
              <v-btn x-small class="ma-1" icon fab color="red" @click="approving(passport, false)">
                <v-icon>mdi-close-outline</v-icon>
              </v-btn>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>

    </v-container>
   
  </div>
</template>

<script>
import PassportServices from '@/services/PassportServices'

export default {
  data () {
    return {
      passports: {},
      isApproved: false
    }
  },
  filters: {
    changeText(str) {
      return str.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D')
        .replace(/ /g, '-')
        .toLowerCase()
    },
    changeStatus(status) {
      if (status.includes('approve')) return 'Đã phê duyệt'
      else if (status.includes('cancel')) return 'Không phê duyệt'
      else return ''
    }
  },
  methods: {
    async approving(passport, isStoring) {
      try {
        if (isStoring) passport.trangthai = 'lt storage'
        else passport.trangthai = 'lt deleted'
        PassportServices.approve(passport.id, {isStoring: isStoring})
      } 
      catch (error) {
        this.error = error.response.data.error
      }
    },
  },
  async mounted () {   
    this.passports = (await PassportServices.getByStatus('lt')).data
  }
}
</script>

<style>
.passport.approve{
  border-left: 4px solid #3cd1c2;
}
.passport.approved{
  border-left: 4px solid #1ee92f;
}
.passport.cancel{
  border-left: 4px solid #f83e70;
}
div.right > .v-chip.approve{
  background: #3cd1c2;
}
div.right > .v-chip.approved{
  background: #1ee92f;
}
div.right > .v-chip.cancel{
  background: #f83e70;
}
</style>