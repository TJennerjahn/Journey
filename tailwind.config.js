module.exports = {
  purge: ["./src/**/*.svelte"],
  theme: {
    extend: {
      fontFamily: {
        'source-sans-pro': ['Source Sans Pro'],
        'mitr': ['Mitr'],
        'roboto-slab': ['Roboto Slab'],
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
  },
  plugins: [require("@tailwindcss/custom-forms")],
}
