<script>
  import moment from "moment";
  import { fly, fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let project;
  export let editTask;

  let seconds = 0;
  let isWorking = false;
</script>

<div
  class="bg-{project.color}-600 fixed w-full h-full bottom-0 left-0"
  transition:fly={{ y: 500, duration: 500 }}>
  <div class="m-6">
    <div on:click={() => dispatch('close')}>
      <i class="fas fa-chevron-left text-{project.color}-100" />
    </div>
    <h1 class="mt-4 text-4xl text-{project.color}-100">{editTask.title}</h1>
    <div class="flex flex-col mt-12">

      <!-- Date Picker -->
      {#if editTask.hasDeadline}
        <div class="flex text-{project.color}-100 items-center mb-4">
          <i
            class="far fa-calendar fa-1x mr-4 p-4 bg-{project.color}-500
            rounded-md" />
          <span class="text-2xl">
            {moment(editTask.deadline).format('DD.MM.YYYY')}
          </span>
        </div>
      {/if}

      <!-- Time Picker -->
      <div class="flex text-{project.color}-100 items-center mb-4">
        <i
          class="far fa-clock fa-1x mr-4 p-4 bg-{project.color}-500 rounded-md" />
        <span class="text-2xl">1:00 pm - 3:30 pm</span>
      </div>

      <!-- Remind Me? -->
      <div class="flex text-{project.color}-100 items-center mb-4">
        <i
          class="far fa-bell fa-1x mr-4 p-4 bg-{project.color}-500 rounded-md" />
        <span class="text-2xl">Remind me</span>
      </div>

    </div>
  </div>

  <div
    class="absolute bottom-0 left-0 right-0 mx-8 my-10 flex content-center
    justify-center">
    <div
      class="w-full mx-8 py-2 px-8 rounded-md bg-{project.color}-500 border-b-4
      border-{project.color}-700"
      on:click={() => {
        isWorking = !isWorking;
        seconds = 0;
      }}>
      {#if !isWorking}
        <h1 class="text-center text-{project.color}-100 text-2xl" in:fade>
          Start Working!
        </h1>
      {:else}
        <h1 class="text-center text-{project.color}-100 text-2xl" in:fade>
          00:00:{seconds}
        </h1>
      {/if}
    </div>

  </div>
</div>
