// import type { UseFetchOptions } from "#app";

export async function useGetPessoas(options) {
    const { data, error } = await useApi('pessoas', { method: 'GET', ...options });
    if (error.value) {
      console.error('Erro ao buscar pessoas:', error.value);
      return null;
    }
    return data.value;
  }
  
  export async function useCreatePessoa(options) {
    const { data, error } = await useApi('pessoas', { method: 'POST', ...options });
    if (error.value) {
      console.error('Erro ao criar pessoa:', error.value);
      return null;
    }
    return data.value;
  }
  
  export async function useUpdatePessoa(id, options) {
    const { data, error } = await useApi(`pessoas/${id}`, { method: 'PUT', ...options });
    if (error.value) {
      console.error('Erro ao atualizar pessoa:', error.value);
      return null;
    }
    return data.value;
  }
  
  export async function useDeletePessoa(id, options) {
    const { data, error } = await useApi(`pessoas/${id}`, { method: 'DELETE', ...options });
    if (error.value) {
      console.error('Erro ao deletar pessoa:', error.value);
      return null;
    }
    return data.value;
  }
  