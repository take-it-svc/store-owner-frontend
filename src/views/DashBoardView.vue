<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6">
        <v-card elevation="3" class="rounded-lg" style="border-top: 1px solid #5f5856">
          <v-card-title primary-title>
            <div>
              <div class="grey--text">{{ salesAmount.title }}</div>
            </div>
            <v-card-text class="d-flex justify-space-between align-center">
              <h3 class="text-h4">{{ salesAmount.data | currency }}원</h3>
              <v-avatar size="60">
                <v-icon
                    :color="salesAmount.color"
                    size="50"
                >
                  mdi-currency-krw
                </v-icon>
              </v-avatar>
            </v-card-text>
          </v-card-title>
        </v-card>
      </v-col>

      <v-col
          cols="12"
          sm="6"
      >
        <v-card elevation="3" class="rounded-lg" style="border-top: 1px solid #5f5856">
          <v-card-title primary-title>
            <div>
              <div class="grey--text">{{ bestSellItem.title }}</div>
            </div>
            <v-card-text class="d-flex justify-space-between align-center">
              <h3 class="headline">{{ bestSellItem.data.itemName }} {{ bestSellItem.data.sumCounts }}개</h3>
              <v-avatar size="60">
                <v-icon
                    :color="bestSellItem.color"
                    size="64"
                >
                  mdi-coffee-outline
                </v-icon>
              </v-avatar>
            </v-card-text>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card style="border-top: 1px solid #5f5856" elevation="3">
          <v-card-title>
            <div class="grey--text">{{ sellAmountAWeeks.title }}</div>
            <v-icon
                :color="sellAmountAWeeks.color"
                class="ml-15 flex justify-end"
                size="64"
            >
              mdi-currency-krw
            </v-icon>
          </v-card-title>
          <v-sheet color="transparent">
            <CustomChart
                v-if="sellAmountAWeeks.loaded"
                :chart-data="sellAmountAWeeks.data"
                :options="sellAmountAWeeks.options"/>
          </v-sheet>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import orderApi from "@/api/orderApi";
import CustomChart from "@/js/CustomChart";

export default {
  name: "HomeDashBoard",
  components: {
    CustomChart
  },
  props: ['userInfo'],
  data() {
    return {
      salesAmount: {
        title: "오늘의 매출",
        color: "#5f5856",
        data: {}
      },
      bestSellItem: {
        title: "베스트 세일",
        color: "#5f5856",
        data: {}
      },
      sellAmountAWeeks: {
        title: "주간 판매금액",
        color: "#5f5856",
        loaded: false,
        options: {
          responsive: true,
          maintainAspectRatio: false,

          scales: {
            xAxes: [{
              ticks: {
                fontSize: 12
              },
            }],
            yAxes: [{
              ticks: {
                fontSize: 13,
                userCallback: function (ele) {
                  return Number(ele).toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,") + "원"
                }
              },
            }]
          }
        },
        data: {
          labels: [],
          datasets: []
        },
      },
    }
  },
  methods: {
    async getDashboardData() {
      const response = await orderApi.findDashboard()
      this.salesAmount.data = response.data.data.salesAmount
      this.bestSellItem.data = response.data.data.bestSellItem

      var saleDataset = {
        label: '일별 판매 금액',
        backgroundColor: 'grey',
        borderColor: 'grey',
        fill: false,
        data: [],
      }
      for (const ele of response.data.data.sellAmountAWeeks) {
        this.sellAmountAWeeks.data.labels.push(ele.sellDate)
        saleDataset.data.push(ele.sellAmount)
      }
      this.sellAmountAWeeks.data.datasets.push(saleDataset)

      this.sellAmountAWeeks.loaded = true
    },
  },
  async mounted() {
    this.getDashboardData()

  }
}
</script>

<style scoped>

</style>
