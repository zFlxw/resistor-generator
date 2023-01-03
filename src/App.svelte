<script lang="ts">
  import { Color, EReihe, getResistanceFromColors } from './scripts/helper';
  import Dropdown from './components/Dropdown.svelte';
  import { resistance } from './stores/ResistanceStore';
  import {
    firstRingColor,
    secondRingColor,
    thirdRingColor,
  } from './stores/RingColorStore';
  import {
    firstRingDropdownOpen,
    secondRingDropdownOpen,
    thirdRingDropdownOpen,
  } from './stores/DropdownStore';
  import { isImprintModalOpen } from './stores/ModalStore';
  import Modal from './components/Modal.svelte';

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

<Modal condition={$isImprintModalOpen} title="Impressum">
  <h2 class="text-white text-2xl font-bold mt-10">Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
  <p class="text-neutral-200 text-xl">
    Maik Zimmerschied<br />
    Lindenstr. 2<br />
    54531 Wallscheid
  </p>

  <h2 class="text-2xl text-white font-bold mt-5">Kontakt</h2>
  <p class="text-neutral-200 text-xl">
    E-Mail: lxcalflxw@protonmail.com
  </p>

  <p class="text-white mt-10">
    Quelle: <a class="text-primary" href="https://www.e-recht24.de/impressum-generator.html"
      >https://www.e-recht24.de/impressum-generator.html</a
    >
  </p>
</Modal>

<main class="bg-neutral-900 w-screen h-full xl:h-screen">
  <h1 class="text-white font-petrona text-4xl text-center pt-10">
    Widerstand Kennzeichnungen
  </h1>
  <div class="grid grid-cols-1 xl:grid-cols-2 mt-10 xs:mt-24 mx-auto">
    <div
      class="xl:ml-10 flex flex-col text-white gap-5 text-xl xs:text-2xl justify-center border-r-neutral-800 border-r"
    >
      <div
        class="flex flex-col 2xs:flex-row gap-2 h-fit justify-center items-center"
      >
        <p class="">Widerstand:</p>
        <div class="flex gap-2">
          <input
            type="text"
            bind:value={$resistance}
            class="text-black w-fit max-w-sm"
            placeholder="42"
          />
          <p>&Omega;</p>
        </div>
      </div>
      <div
        class="w-5/6 h-5 border-b border-b-neutral-800 text-center mx-auto mt-5"
      >
        <span class="text-xl bg-neutral-900 px-5"> ODER </span>
      </div>
      <div
        class="flex flex-col xs:flex-row text-xl justify-around items-center my-4 xs:mt-8"
      >
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
          on:click={() => recalcResistance()}>Anwenden</button
        >
      </div>
    </div>
    <hr class="block xl:hidden mt-10 mx-4 xs:mx-6 md:mx-12" />
    <div class="flex justify-center mt-10 xl:mt-0 mx-4">
      <table class="text-white w-full max-w-sm xs:max-w-xl 2xl:max-w-3xl h-48 ">
        <tr class="text-xl 2xs:text-2xl xs:text-3xl">
          <th class="w-1/3">Attribut</th>
          <th class="w-2/3">Wert</th>
        </tr>
        <tr class="text-lg 2xs:text-xl">
          <td>Widerstand</td>
          <td
            >{$resistance && !isNaN(+$resistance)
              ? (+$resistance).toFixed(2)
              : ''}
            {$resistance !== '' && !isNaN(+$resistance) ? 'Ω' : ''}</td
          >
        </tr>
        <tr class="text-lg 2xs:text-xl">
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
  <hr class="mt-20 mx-4 xs:mx-6 md:mx-12" />
  <div class="flex flex-col justify-center w-full items-center">
    <svg
      width="449.99999999999994"
      height="110"
      xmlns="http://www.w3.org/2000/svg"
      class="my-10 scale-75 2xs:scale-100 xl:scale-150 xl:my-36"
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
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div on:click={() => isImprintModalOpen.set(true)}>
    <p
      class="fixed bottom-2 left-2 text-neutral-500 hover:text-primary cursor-pointer transition-all ease-in-out"
    >
      Impressum
    </p>
  </div>
</main>
