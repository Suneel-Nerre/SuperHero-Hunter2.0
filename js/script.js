
const publicKey = "1c0de1d88e61f8ad7b98a8d4bc5b918f";
const privateKey = "85c8ac848dc84d691b77bf457255ee8ad58f8501";
const timeStamp = "1717642193559";
const hashKey = "f23dd071d37f04f324f709bf556fdaf5";

const URL = "https://gateway.marvel.com/v1/public/characters?ts=1717642193559&apikey=1c0de1d88e61f8ad7b98a8d4bc5b918f&hash=f23dd071d37f04f324f709bf556fdaf5&nameStartsWith=thor";


async function searchHeros(){
    let response = await fetch(URL);
    let data = await response.json();
    console.log(data.data.results[0]);
}

// console.log(Date.now());