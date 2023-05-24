<template>
  <div class="home-page__diagram">
    <div class="home-page__header">Оборот, руб.</div>

    <div class="home-page__char">
      <div class="home-page__char-header">
        <div>За месяц: <span class="text--gray">1 Апр - 31 Апр</span></div>

        <div>
          <span class="text--gray">Всего: </span
          ><span class="home-page__char-header-balance">565 600 руб.</span>
        </div>
      </div>

      <Chart
        :size="{ width: 800, height: 320 }"
        :data="monthMoney"
        :margin="{
          left: 0,
          top: 20,
          right: 20,
          bottom: 0,
        }"
        direction="horizontal"
        :axis="{
          primary: {
            domain: ['dataMin', 'dataMax + 100'],
            type: 'band',
          },
          secondary: {
            domain: ['dataMin', 'dataMax + 100'],
            type: 'linear',
            ticks: 8,
          },
        }"
      >
        <template #layers>
          <Grid strokeDasharray="2,2" />
          <Bar
            :dataKeys="['число', 'оборот']"
            :barStyle="{ fill: '#D9DFE5' }"
          />
        </template>

        <template #widgets>
          <Tooltip
            borderColor="#48CAE4"
            :config="{
              pl: { color: '#90e0ef' },
              avg: { color: '#0096c7' },
              inc: { color: '#48cae4' },
            }"
          />
        </template>
      </Chart>
    </div>
  </div>

  <div class="home-page__diagram">
    <div class="home-page__header">Оборот, кол-во заказов</div>

    <div class="home-page__char">
      <div class="home-page__char-header">
        <div>За месяц: <span class="text--gray">1 Апр - 31 Апр</span></div>

        <div>
          <span class="text--gray">Всего: </span
          ><span class="home-page__char-header-balance">18228</span>
        </div>
      </div>

      <Chart
        :size="{ width: 800, height: 320 }"
        :data="orders"
        :margin="{
          left: 0,
          top: 20,
          right: 20,
          bottom: 0,
        }"
        direction="horizontal"
      >
        <template #layers>
          <Grid strokeDasharray="2,2" />
          <Line :dataKeys="['число', 'заказов']" />
        </template>
      </Chart>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Chart, Grid, Line, Bar, Responsive, Pie, Tooltip } from "vue3-charts";

const monthMoneyTurnover = [
  { число: "1", оборот: 10500 },
  { число: "2", оборот: 20000 },
  { число: "3", оборот: 31000 },
  { число: "4", оборот: 10000 },
  { число: "5", оборот: 20000 },
  { число: "6", оборот: 16000 },
  { число: "7", оборот: 18000 },
  { число: "8", оборот: 15000 },
  { число: "9", оборот: 17000 },
  { число: "10", оборот: 25000 },
  { число: "11", оборот: 26000 },
  { число: "12", оборот: 28000 },
  { число: "13", оборот: 10500 },
  { число: "14", оборот: 20000 },
  { число: "15", оборот: 31000 },
  { число: "16", оборот: 10000 },
  { число: "17", оборот: 20000 },
  { число: "18", оборот: 16000 },
  { число: "19", оборот: 18000 },
  { число: "20", оборот: 15000 },
  { число: "21", оборот: 17000 },
  { число: "22", оборот: 25000 },
  { число: "23", оборот: 26000 },
  { число: "24", оборот: 28000 },
  { число: "25", оборот: 10500 },
  { число: "26", оборот: 20000 },
  { число: "27", оборот: 31000 },
  { число: "28", оборот: 10000 },
  { число: "29", оборот: 20000 },
  { число: "30", оборот: 16000 },
];

const monthOrders = [
  { число: "1", заказов: 105 },
  { число: "2", заказов: 200 },
  { число: "3", заказов: 310 },
  { число: "4", заказов: 100 },
  { число: "5", заказов: 200 },
  { число: "6", заказов: 160 },
  { число: "7", заказов: 180 },
  { число: "8", заказов: 150 },
  { число: "9", заказов: 170 },
  { число: "10", заказов: 250 },
  { число: "11", заказов: 260 },
  { число: "12", заказов: 280 },
  { число: "13", заказов: 100 },
  { число: "14", заказов: 200 },
  { число: "15", заказов: 310 },
  { число: "16", заказов: 100 },
  { число: "17", заказов: 200 },
  { число: "18", заказов: 160 },
  { число: "19", заказов: 180 },
  { число: "20", заказов: 150 },
  { число: "21", заказов: 170 },
  { число: "22", заказов: 250 },
  { число: "23", заказов: 260 },
  { число: "24", заказов: 280 },
  { число: "25", заказов: 100 },
  { число: "26", заказов: 200 },
  { число: "27", заказов: 310 },
  { число: "28", заказов: 100 },
  { число: "29", заказов: 200 },
  { число: "30", заказов: 160 },
];

export default defineComponent({
  name: "LineChart",
  components: {
    Chart,
    Grid,
    Line,
    Bar,
    Responsive,
    Pie,
    Tooltip,
  },
  setup() {
    const monthMoney = ref(monthMoneyTurnover);
    const orders = ref(monthOrders);

    return { monthMoney, orders };
  },
});
</script>
