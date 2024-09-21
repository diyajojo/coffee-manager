module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Lilita One", "sans-serif"],
        secondary :['Open Sans'],
        
    },
  },
  variants: {},
  plugins: [],
  base: {
    body: {
      margin: 0,
      color: '#333',
      backgroundColor: '#f2f2f2',
    },
  },
  }
}