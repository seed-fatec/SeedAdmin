<!-- components/TeacherForm.vue -->
<script setup lang="ts">
import { ref } from "vue";
import router from '~/router'

const goBack = () => {
  router.back()
}

const props = defineProps<{
  modelValue: {
    name: string;
    email: string;
    password: string;
  };
  isEdit?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: typeof props.modelValue): void;
  (e: "submit"): void;
}>();

const confirmPassword = ref("");

// Atualizar campos individuais
const updateField = (key: keyof typeof props.modelValue, value: string) => {
  emit("update:modelValue", { ...props.modelValue, [key]: value });
};

const handleSubmit = () => {
  if (!props.isEdit && props.modelValue.password !== confirmPassword.value) {
    alert("As senhas não coincidem.");
    return;
  }

  emit("submit");
};
</script>

<template>
  <div class="w-full h-full flex flex-col p-2 pl-10">
    <div class="cursor-pointer w-fit" @click="goBack">
      <Icon
        icon="mdi:arrow-left"
        class="w-10 h-10 hover:scale-110 transition-transform"
      />
    </div>

    <!-- Título -->
    <div class="w-full flex p-4 pl-6 justify-between items-center">
      <h1 class="text-4xl font-semibold">Professores</h1>
    </div>
    <form
      class="flex items-center justify-between"
      @submit.prevent="handleSubmit"
    >
      <!-- Formulário -->
      <div class="h-full w-full text-xl flex flex-col gap-y-8 pl-6">
        <div class="flex gap-x-6 flex-col">
          <label for="name">Nome</label>
          <input
            type="text"
            class="border rounded w-100 p-1"
            required
            :value="modelValue.name"
            @input="e => updateField('name', (e.target as HTMLInputElement).value)"
          />
        </div>

        <div class="flex gap-x-6 flex-col">
          <label for="email">Email</label>
          <input
            type="email"
            class="border rounded w-100 p-1"
            required
            :value="modelValue.email"
            @input="e => updateField('email', (e.target as HTMLInputElement).value)"
          />
        </div>

        <div class="flex gap-x-6 flex-col">
          <label for="password">Senha</label>
          <input
            type="password"
            class="border rounded w-100 p-1"
            :minlength="6"
            :required="!isEdit"
            :value="modelValue.password"
            @input="e => updateField('password', (e.target as HTMLInputElement).value)"
          />
        </div>

        <div v-if="!isEdit" class="flex gap-x-6 flex-col">
          <label for="confirmPassword">Confirmar senha</label>
          <input
            v-model="confirmPassword"
            type="password"
            class="border rounded w-100 p-1"
            required
          />
        </div>
      </div>

      <!-- Branding + Botão -->
      <div class="flex flex-col w-full gap-10 border-primary">
        <div class="red-600">
          <h1
            class="text-6xl font-bold text-primary justify-center flex gap-0.5"
          >
            Se<span class="text-white bg-primary px-1 rounded">ed</span>
            <span class="text-xl flex items-end"> Admin </span>
          </h1>
        </div>

        <div class="h-max text-xl w-full flex justify-center">
          <button
            type="submit"
            class="bg-primary rounded-lg p-3 w-full text-white cursor-pointer hover:scale-99 hover:bg-[#3f4ebf] transition-transform duration-200"
          >
            {{ isEdit ? "Atualizar" : "Registrar" }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
