<script>
  import Layer from './Layer.svelte';
  import Connection from './Connection.svelte';

  // Define layers with their neuron counts and active neurons
  let inputLayer = { neuronCount: 3, activeNeurons: [0, 1] };
  let hiddenLayer = { neuronCount: 4, activeNeurons: [2] };
  let outputLayer = { neuronCount: 2, activeNeurons: [1] };

  // Store the positions of neurons to calculate connections
  let inputPositions = [];
  let hiddenPositions = [];
  let outputPositions = [];
</script>

<div class="network">
  <!-- Input Layer -->
  <Layer
    neuronCount={inputLayer.neuronCount}
    activeNeurons={inputLayer.activeNeurons}
    bind:positions={inputPositions}
  />
  <!-- Connections between Input and Hidden Layer -->
  {#each inputPositions as inputPos, i}
    {#each hiddenPositions as hiddenPos, j}
      <Connection start={inputPos} end={hiddenPos} />
    {/each}
  {/each}

  <!-- Hidden Layer -->
  <Layer
    neuronCount={hiddenLayer.neuronCount}
    activeNeurons={hiddenLayer.activeNeurons}
    bind:positions={hiddenPositions}
  />
  <!-- Connections between Hidden and Output Layer -->
  {#each hiddenPositions as hiddenPos, i}
    {#each outputPositions as outputPos, j}
      <Connection start={hiddenPos} end={outputPos} />
    {/each}
  {/each}

  <!-- Output Layer -->
  <Layer
    neuronCount={outputLayer.neuronCount}
    activeNeurons={outputLayer.activeNeurons}
    bind:positions={outputPositions}
  />
</div>

<style>
  .network {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
    position: relative;
  }
</style>
