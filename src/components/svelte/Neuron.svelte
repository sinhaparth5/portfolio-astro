<script>
  import { onMount } from "svelte";

  export let active = false; // Whether the neuron is active
  export let position = { x: 0, y: 0 }; // Position of the neuron
  export let radius = 10; // Radius of the neuron circle
  let neuronEl;

  // Update the neuron's position
  function updatePosition() {
    const rect = neuronEl.getBoundingClientRect();
    position = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }

  onMount(() => {
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  });
</script>

<style>
  .neuron {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid white;
    transition: background-color 0.3s, transform 0.3s;
  }
  .neuron.active {
    background-color: #34d399; /* Green when active */
    transform: scale(1.2);
  }
</style>

<div
  bind:this={neuronEl}
  class="neuron {active ? 'active' : ''}"
  style="width: {radius * 2}px; height: {radius * 2}px;"
></div>
