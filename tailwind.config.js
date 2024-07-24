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
    ],
 
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            textShadow: {
                'glow': '15px 5px 15px rgba(255, 255, 255, 0.8), 15px 5px 15px rgba(255, 255, 255, 0.9)',
              },
        },
        // screens: {
        //     'max-768': {'max': '768px'},

        //     'min-768': {'min': '768px'},
        //     'max-576': {'max': '576px'},

        //   },
    },

    plugins: [ require('tailwindcss-textshadow'),forms],
};
