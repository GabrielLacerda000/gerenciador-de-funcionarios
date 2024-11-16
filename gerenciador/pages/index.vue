<script setup>
import { useGetProfissoes } from '~/services/profissaoService';
import { useDeletePessoa, useGetPessoas, useUpdatePessoa } from '~/services/pessoasService';
import { useRouter } from 'vue-router';
const router = useRouter()

const funcionarios = ref([]);
const profissaoOptions = ref([]);
const isEditModalOpen = ref(false); 
const editForm = ref({ id: null, nome: '', profissao_id: null });

const res = await useGetProfissoes()
profissaoOptions.value = res

const pessoas = await useGetPessoas();
funcionarios.value = pessoas

const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Nome', value: 'nome' },
  { title: 'Profissão', value: 'Profissao.descricao' },
  { title: 'Ações', value: 'actions', sortable: false },
];

function editPessoa(item) {
  editForm.value = { ...item };
  isEditModalOpen.value = true; 
}

async function savePessoa() {
  try {
    const edicaoPessoa = {
      nome: editForm.value.nome,
      profissao_id: editForm.value.profissao_id,
    }

    await useUpdatePessoa(editForm.value.id, {body: edicaoPessoa})
    location.reload()
    isEditModalOpen.value = false; 
    alert('Pessoa atualizada com sucesso!');
  } catch (error) {
    console.error('Erro ao atualizar pessoa:', error);
    alert('Erro ao atualizar pessoa. Tente novamente.');
  }
}

async function deletePessoa(id) {
  try {
    await useDeletePessoa(id)
    funcionarios.value = funcionarios.value.filter(pessoa => pessoa.id !== id);
  } catch (err) {
    alert('Erro ao deletar pessoa', err)
  }
}

</script>

<template>
    <v-container>
      <v-card>
        <v-card-title class="d-flex justify-space-between align-center">
          <h2>Lista de Pessoas</h2>
          <v-btn to="/pessoa/create">Criar pessoa</v-btn>
        </v-card-title>
        <v-data-table
          :items="funcionarios"
          :headers="headers"
          class="elevation-1"
          item-value="id"
        >
          <template #item.actions="{ item }">
            <v-btn icon @click="editPessoa(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="deletePessoa(item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>

       <!-- Modal de Edição -->
    <v-dialog v-model="isEditModalOpen" max-width="500">
      <v-card>
        <v-card-title>
          <span class="text-h6">Editar Pessoa</span>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="savePessoa">
            <v-text-field
              v-model="editForm.nome"
              label="Nome"
              required
              outlined
            />
            <v-select
              v-model="editForm.profissao_id"
              :items="profissaoOptions"
              item-title="descricao"
              item-value="id"
              label="Profissão"
              required
              outlined
            />
            <v-card-actions>
              <v-btn type="submit" color="primary">Salvar</v-btn>
              <v-btn text @click="isEditModalOpen = false">Cancelar</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
    </v-container>
  </template>