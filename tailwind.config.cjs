/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            spacing: {
                '0.1': '0.1rem',
                '5.5': '1.375rem',
                '34': '8.5rem',
                '86': '22rem',
                '92': '23rem',
                '110': '26rem',
                '120': '28rem',
                '130': '30rem',
                '140': '32rem',
                '150': '34rem',
                '160': '36rem',
                '170': '38rem',
                '180': '40rem',
                '190': '42rem',
                '200': '44rem',
                '210': '46rem',
            },
            backgroundImage: {
                'homepage': "url('/assets/homepage.jpg')",
                'about': "url('/assets/about.jpg')"
            },
            colors: {
                white: '#ffffff',
                primary: '#00BFFF',
                brown: '#7B3F00',
                'neutral-800': '#3F4248',
                'neutral-900': '#2A2D34',
                'red-1000': '#ff0000',
                'orange-1000': '#fb8500',
                'yellow-1000': '#ffb703',
                'green-1000': '#3a5a40',
                'blue-1000': '#0077b6',
                'violett-1000': '#8f2d56',
                'gray-1000': '#808080',
                gold: '#daa520',
                silver: '#C0C0C0',
            },
        },
        fontFamily: {
            poppins: ['Poppins', 'sans-serif'],
            petrona: ['Petrona', 'serif']
        },
    },
    plugins: [require('tailwind-scrollbar')],
}
