/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            spacing: {
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
                'neutral-800': '#3F4248',
                'neutral-900': '#2A2D34'
            },
        },
        fontFamily: {
            poppins: ['Poppins', 'sans-serif'],
            petrona: ['Petrona', 'serif']
        },
    },
    plugins: [],
}
