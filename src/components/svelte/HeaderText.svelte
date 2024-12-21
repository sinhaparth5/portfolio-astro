<script lang="ts">
    export let title: string = '';
    export let width: string = '';
</script>

<div class="h-[60px] flex justify-center items-center relative mb-8" style="width: {width};">

    <!-- Underlying Gradient Div-->
    <div class="absolute blur w-full h-full inset-0 rounded-lg bg-gradient-to-br from-pink-500 via-cyan-500 to-violet-500"></div>

    <!-- Our Main Div --- We use relative here so it shows above the gradient div-->
    <div class="relative w-[96%] h-[96%] bg-black rounded-lg p-4 flex justify-center items-center">
        <h1 class="text-4xl font-bold text-white dm-sans-bold">{title}</h1>
    </div>

</div>