import axios from "axios";

// // wrapping a promised based library in a promise
// const myPromise = new Promise((happy, sad) => {
//   axios
//     .get("https://pokeapi.co/api/v2/pokemon/charmander")
//     .then((info) => {
//       console.log("happy resolve");
//       happy(info);
//     })
//     .catch((err) => {
//       console.log(err);
//       console.log("sad reject");
//       sad(err);
//     });
// });

// myPromise
//   .then((data) => {
//     console.log("resolved data");
//     console.log(data.data.name);
//     return "fish";
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("reject error");
//     console.log(err);
//   });

// // got get one set of data
// // using that set of data you can then call another api

// Promise.all([
//   axios.get("https://pokeapi.co/api/v2/pokemon/charmander"),
//   axios.get("https://pokeapi.co/api/v2/pokemon/squirtle"),
// ])
//   .then((result) => {
//     console.log(result);
//     let [pm1, pm2] = result;
//     console.log(pm1.data.weight);
//     console.log(pm2.data.weight);
//     return { weights: [pm1.data.weight, pm2.data.weight] };
//   })
//   .then((arrray) => {
//     console.log(arrray);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// axios
//   .get("https://pokeapi.co/api/v2/pokemon/charmander")
//   .then((info) => {
//     console.log("happy resolve");
//     console.log(info);
//   })
//   .catch((err) => {
//     console.log(err);
//     console.log("sad reject");
//   });

let name = "";

const myPromise = new Promise((happy, sad) => {
  if (name !== "") {
    happy(name);
  } else {
    sad(name);
  }
});

myPromise
  .then((name) => {
    console.log(name);
    // preform real actions after checking a value or an execution
    axios.post("http://localhost:8080/user", { name });
  })
  .catch((err) => {
    console.log("add a name value please");
    console.log("name:", err);
  });
