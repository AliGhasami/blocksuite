<template>
  <div>
    <span>
       <SelectRoot v-model="fruit"  v-if="true" >
      <SelectTrigger
          as="div"
          class="SelectTrigger"
          aria-label="Customise options"
      >
        <SelectValue placeholder="Select a fruit..." />
        <!--        <Icon icon="radix-icons:chevron-down" />-->
      </SelectTrigger>

      <SelectPortal :forceMount="true" :disabled="true">
<!--        position="popper"-->
        <SelectContent
            position="popper"
            class="SelectContent"
            :bodyLock="false"
        >
          <SelectScrollUpButton class="SelectScrollButton">
<!--            <Icon icon="radix-icons:chevron-up" />-->
          </SelectScrollUpButton>

          <SelectViewport class="SelectViewport">
            <SelectLabel class="SelectLabel">
              Fruits
            </SelectLabel>
            <SelectGroup>
              <SelectItem
                  v-for="(option, index) in options"
                  :key="index"
                  class="SelectItem"
                  :value="option"
              >
                <SelectItemIndicator class="SelectItemIndicator">
<!--                  <Icon icon="radix-icons:check" />-->
                </SelectItemIndicator>
                <SelectItemText>
                  {{ option }}
                </SelectItemText>
              </SelectItem>
            </SelectGroup>
            <SelectSeparator class="SelectSeparator" />
            <SelectLabel class="SelectLabel">
              Vegetables
            </SelectLabel>
            <SelectGroup>
              <SelectItem
                  v-for="(option, index) in vegetables"
                  :key="index"
                  class="SelectItem"
                  :value="option"
                  :disabled="option === 'Courgette'"
              >
                <SelectItemIndicator class="SelectItemIndicator">
<!--                  <Icon icon="radix-icons:check" />-->
                </SelectItemIndicator>
                <SelectItemText>
                  {{ option }}
                </SelectItemText>
              </SelectItem>
            </SelectGroup>
          </SelectViewport>
          <SelectScrollDownButton class="SelectScrollButton">
<!--            <Icon icon="radix-icons:chevron-down" />-->
          </SelectScrollDownButton>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
    </span>
  </div>
</template>
<script setup lang="ts">
//import { Icon } from '@iconify/vue'
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
//import './styles.css'

const fruit = ref()

const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple']
const vegetables = ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek']
</script>

<style>
/**{
  background-color: red;
}*/
</style>

<!--<template>
  <div style="width: 350px;height: 120px">
    <button>1111</button>
    <SelectRoot v-model="fruit" >
      <SelectTrigger
          as="div"
          class=""
      >
        <SelectValue placeholder="Select a fruit..." />
        1
        &lt;!&ndash;      <Icon icon="radix-icons:chevron-down" class="h-3.5 w-3.5" />&ndash;&gt;
      </SelectTrigger>

      &lt;!&ndash;  to=".blocksuite-portal"  &ndash;&gt;
      <SelectPortal :forceMount="true" :disabled="false">
        &lt;!&ndash;      position="popper"&ndash;&gt;
        <SelectContent
            position="popper"
            :bodyLock="false"
        >
          <SelectScrollUpButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            &lt;!&ndash;          <Icon icon="radix-icons:chevron-up" />&ndash;&gt;
            2
          </SelectScrollUpButton>

          <SelectViewport class="p-[5px]">
            &lt;!&ndash;          <SelectLabel class="px-[25px] text-xs leading-[25px] text-mauve11">
                        Fruits
                      </SelectLabel>&ndash;&gt;
            <SelectGroup>
              <SelectItem
                  v-for="(option, index) in options"
                  :key="index"
                  class="text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1"
                  :value="option"
              >
                <SelectItemIndicator class="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  &lt;!&ndash;                <Icon icon="radix-icons:check" />&ndash;&gt;
                </SelectItemIndicator>
                <SelectItemText>
                  {{ option }}
                </SelectItemText>
              </SelectItem>
            </SelectGroup>
          </SelectViewport>

          &lt;!&ndash;        <SelectScrollDownButton class="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
          &lt;!&ndash;          <Icon icon="radix-icons:chevron-down" />&ndash;&gt;
                  </SelectScrollDownButton>&ndash;&gt;
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </div>
</template>-->

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
