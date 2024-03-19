/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{html,ts}"],
    theme: {
        extend: {
            colors: {
                space: "#5c6ac6",
                karma: "#fdf9ff",
                ghosty: "#dccff9",
                fontbasics: '#303030',
                caption: 'rgba(0, 0, 0, 0.7)',
                skycustom: '#97E5F6',
            },
            fontFamily: {
                athiti: ["Athiti", "sans-serif"],
                vt: ["VT323", "sans-serif"],
            },
            height: {
                button: "48px",
            }
        },
    },
    plugins: [],
}