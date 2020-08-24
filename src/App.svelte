<script>
  import { auth, googleProvider } from "./utils/firebase.js";
  import { authState } from "rxfire/auth";

  import SignIn from "./screens/SignIn.svelte";
  import ProjectList from "./screens/ProjectList.svelte";
  import TaskList from "./screens/TaskList.svelte";

  let user;
</script>

<style>
  .active {
    border-bottom: 2px solid red;
  }
</style>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://use.fontawesome.com/releases/v5.14.0/css/all.css"
    integrity="sha384-HzLeBuhoNPvSl5KYnjx0BT+WB0QEEqLprO+NBkkk5gbc67FTaL7XIGa2w1L0Xbgc"
    crossorigin="anonymous" />
</svelte:head>

{#if !user}
  <SignIn on:user={(event) => (user = event.detail)} />
{:else}
  {#await user then result}
    <ProjectList user={result} />
  {/await}
{/if}
