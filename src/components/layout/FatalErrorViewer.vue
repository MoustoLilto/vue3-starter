<template>
    <div v-if="errorStrore.fatalError" class="flex flex-col items-center justify-center">
        <h1 class="font-bold">({{ errorStrore.fatalError.title }})</h1>
        <div class="text-deca">
            {{ errorStrore.fatalError.message }}
        </div>

        <button
            v-if="errorStrore.fatalError.solution"
            class="btn-secondary mt-2.5"
            @click="errorStrore.fatalError!.solution!.action()"
        >
            {{ errorStrore.fatalError.solution.title }}
        </button>
    </div>
</template>

<script setup lang="ts">
const errorStrore = useErrorStore();
</script>
