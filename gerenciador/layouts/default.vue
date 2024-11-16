<script setup>
useHead({
  title: 'Gerenciador',
})
</script>

<template>
  <div class="layout">
    <header>
      <h1>Gerenciador de funcionarios</h1>
    </header>

    <main>
      <slot />
    </main>

  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: whitesmoke;
  color: #333;
}

header {
  width: 100%;
  text-align: center;
  padding: 20px;
  background-color: #4c02b2;
  color: white;
}

main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
}
</style>