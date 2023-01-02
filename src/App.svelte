<script lang="ts">
  import { EReihe } from './scripts/Helper';

  let resistance = '';
  let eReihen = [];

  let firstRingColor = 'transparent';
  let secondRingColor = 'transparent';
  let thirdRingColor = 'transparent';

  $: {
    // TODO: FIX Calculation
    eReihen = EReihe.partOf(+resistance % 10);
  }
</script>

<main class="bg-neutral-900 w-screen h-screen">
  <h1 class="text-white font-petrona text-4xl text-center pt-10">
    Widerstand Kennzeichnungen
  </h1>
  <div class="grid grid-cols-2 mt-32 mx-auto">
    <div class="ml-10 flex text-white gap-5 text-2xl items-center">
      <p class="">Widerstand:</p>
      <div class="flex flex-row gap-2 h-fit">
        <input
          type="text"
          bind:value={resistance}
          class="text-black"
          placeholder="42"
        />
        <p>&Omega;</p>
      </div>
    </div>
    <div>
      <table class="text-white w-full max-w-3xl h-48">
        <tr class="text-3xl">
          <th class="w-1/3">Attribut</th>
          <th class="w-2/3">Wert</th>
        </tr>
        <tr class="text-xl">
          <td>Widerstand</td>
          <td
            >{resistance && !isNaN(+resistance) ? (+resistance).toFixed(2) : ''}
            {resistance !== '' && !isNaN(+resistance) ? 'Ω' : ''}</td
          >
        </tr>
        <tr class="text-xl">
          <td>E-Reihe{eReihen.length === 1 ? '' : 'n'}</td>

          <td>{eReihen}</td>
        </tr>
      </table>
    </div>
  </div>
  <hr class="mx-12 mt-20" />
  <div class="flex justify-center mt-52 my-auto">
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
          stroke={firstRingColor}
          fill="none"
        />
        <line
          y1="10"
          stroke-width="15"
          id="svg_6"
          y2="99"
          x2="225"
          x1="225"
          stroke={secondRingColor}
          fill="none"
        />
        <line
          y1="10"
          stroke-width="15"
          id="svg_7"
          y2="99"
          x2="300"
          x1="300"
          stroke={thirdRingColor}
          fill="none"
        />
      </g>
    </svg>
  </div>
</main>
