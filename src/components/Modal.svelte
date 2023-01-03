<script lang="ts">
  import { X } from 'lucide-svelte';
  import { isImprintModalOpen } from '../stores/ModalStore';
  import { fade, scale } from 'svelte/transition';
  export let title: string;
  export let condition: boolean;

  function closeModal() {
    isImprintModalOpen.set(false);
  }
</script>

{#if condition}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="flex w-full h-full bg-neutral-900 bg-opacity-80 fixed items-center box-border justify-center z-40 px-5"
    transition:fade={{ duration: 350 }}
  >
    <div
      class="relative box-border bg-neutral-800 max-w-2xl mx-h-full w-full h-min px-20 py-10 rounded-md"
      transition:scale={{ duration: 350 }}
    >
      <div on:click={() => closeModal()}>
        <X
          class="absolute top-0 right-0 mt-5 mr-5 cursor-pointer"
          size={32}
          color="#fff"
        />
      </div>
      <p class=" text-white text-3xl text-center font-bold">{title}</p>
      <slot />
    </div>
  </div>
{/if}
