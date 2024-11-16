const baseUrl = process.env.API_BASE_URL || 'http://localhost:3000';

export function useApi(path, options ) {
  console.log(`Calling: ${baseUrl}/${path}`, options);

  return useFetch(`${baseUrl}/${path}`, {
    ...options,
  })
}