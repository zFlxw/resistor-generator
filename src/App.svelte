<script lang="ts">
  import { Color, EReihe, getResistanceFromColors } from './scripts/helper';
  import Dropdown from './components/Dropdown.svelte';
  import { resistance } from './store/ResistanceStore';
  import {
    firstRingColor,
    secondRingColor,
    thirdRingColor,
  } from './store/RingColorStore';
  import {
    firstRingDropdownOpen,
    secondRingDropdownOpen,
    thirdRingDropdownOpen,
  } from './store/DropdownStore';

  let eReihen = [];

  function clearFields() {
    resistance.set('');
  }

  function toggleDropdown(ring: number): void {
    switch (ring) {
      case 0:
        firstRingDropdownOpen.set(!$firstRingDropdownOpen);
        secondRingDropdownOpen.set(false);
        thirdRingDropdownOpen.set(false);
        break;
      case 1:
        firstRingDropdownOpen.set(false);
        secondRingDropdownOpen.set(!$secondRingDropdownOpen);
        thirdRingDropdownOpen.set(false);
        break;
      case 2:
        firstRingDropdownOpen.set(false);
        secondRingDropdownOpen.set(false);
        thirdRingDropdownOpen.set(!$thirdRingDropdownOpen);
        break;
    }
  }

  function recalcResistance() {
    resistance.set(
      getResistanceFromColors(
        $firstRingColor,
        $secondRingColor,
        $thirdRingColor,
      ),
    );
  }

  $: {
    eReihen = EReihe.partOf(
      +$resistance % 100 > 0 ? +$resistance % 100 : (+$resistance % 100) + 1,
    );

    if ($resistance === '') {
      firstRingColor.set('transparent');
      secondRingColor.set('transparent');
      thirdRingColor.set('transparent');
    } else {
      firstRingColor.set(Color.getRingColor(+$resistance, 0).colorCode);
      secondRingColor.set(Color.getRingColor(+$resistance, 1).colorCode);
      thirdRingColor.set(Color.getRingColor(+$resistance, 2).colorCode);
    }
  }
</script>

<main class="bg-neutral-900 w-screen h-screen">
  <h1 class="text-white font-petrona text-4xl text-center pt-10">
    Widerstand Kennzeichnungen
  </h1>
  <div class="grid grid-cols-2 mt-32 mx-auto">
    <div
      class="ml-10 flex flex-col text-white gap-5 text-2xl justify-center border-r-neutral-800 border-r"
    >
      <div class="flex flex-row gap-2 h-fit justify-center">
        <p class="">Widerstand:</p>
        <input
          type="text"
          bind:value={$resistance}
          class="text-black"
          placeholder="42"
        />
        <p>&Omega;</p>
      </div>
      <div
        class="w-5/6 h-5 border-b border-b-neutral-800 text-center mx-auto mt-5"
      >
        <span class="text-xl bg-neutral-900 px-5"> ODER </span>
      </div>
      <div class="flex text-xl justify-around mt-8">
        <div>
          <p
            title="Der erste Ring gibt die Farbe der ersten Ziffer an."
            class="border-b border-dotted cursor-help w-fit mb-1"
          >
            Erster Ring:
          </p>
          <button
            class="w-32 h-8 rounded-sm border-2 border-neutral-800"
            style="background-color:{$firstRingColor}"
            on:click={() => toggleDropdown(0)}
          />
          {#if $firstRingDropdownOpen}
            <Dropdown ring={0} />
          {/if}
        </div>
        <div>
          <p
            title="Der zweite Ring gibt die Farbe der zweiten Ziffer an."
            class="border-b border-dotted cursor-help w-fit mb-1"
          >
            Zweiter Ring:
          </p>
          <button
            class="w-32 h-8 rounded-sm border-2 border-neutral-800"
            style="background-color:{$secondRingColor}"
            on:click={() => toggleDropdown(1)}
          />
          {#if $secondRingDropdownOpen}
            <Dropdown ring={1} />
          {/if}
        </div>
        <div>
          <p
            title="Der drite Ring gibt die Farbe des Multiplikators an."
            class="border-b border-dotted cursor-help w-fit mb-1"
          >
            Dritter Ring:
          </p>
          <button
            class="w-32 h-8 rounded-sm border-2 border-neutral-800"
            style="background-color:{$thirdRingColor}"
            on:click={() => toggleDropdown(2)}
          />
          {#if $thirdRingDropdownOpen}
            <Dropdown ring={2} />
          {/if}
        </div>
      </div>
      <div class="flex justify-around">
        <button
          title="Setzt alle Farben zurück."
          class="text-lg bg-gray-500 py-2 px-5 rounded-lg hover:bg-gray-600 transition-all ease-in-out"
          on:click={() => clearFields()}>Zurücksetzen</button
        >
        <button
          class="text-lg bg-blue-500 py-2 px-5 rounded-lg hover:bg-blue-600 transition-all ease-in-out"
          on:click={() => recalcResistance()}
          >Anwenden</button
        >
      </div>
    </div>
    <div class="flex justify-center">
      <table class="text-white w-full max-w-3xl h-48 ">
        <tr class="text-3xl">
          <th class="w-1/3">Attribut</th>
          <th class="w-2/3">Wert</th>
        </tr>
        <tr class="text-xl">
          <td>Widerstand</td>
          <td
            >{$resistance && !isNaN(+$resistance)
              ? (+$resistance).toFixed(2)
              : ''}
            {$resistance !== '' && !isNaN(+$resistance) ? 'Ω' : ''}</td
          >
        </tr>
        <tr class="text-xl">
          <td class=""
            >E-Reihe{eReihen.length === 1 ? '' : 'n'}
            <span
              title="Mit Toleranz. Die Toleranz ist von der E-Reihe abhängig."
              class="border-dotted border-b cursor-help">(m. T.)</span
            ></td
          >

          <td>{eReihen}</td>
        </tr>
      </table>
    </div>
  </div>
  <hr class="mx-12 mt-20" />
  <div class="flex justify-center mt-36 my-auto">
    <svg
      width="449.99999999999994"
      height="110"
      xmlns="http://www.w3.org/2000/svg"
      class="scale-150"
    >
      <g>
        <g id="svg_4">
          <line
            x1="0"
            fill="none"
            stroke="#fff"
            y1="55"
            x2="100"
            y2="55"
            id="svg_1"
            stroke-width="5"
          />
          <line
            fill="none"
            stroke="#fff"
            x1="350"
            y1="55"
            x2="450"
            y2="55"
            id="svg_2"
            stroke-width="5"
          />
          <rect
            y="5"
            fill="none"
            stroke="#fff"
            stroke-width="5"
            x="100"
            width="250"
            height="100"
            id="svg_3"
          />
        </g>
        <line
          y1="10"
          stroke-width="15"
          id="svg_5"
          y2="99"
          x2="150"
          x1="150"
          stroke={$firstRingColor}
          fill="none"
        />
        <line
          y1="10"
          stroke-width="15"
          id="svg_6"
          y2="99"
          x2="225"
          x1="225"
          stroke={$secondRingColor}
          fill="none"
        />
        <line
          y1="10"
          stroke-width="15"
          id="svg_7"
          y2="99"
          x2="300"
          x1="300"
          stroke={$thirdRingColor}
          fill="none"
        />
      </g>
    </svg>
  </div>
</main>
