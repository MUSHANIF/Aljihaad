import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'false',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        'node_modules/preline/dist/*.js',
        './node_modules/preline/preline.js',
    ],
 
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            textShadow: {
                'glow': '15px 5px 25px rgba(255, 255, 255, 3.0), 15px 5px 25px rgba(255, 255, 255, 3.0)',
              },
              keyframes: {
                'fade-in': {
                  '0%': { opacity: '0' },
                  '100%': { opacity: '1' },
                },
                'fade-out': {
                  '0%': { opacity: '1' },
                  '100%': { opacity: '0' },
                },
              },
              animation: {
                'fade-in': 'fade-in 0.3s ease-out',
                'fade-out': 'fade-out 0.3s ease-out',
              },
        },
        // screens: {
        //     'max-768': {'max': '768px'},

        //     'min-768': {'min': '768px'},
        //     'max-576': {'max': '576px'},

        //   },
    },

    plugins: [ require('tailwindcss-textshadow'), require('preline/plugin'),forms],
};
