// Create a character object from character array by using reduce.
// Then clone variables to this new object and return object.
export const createCharactersObject = characters =>
  characters.reduce(
    (result, { key, ...otherCharacterValues }) => ({
      ...result,
      [key]: {
        ...otherCharacterValues
      }
    }),
    {}
  );
