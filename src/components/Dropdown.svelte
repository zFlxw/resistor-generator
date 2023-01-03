<script lang="ts">
  import { Color, getResistanceFromColors } from '../scripts/helper';
  import { resistance } from '../store/ResistanceStore';
  import {
    firstRingColor,
    secondRingColor,
    thirdRingColor,
  } from '../store/RingColorStore';
  import {
    firstRingDropdownOpen,
    secondRingDropdownOpen,
    thirdRingDropdownOpen,
  } from '../store/DropdownStore';

  export let ring: number;

  function handleClick(color: Color) {
    switch (ring) {
      case 0:
        firstRingColor.set(color.colorCode);
        firstRingDropdownOpen.set(false);
        break;
      case 1:
        secondRingColor.set(color.colorCode);
        secondRingDropdownOpen.set(false);
        break;
      case 2:
        thirdRingColor.set(color.colorCode);
        thirdRingDropdownOpen.set(false);
        break;
    }
  }

  function getRingValue(color: Color) {
    switch (ring) {
      case 0:
        return color.firstRing;
      case 1:
        return color.secondRing;
      case 2:
        return color.thirdRing;
    }
  }
</script>

<div
  class="absolute z-10 mt-2 w-56 h-56 overflow-auto scrollbar-thin scrollbar-thumb-neutral-800 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
  role="menu"
  aria-orientation="vertical"
  aria-labelledby="menu-button"
  tabindex="-1"
>
  <div class="py-1" role="none">
    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
    {#if getRingValue(Color.BK) !== -1}
      <button
        class="text-white block px-4 py-2 text-lg bg-black w-full"
        role="menuitem"
        tabindex="-1"
        on:click={() => handleClick(Color.BK)}>BK</button
      >
    {/if}
    {#if getRingValue(Color.BN) !== -1}
      <button
        class="text-white block px-4 py-2 text-lg bg-brown w-full"
        role="menuitem"
        tabindex="-1"
        on:click={() => handleClick(Color.BN)}>BN</button
      >
    {/if}
    {#if getRingValue(Color.RD) !== -1}
      <button
        class="text-white block px-4 py-2 text-lg bg-red-1000 w-full"
        role="menuitem"
        tabindex="-1"
        on:click={() => handleClick(Color.RD)}>RD</button
      >
    {/if}
    {#if getRingValue(Color.OG) !== -1}
      <button
        class="text-white block px-4 py-2 text-lg bg-orange-1000 w-full"
        role="menuitem"
        tabindex="-1"
        on:click={() => handleClick(Color.OG)}>OG</button
      >
    {/if}
    {#if getRingValue(Color.YE) !== -1}
      <button
        class="text-white block px-4 py-2 text-lg bg-yellow-1000 w-full"
        role="menuitem"
        tabindex="-1"
        on:click={() => handleClick(Color.YE)}>YE</button
      >
    {/if}
    {#if getRingValue(Color.GN) !== -1}
      <button
        class="text-white block px-4 py-2 text-lg bg-green-1000 w-full"
        role="menuitem"
        tabindex="-1"
        on:click={() => handleClick(Color.GN)}>GN</button
      >
    {/if}
    {#if getRingValue(Color.BU) !== -1}
      <button
        class="text-white block px-4 py-2 text-lg bg-blue-1000 w-full"
        role="menuitem"
        tabindex="-1"
        on:click={() => handleClick(Color.BU)}>BU</button
      >
    {/if}
    {#if getRingValue(Color.VT) !== -1}
      <button
        class="text-white block px-4 py-2 text-lg bg-violett-1000 w-full"
        role="menuitem"
        tabindex="-1"
        on:click={() => handleClick(Color.VT)}>VT</button
      >
    {/if}
    {#if getRingValue(Color.GY) !== -1}
      <button
        class="text-white block px-4 py-2 text-lg bg-gray-1000 w-full"
        role="menuitem"
        tabindex="-1"
        on:click={() => handleClick(Color.GY)}>GY</button
      >
    {/if}
    {#if getRingValue(Color.WH) !== -1}
      <button
        class="text-black block px-4 py-2 text-lg bg-white w-full"
        role="menuitem"
        tabindex="-1"
        on:click={() => handleClick(Color.WH)}>WH</button
      >
    {/if}
    {#if getRingValue(Color.GD) !== -1}
      <button
        class="text-black block px-4 py-2 text-lg bg-gold w-full"
        role="menuitem"
        tabindex="-1"
        on:click={() => handleClick(Color.GD)}>GD</button
      >
    {/if}
    {#if getRingValue(Color.SR) !== -1}
      <button
        class="text-black block px-4 py-2 text-lg bg-silver w-full"
        role="menuitem"
        tabindex="-1"
        on:click={() => handleClick(Color.SR)}>SR</button
      >
    {/if}
  </div>
</div>
