<script setup>
import { useGetProfissoes } from '~/services/profissaoService';
import { useCreatePessoa } from '~/services/pessoasService'; 

const form = ref({
    nome: null,
    profissao_id: null
})
const res = await useGetProfissoes();
const profissaoOptions = ref([]);

profissaoOptions.value = res

const createPessoa = async () => {
  try {
    if (!form.value.nome || !form.value.profissao_id) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const novaPessoa = {
      nome: form.value.nome,
      profissao_id: form.value.profissao_id,
    }

    await useCreatePessoa({body: novaPessoa});
    alert('Pessoa criada com sucesso!');
    form.nome = null;
    form.profissao_id = null;
  } catch (error) {
    console.error('Erro ao criar pessoa:', error);
    alert('Erro ao criar pessoa. Tente novamente.');
  }
};
</script>

<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh;">
    <v-card elevation="3" max-width="500">
      <v-card-title>
        <span class="text-h6">Criar Nova Pessoa</span>
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="createPessoa">
          <v-text-field
            v-model="form.nome"
            label="Nome"
            required
            outlined
          />
          
          <v-select
            v-model="form.profissao_id"
            :items="profissaoOptions"
            item-title="descricao"
            item-value="id"
            label="Profissão"
            required
            outlined
          />
          <v-card-actions>
            <v-btn text to="/">Voltar</v-btn>
            <v-btn color="primary" type="submit" >Salvar</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>

      
    </v-card>
  </v-container>
</template>

<style scoped>
/* Adicione estilos personalizados, se necessário */
</style>
