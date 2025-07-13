<script setup lang="ts">
import { computed } from 'vue'

interface Option {
  id: number
  name: string
  slug: string
}

interface Props {
  modelValue: string
  options: Option[]
  placeholder?: string
  label?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const selectedOption = computed(() => {
  return props.options.find((option) => option.slug === props.modelValue)
})

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="relative w-full">
    <select
      :value="modelValue"
      @change="handleChange"
      :disabled="disabled"
      class="bg-[#161616] focus:outline-none focus:ring-0 text-gray-200 border-none rounded-xl px-4 py-3 pr-10 w-full min-w-[200px] appearance-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
    >
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option v-for="option in options" :key="option.id" :value="option.slug">
        {{ option.name }}
      </option>
    </select>
    <div class="pointer-events-none absolute inset-y-0 right-3 flex items-center">
      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.custom-dropdown {
  background-color: #232323;
  color: #e0e0e0;
  border: none;
  border-radius: 10px;
  padding: 12px 40px 12px 16px;
  font-size: 1rem;
  appearance: none;
  width: 100%;
  min-width: 200px;
  cursor: pointer;
  outline: none;
  box-shadow: none;
}
.custom-dropdown:focus {
  border: 1px solid #ffc107;
  box-shadow: 0 0 0 2px #ffc10733;
}
.custom-dropdown:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.custom-dropdown option {
  background: #232323;
  color: #e0e0e0;
}
.dropdown-arrow {
  position: absolute;
  right: 12px;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  pointer-events: none;
}
.dropdown-arrow svg {
  color: #bdbdbd;
}
</style>
