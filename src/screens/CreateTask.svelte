<script>
  import { slide, fly } from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { v4 as uuidv4 } from "uuid";
  import { projects } from "../utils/stores";
  import moment from "moment";
  import DatePicker from "../components/DatePicker.svelte";
  import { db } from "../utils/firebase";
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";

  const dispatch = createEventDispatcher();
  export let project;

  export let uid;

  let datePicker = false;

  $: date = moment();

  let taskName;
  function createTask() {
    let task = {
      id: uuidv4(),
      title: taskName,
      done: false,
      hasDeadline: !moment(date).isSame(moment(), "day"),
      deadline: date,
    };

    db.collection("Todos").add({
      uid,
      title: task.title,
      complete: false,
      project: project.title,
      created: Date.now(),
    });

    dispatch("createTask", task);
  }

  let checked = false;
</script>

<section
  class="fixed w-full h-full bottom-0 left-0 bg-{project.color}-600"
  transition:fly={{ y: 500, duration: 500 }}>

  <div class="m-12 flex flex-col">
    <div>
      <i
        class="fas fa-chevron-left text-{project.color}-100 mb-4"
        on:click={() => dispatch('close')} />
    </div>
    <div class="text-{project.color}-100 text-4xl mb-3">
      <h1>Create</h1>
      <h1>New Task</h1>
    </div>
    <div class="mt-16">
      <input
        id="taskName"
        bind:value={taskName}
        type="text"
        placeholder="Task Name"
        class="w-full text-xl py-4 px-2 bg-{project.color}-600
        focus:outline-none border-b border-{project.color}-500 text-white
        placeholder-{project.color}-100 " />
    </div>
    <div class="mt-12">
      <!-- Date Picker -->
      <div
        class="cursor-pointer flex text-{project.color}-100 items-center
        justify-start border-{project.color}-500 border focus:outline-none p-4
        rounded-lg"
        on:click={() => {
          datePicker = !datePicker;
        }}>
        <i
          class="far fa-calendar fa-1x mr-4 p-4 bg-{project.color}-500
          rounded-md" />
        <span class="text-2xl">{date.format('DD.MM.YYYY')}</span>
      </div>
    </div>
    <div class="mt-2">
      <div
        class="border border-{project.color}-500 flex text-{project.color}-100
        items-center w-full p-4 rounded-lg">
        <i
          class="fas fa-paperclip fa-1x mr-4 p-4 bg-{project.color}-500
          rounded-md" />
        <p class="text-2xl w-full">Attach Media</p>
        <i class="fas fa-chevron-right" />
      </div>
    </div>
    <div class="mt-2">
      <div
        class="border border-{project.color}-500 flex text-{project.color}-100
        items-center w-full p-4 rounded-lg">
        <i
          class="far fa-bell fa-1x mr-4 p-4 bg-{project.color}-500 rounded-md" />
        <p class="text-2xl w-full">Remind Me</p>
      </div>
    </div>
  </div>

  <div
    class="absolute bottom-0 left-0 right-0 mb-6 flex justify-center
    items-center content-center">
    <div
      class="w-full mx-8 py-2 px-8 rounded-md bg-{project.color}-500 active:bg-{project.color}-700
      border-b-4 border-{project.color}-800"
      on:click={createTask}>
      <h1 class="text-center text-{project.color}-100 text-2xl">
        Create Task!
      </h1>
    </div>
  </div>

  {#if datePicker}
    <div class="absolute bottom-0 w-full" transition:slide>
      <DatePicker
        initDate={date}
        color={project.color}
        on:close={() => {
          datePicker = false;
        }}
        on:changeDate={(event) => {
          date = event.detail;
        }} />
    </div>
  {/if}

</section>
