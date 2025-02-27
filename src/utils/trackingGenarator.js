const trackingGenerator = () => {
    const length = 10;
    const possibleCharacters =
      "1111000011112222223333334444455555500055500000000000011111667788888888889999999999990011111100000";
    let output = "11"; // Prefixing the output with "11"
    
    for (let i = 0; i < length; i++) {
      const randomCharacter = possibleCharacters.charAt(
        Math.floor(Math.random() * possibleCharacters.length)
      );
      output += randomCharacter;
    }
    
    return output;
  };

  module.exports = trackingGenerator