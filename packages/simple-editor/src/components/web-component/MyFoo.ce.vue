<script setup lang="ts">
//import { Icon } from '@iconify/vue'
import {Select,SelectOption} from 'ant-design-vue'
import { ref } from 'vue'
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectPortal,
  SelectRoot,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'radix-vue'

const fruit = ref()

function handleClick() {
  alert('hello!')
}

const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']
const vegetables = ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek']
const refContainer=ref()
function con(){
  console.log("999999999999",refContainer.value)
  return refContainer.value
  //return  document.getElementById('temp123')
}

</script>

<template>
  <div style="width: 350px;height: 120px">
    <button>1111</button>
    <SelectRoot v-model="fruit" >
      <SelectTrigger
          as="div"
          class=""
      >
        <SelectValue placeholder="Select a fruit..." />
        1
        <!--      <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />-->
      </SelectTrigger>

      <!--  to=".blocksuite-portal"  -->
      <SelectPortal :forceMount="true" :disabled="false">
        <!--      position="popper"-->
        <SelectContent
            :bodyLock="false"
        >
          <SelectScrollUpButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            <!--          <Icon icon="radix-icons:chevron-up" />-->
            2
          </SelectScrollUpButton>

          <SelectViewport class="p-[5px]">
            <!--          <SelectLabel class="px-[25px] text-xs leading-[25px] text-mauve11">
                        Fruits
                      </SelectLabel>-->
            <SelectGroup>
              <SelectItem
                  v-for="(option, index) in options"
                  :key="index"
                  class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1"
                  :value="option"
              >
                <SelectItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <!--                <Icon icon="radix-icons:check" />-->
                </SelectItemIndicator>
                <SelectItemText>
                  {{ option }}
                </SelectItemText>
              </SelectItem>
            </SelectGroup>
          </SelectViewport>

          <!--        <SelectScrollDownButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
          &lt;!&ndash;          <Icon icon="radix-icons:chevron-down" />&ndash;&gt;
                  </SelectScrollDownButton>-->
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </div>
</template>

<!--<template>
  <div>
    <Select
        ref="select"
        style="width: 120px"
        :getPopupContainer="con"
        :open="true"
    >
      <SelectOption value="jack">Jack</SelectOption>
      <SelectOption value="jack1">Jack</SelectOption>
      <SelectOption value="jack2">Jack</SelectOption>
      <SelectOption value="jack3">Jack</SelectOption>
    </Select>
    <div ref="refContainer"></div>
  </div>
</template>-->
