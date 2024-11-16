export async function useGetProfissoes() {
    const { data, error } = await useFetch('http://localhost:3000/profissoes');
    if (error.value) {
      console.error('Erro ao buscar profissoes:', error.value);
      return null;
    }
    return data.value;
    // return useFetch('http://localhost:3000/profissoes')
  }