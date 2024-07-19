<template>
  <div class="mahdaad-date-picker">
    <div class="flex">
      {{ currentTime }}
      <div class="calendar ">
          <div  class="month-year-container">
            <Select
              :bordered="false"
              size="small"
              :dropdown-match-select-width="false"
              :value="String(currentDate.month())"
              @change="handleChangeMonth"
            >
              <SelectOption
                v-for="(val, index) in getMonths(currentDate)"
                :key="String(index)"
                class="month-item"
              >
                {{ val }}
              </SelectOption>
            </Select>
            <Select
              :bordered="false"
              size="small"
              :dropdown-match-select-width="false"
              class="my-year-select"
              :value="String(currentDate.year())"
              @change="handleChangeYear"
            >
              <SelectOption
                v-for="val in getYears(currentDate)"
                :key="String(val)"
                class="year-item"
              >
                {{ val }}
              </SelectOption>
            </Select>
          </div>
        <Calendar class="calendar-body"  v-model:value="currentDate" :fullscreen="false"  />
        <span class="calendar-footer">
          <Button @click="handleToday" type="link">Today</Button>
        </span>
      </div>
      <div class="flex flex-col">
        <span class="time-title">Time</span>
        <div ref="container" class="time-body"></div>
        <span class="time-footer">
            <Button @click="handleNow" type="link">Now</Button>
        </span>
      </div>
    </div>
    <TimePicker value-format="HH:mm:ss" v-model:value="currentTime" ref="temp" :blur="handleChangeTime"  :getPopupContainer="()=> container" :bordered="false" :open="true" style="display: none"/>
  </div>
</template>
<script setup lang="ts">
import {Calendar,TimePicker,Select,SelectOption,Button} from 'ant-design-vue'
import { onMounted, ref, watch } from "vue";
import dayjs, { Dayjs } from 'dayjs';

interface Props{
  date?:string
  time?:string | null
}
const temp=ref()

/*
onMounted(()=>{
  setTimeout(()=>{
    console.log("11111",container.value);
  },5000)
})
*/

const container=ref()
const currentDate = ref<Dayjs>(dayjs());
const currentTime = ref<Dayjs | null>(dayjs());
const emit=defineEmits<{
  (e:'change',date:string,time:string | null) : void
}>()
const props=withDefaults(defineProps<Props>(),{})

/*watch(()=>props.time,()=>{
  if(props.time==null){
    currentTime.value=null
  }
  if(props.time!=undefined){
    currentTime.value=dayjs(currentDate.value.format('YYYY-MM-DD')+'T'+props.time,)
  }
},{immediate:true})*/

watch(()=>props.date,()=>{
  if(!props.date){
    return
  }
  currentDate.value=dayjs(props.date)
},{immediate:true})

const getMonths = (value: Dayjs) => {
  const localeData = value.localeData();
  const months = [];
  for (let i = 0; i < 12; i++) {
    months.push(localeData.monthsShort(value.month(i)));
  }
  return months;
};

const getYears = (value: Dayjs) => {
  const year = value.year();
  const years = [];
  for (let i = year - 10; i < year + 10; i += 1) {
    years.push(i);
  }
  return years;
};

function handleNow(){
  currentTime.value=dayjs()
}

function handleChangeTime(time){
  console.log("this is now",time);
}

function handleToday(){
  currentDate.value=dayjs()
}

function handleChangeMonth(selectedMonth:number){
  currentDate.value=currentDate.value.month(parseInt(String(selectedMonth), 10));
}

function handleChangeYear(newYear:number){
  currentDate.value =currentDate.value.year(+newYear);
}

watch([currentTime,currentDate],handleChange)


function handleChange(){
  console.log("this is change");
  const time=currentTime.value ? currentTime.value.format('HH:mm:ss') : null
  emit('change',currentDate.value.format('YYYY-MM-DD'),time)
}


</script>

<style lang="less">
  .mahdaad-date-picker{
   @apply flex;

    .ant-picker-calendar .ant-picker-panel .ant-picker-month-panel, :where(.css-dev-only-do-not-override-19iuou).ant-picker-calendar .ant-picker-panel .ant-picker-date-panel{
      width: unset;
    }

    .calendar-body,.time-body,.ant-picker-time-panel{
      @apply h-68;
    }

    .calendar{
      @apply flex flex-col;
      border-inline-end: 1px solid @gray-2 ;
    }
    .time-title{
      @apply h-10 flex items-center justify-center mt-body text-gray-8;
      border-bottom: 1px solid @gray-2;
    }

    .calendar-footer,.time-footer{
      @apply h-10 flex items-center justify-center text-primary-5;
      border-top: 1px solid @gray-2;
    }
    .ant-picker-calendar-header{
      display: none;
    }

    .ant-picker-calendar .ant-picker-panel{
      border: unset;
    }
    .month-year-container{
      @apply flex items-center gap-4 h-10;
      border-bottom: 1px solid @gray-2;
    }

    .ant-picker-dropdown{
      position: static;
    }
    .ant-picker-footer{
      display: none;
    }

    .ant-picker-dropdown .ant-picker-panel-container{
      box-shadow: unset;
      border-radius:0
    }
  }
</style>


