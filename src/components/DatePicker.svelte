<script>
  import moment from "moment";
  import { fly } from "svelte/transition";
  import { clickOutside } from "../utils/clickOutside.js";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let color = "orange";

  export let initDate = moment();

  let transitionState = 0;
  let transitionCounter = 0;
  function increment(state) {
    transitionState = state;
    transitionCounter++;
  }

  $: selectedDate = initDate;
  $: colIndex = moment(selectedDate).startOf("month").day();
  let calGrid = new Array(42);

  $: for (var i = -colIndex; i < calGrid.length - colIndex; i++) {
    calGrid[i + colIndex] = moment(selectedDate)
      .startOf("month")
      .add(i, "days");
  }

  function changeDate(date) {
    selectedDate = date;
    dispatch("changeDate", date);
  }
</script>

<section
  class="rounded-t-lg bg-{color}-100 pt-2 pb-10"
  use:clickOutside
  on:click_outside={() => dispatch('close', selectedDate)}>
  <div
    class="flex items-center justify-between mt-6 mb-6 mx-10 text-{color}-600">
    <i
      class="fas fa-chevron-left fa-2x cursor-pointer"
      on:click={() => {
        changeDate(selectedDate.subtract(1, 'months'));
        increment(-1);
      }} />
    <div class="flex flex-col items-center justify-center align-middle">
      <span class="text-lg text-{color}-500">
        {selectedDate.format('YYYY')}
      </span>
      <span class="text-3xl">{selectedDate.format('MMMM')}</span>

    </div>

    <i
      class="fas fa-chevron-right fa-2x cursor-pointer"
      on:click={() => {
        changeDate(selectedDate.add(1, 'months'));
        increment(1);
      }} />
  </div>

  {#each [transitionCounter] as count (count)}
    <div
      in:fly={{ x: 50 * transitionState }}
      class="grid grid-cols-7 gap-4 mx-8">
      <span class="text-center mb-2">Sun</span>
      <span class="text-center mb-2">Mon</span>
      <span class="text-center mb-2">Tue</span>
      <span class="text-center mb-2">Wed</span>
      <span class="text-center mb-2">Thu</span>
      <span class="text-center mb-2">Fri</span>
      <span class="text-center mb-2">Sat</span>
      {#each calGrid as date}
        <span
          class="test rounded-full flex items-center justify-center
          cursor-pointer {selectedDate.isSame(date, 'day') ? `bg-${color}-600 text-${color}-100` : ``}
          {selectedDate.isSame(date, 'month') ? '' : 'text-gray-500'}"
          on:click={() => {
            changeDate(date);
          }}>
          {moment(date).format('D')}
        </span>
      {/each}
    </div>
  {/each}
</section>
