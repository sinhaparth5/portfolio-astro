<script>
    export let start = { x: 0, y: 0 };
    export let end = { x: 0, y: 0 }
</script>

<svg class="connection">
    <line
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke="black"
        stroke-width="2"
    />
</svg>

<style>
  .connection {
    position: absolute;
    pointer-events: none;
    top: 0;
    left: 0;
  }
</style>