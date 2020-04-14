<template>
  <div class="dashboard">
    <h3 class="subheading grey--text">Dashboard</h3>

    <v-container class="my-5" style="max-width:1000px" v-if="role == 'Adminstrator'">
      <v-card flat v-for="passport in passports" :key="passport.title">
        <v-layout row wrap :class="`pa-3 passport ${passport.trangthai}`">
          <v-flex xs6 sm5 md4>
            <div class="caption grey--text">Họ tên</div>
            <div>{{ passport.hoten }}</div>
          </v-flex>
          <v-flex xs3 sm2 md2>
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
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
    <div class="text-center ma-2">
      <v-snackbar
        v-model="snackbar"
        top
        :color="snackbar_color"
      >
        {{ snackbar_text }}
        <v-btn
          color="black"
          text
          @click="snackbar = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import PassportServices from '@/services/PassportServices'

export default {
  data () {
    return {
      passports: {},
      snackbar: false,
      snackbar_text: '',
      snackbar_color: '',
      role: ''
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
      if (status == 'xt waiting') return 'Chờ xác thực'
      else if (status == 'xd waiting') return 'Chờ xét duyệt'
      else if (status == 'xt complete') return 'Đã xác thực'
      else if (status == 'xt cancel') return 'Không hợp lệ'
      else if (status == 'lt approve') return 'Đã phê duyệt'
      else if (status == 'lt cancel') return 'Không phê duyệt'
      else return ''
    }
  },
  methods: {
  },
  async mounted () {
    this.role = localStorage.getItem('role')
    this.passports = (await PassportServices.getAll()).data
  }
}
</script>

<style>
.passport.complete, .passport.approve {
  border-left: 4px solid #3cd1c2;
}
.passport.waiting {
  border-left: 4px solid #ffaa2c;
}
.passport.cancel {
  border-left: 4px solid #f83e70;
}
div.right > .v-chip.complete, div.right > .v-chip.approve {
  background: #3cd1c2;
}
div.right > .v-chip.waiting{
  background: #ffaa2c;
}
div.right > .v-chip.cancel{
  background: #f83e70;
}
</style>