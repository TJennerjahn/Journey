<script>
  import { fly } from "svelte/transition";
  import { db } from "../utils/firebase";
  import { collectionData } from "rxfire/firestore";
  import { startWith } from "rxjs/operators";
  import { projects } from "../utils/stores.js";

  import TaskList from "./TaskList.svelte";

  let current = "projects";

  let currentProject;
  let projectId = -1;
  export let user;

  let projectsRef = db.collection("projects");
  let query = projectsRef.where("color", "==", "orange");
  query.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      let result = [];
      result.push({
        id: doc.id,
        ...doc.data(),
      });
      projects.set(result);
    });
  });
</script>

{#if $projects}
  <!-- Header -->
  <!-- Profile Section -->
  <div class="flex items-center justify-end">
    <!-- Account Picture -->
    <div
      class="m-6"
      on:click={() => {
        console.log(user);
      }}>
      <img
        src={user.photoURL}
        alt=""
        class="rounded-full h-10 w-10 flex items-center justify-center" />
    </div>
  </div>

  {#if projectId === -1}
    <div in:fly={{ x: -250, duration: 500 }}>
      <!-- Content Headline -->
      <div class="mx-8 text-2xl font-bold mb-8">
        <h1>Hey {user.displayName.split(' ')[0]},</h1>
        <h1>this is your to-do list.</h1>
      </div>

      <!-- Timeline Selector -->
      <div class="flex m-4 justify-evenly">
        <div class="active">
          <h1 class="p-2">Today</h1>
        </div>
        <div class="p-2">
          <h1>Week</h1>
        </div>
        <div class="p-2">
          <h1>Month</h1>
        </div>
      </div>

      <!-- Main Content -->
      <div class="mx-6">

        <!-- Card Grid -->
        <div
          class="grid grid-cols-2 gap-8 mb-2"
          style="grid-auto-rows: 1fr; grid-template-columns: repeat(2, 1fr)">
          {#each $projects as project, i}
            <div
              class="card shadow-md rounded flex flex-col justify-center
              items-left border-l-4 border-{project.color}-400"
              on:click={() => {
                projectId = project.id;
                currentProject = $projects.find((project) => project.id == projectId);
              }}>
              <i class="{project.icon} mx-8 my-8 text-{project.color}-500" />
              <h1 class="font-bold ml-8">{project.title}</h1>
              <p class="ml-8 mb-8">{project.tasks.length} Tasks</p>
            </div>
          {/each}
          <!-- Add Project -->
          <button
            class="bg-green-400 text-white text-center align-middle py-2 rounded
            w-1/2">
            <i class="fas fa-plus fa-2x" />
          </button>
        </div>

      </div>
    </div>
  {:else}
    <div class="mx-8" in:fly={{ x: 250, duration: 500 }}>
      <TaskList project={currentProject} />
    </div>
  {/if}
{/if}
