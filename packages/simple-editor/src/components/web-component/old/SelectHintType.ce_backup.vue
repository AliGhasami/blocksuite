<template>
  <div>
    <span>
      <SelectRoot v-model="val">
        <SelectTrigger as="div" class="SelectTrigger" aria-label="Customise options">
          <SelectValue placeholder="Select a fruit..." />
          <!--        <Icon icon="radix-icons:chevron-down" />-->
        </SelectTrigger>
        <SelectPortal :forceMount="true" :disabled="true">
          <!--        position="popper"-->
          <SelectContent position="popper" class="SelectContent" :bodyLock="false">
            <SelectScrollUpButton class="SelectScrollButton">
              <!--            <Icon icon="radix-icons:chevron-up" />-->
            </SelectScrollUpButton>

            <SelectViewport class="SelectViewport">
              <!--            <SelectLabel class="SelectLabel">
              Fruits 111
            </SelectLabel>-->
              <SelectGroup>
                <SelectItem
                  v-for="(option, index) in options"
                  :key="index"
                  class="SelectItem"
                  :value="option.value"
                >
                  <SelectItemIndicator class="SelectItemIndicator">
                    <!--                  <Icon icon="radix-icons:check" />-->
                  </SelectItemIndicator>
                  <SelectItemText>
                    {{ option.label }}
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
import { ref, watch } from 'vue'
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
  SelectViewport
} from 'radix-vue'

interface Props {
  type?: string
}
const emits = defineEmits<{
  (e: 'change', val: string): void
  (e: 'update:value', val: string): void
}>()
const props = withDefaults(defineProps<Props>(), {})
const val = ref()
watch(
  () => props.type,
  () => {
    if (props.type) val.value = props.type
    //emits('change',val.value)
  },
  { immediate: true }
)

watch(val, () => {
  emits('update:value', val.value)
  emits('change', val.value)
})

//'Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'
const options = [
  { label: 'Success', icon: '', value: 'success' },
  { label: 'Danger', icon: '', value: 'error' },
  { label: 'Warning', icon: '', value: 'warning' },
  { label: 'Info', icon: '', value: 'info' },
  { label: 'Hint', icon: '', value: 'default' }
]
//const vegetables = ['Aubergine', 'Broccoli', 'Carrot', 'Courgette', 'Leek']
</script>

<style lang="less">
@import '../css/override';
/* TODO Ali Ghasami for fix variable and convert to token   **/
.SelectTrigger {
  cursor: pointer;
  height: 24px;
  padding: 0 @space-4;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: @space-2;
}

.SelectItem {
  cursor: pointer;
}

div[data-radix-popper-content-wrapper] {
  @apply bg-white shadow-floated;
  padding: @space-3;
  border-radius: @roundness-3;
}
</style>
