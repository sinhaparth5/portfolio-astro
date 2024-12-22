<script lang="ts">
    export let title: string = '';
</script>

<div class={`psHeaderTextContainer`}>

    <!-- Underlying Gradient Div-->
    <div class="psHeaderTextGradient"></div>

    <!-- Our Main Div --- We use relative here so it shows above the gradient div-->
    <div class="psHeaderTextMainDiv">
        <h1 class="psHeaderText">{title}</h1>
    </div>

</div>