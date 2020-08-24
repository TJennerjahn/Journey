<script>
  import CreateTask from "./CreateTask.svelte";
  import Task from "./Task.svelte";
  import { createEventDispatcher } from "svelte";
  import { crossfade, fly, slide, fade } from "svelte/transition";
  import { flip } from "svelte/animate";
  import moment from "moment";
  import { projects } from "../utils/stores";

  export let project;
  console.log("TaskList", project, project.tasks);

  const dispatch = createEventDispatcher();

  let editTask = -1;

  let isWorking = false;
  let seconds = 0;

  const [send, receive] = crossfade({
    duration: (d) => Math.sqrt(d * 200),
  });

  let createNewTask = false;

  function handleTaskClick(task) {
    editTask = task;
  }

  function handleCreateTask(event) {
    console.log("Creating Task");
    console.log(event.detail);
    project.tasks = [...project.tasks, event.detail];
    createNewTask = false;
  }
</script>

<style>

</style>

<section>
  <!-- Header -->
  <div>
    <div class="flex gap-4 items-center">
      <!-- Project Icon -->
      <div>
        <i class="{project.icon} text-{project.color}-500" />
      </div>

      <!-- Project Title -->
      <div>
        <h1 class="text-xl font-bold text-gray-800">{project.title}</h1>
      </div>
    </div>
    <!-- Task Count -->
    <div class="ml-10 text-gray-700">
      <p>{project.tasks.length > 0 ? `${project.tasks.length} tasks` : ''}</p>
    </div>
  </div>

  <!-- Task List -->
  <div class="mt-12">

    <div class="flex justify-end">
      <div
        class="border-2 border-{project.color}-600 bg-white hover:bg-{project.color}-600
        active:bg-{project.color}-700 px-2 py-1 rounded-md text-{project.color}-600
        hover:text-{project.color}-100 active:text-{project.color}-100
        transition-all ease-in duration-100"
        on:click={() => (createNewTask = true)}>
        <span class="">+ Add Task</span>
      </div>
    </div>
    {#each project.tasks.filter((task) => task.complete === false) as task (task.id)}
      <div
        class="rounded-lg border-{project.color}-600 border-2 bg-{project.color}-600
        py-2 my-2"
        in:receive={{ key: task.id, duration: 500 }}
        out:send={{ key: task.id, duration: 500 }}
        animate:flip={{ duration: 500 }}
        on:click={handleTaskClick(task)}>
        <div class="flex cursor-pointer items-center content-center">
          <button
            class="rounded-full h-3 w-3 items-center justify-center ml-2 mr-4
            transition duration-200 bg-white ease-in-out" />

          <div class="flex flex-col">
            <p class="text-{project.color}-100">{task.title}</p>
            <div class="flex">
              {#if task.hasDeadline === true}
                <div
                  class="bg-{project.color}-100 py-1 px-2 rounded-md text-{project.color}-600
                  text-xs w-auto mt-1 flex items-center">
                  <i class="far fa-calendar pr-1" />
                  {moment(task.deadline).format('DD. MMM')}
                </div>
              {/if}
            </div>
          </div>
        </div>

      </div>
    {/each}

    <h1 class="text-gray-700 mb-4 mt-12">Done</h1>
    {#each project.tasks.filter((task) => task.complete === true) as task (task.id)}
      <div
        class="flex py-4 my-2 items-center cursor-pointer rounded-lg border-{project.color}-600
        border-2 bg-{project.color}-100"
        in:receive={{ key: task.id, duration: 500 }}
        out:send={{ key: task.id, duration: 500 }}
        animate:flip={{ duration: 500 }}
        on:click={handleTaskClick(task)}>

        <button
          class="rounded-full h-3 w-3 flex items-center justify-center mx-2
          transition duration-200 bg-white ease-in-out active:bg-${project.color}-600
          {task.done === false ? '' : `bg-${project.color}-600`}" />
        <p class="text-gray-600 line-through">{task.title}</p>
      </div>
    {/each}

  </div>
  <!-- Footer / Add Task -->
</section>

{#if editTask !== -1}
  <Task {editTask} {project} on:close={() => (editTask = -1)} />
{/if}

{#if createNewTask === true}
  <CreateTask
    {project}
    on:close={() => (createNewTask = false)}
    on:createTask={handleCreateTask} />
{/if}
