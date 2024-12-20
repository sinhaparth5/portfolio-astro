<script>
  import Neuron from './Neuron.svelte';
  import { onMount } from 'svelte';

  export let neuronCount = 3; // Default number of neurons
  export let activeNeurons = []; // Active neurons array
  export let positions = []; // Bind this to expose neuron positions

  // Store references to each neuron element
  let neuronRefs = [];

  // Update the positions of neurons
  function updatePositions() {
    positions = neuronRefs.map((ref) => {
      const rect = ref.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    });
  }

  // Ensure positions update on mount and window resize
  onMount(() => {
    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  });
</script>

<div class="layer">
  {#each Array(neuronCount) as _, i}
    <Neuron
      bind:this={neuronRefs[i]}
      active={activeNeurons.includes(i)}
    />
  {/each}
</div>

<style>
  .layer {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin: 10px 0;
  }
</style>
