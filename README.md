# Podedex APP

This is a simple app to list available pokemons and show their details. The app follow these guidelines: <https://www.notion.so/trustribbon/Pokedex-App-36e890fe6973470cb91ee04fcdaae47c>

Functionally the app has a deck of Pokemon Cards that you can view the details of each one by
clicking on Info button and catch them using the Catch button. The app also has a search bar to
filter the Pokemon Cards by name.

Once some Pokemons are caught you have a button on the top right corner to view them. Every time a Pokemon is caught a it's saved in the local storage so that the caught Pokemons are not lost when the page is refreshed.'

## Running the app

The app it's built with React and TypeScript using Vite as a bundler. In order to run the app:

1. Clone the repo
2. Run `npm install`
3. Run `npm run dev`
4. Open <http://localhost:5173/> in your browser

## Pending improvements

- Add unit tests
- Separate into independent components some of the logic in the HomePage component
- Add navigation to the Caught Pokemon page
- Add environment variables for the API URL