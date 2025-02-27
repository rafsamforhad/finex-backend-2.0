const stringGenerator = (length = 40) => {
    const possibleCharacters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ11111222223333344444555556666677777888889999900000";
    let output = "";
    for (let i = 0; i < length; i++) {
      const randomCharacter = possibleCharacters.charAt(
        Math.floor(Math.random() * possibleCharacters.length)
      );
      output += randomCharacter;
    }
    return output;
  };
  
  module.exports = stringGenerator;