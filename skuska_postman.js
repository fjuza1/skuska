'use strict'
let response = {
    name: "John Doe",
    age: 30,
    address: {
      street: "123 Main St",
      city: "Anytown",
      country: "USA"
    },
    friends: [
      {
        friendNames: "Alice",
        age: 28
      },
      {
        friendNamez: "Bob",
        age: 32
      }
    ],
    meHow: [
        {
          fds: "Alice",
          as: 28
        },
        {
          dfgfdg: "Bob",
          dfg: 32
        }
      ]
  };
const AutomatizaciaResReq = {
    __ziskajObjektoveHodnoty(objekt){
        return Object.values(objekt)
    },
   __ziskajDatovePolia(pole){
    return this.__ziskajObjektoveHodnoty(pole)
    .filter(datovyTyp=>Array.isArray(datovyTyp))
    .reduce((arr,acc)=>arr.concat(acc),[])
   }
};
const extraktovanePolia = AutomatizaciaResReq.__ziskajDatovePolia(response)
// console.log("🚀 ~ file: skuska_postman.js:41 ~ extraktovanePolia:", extraktovanePolia)
extraktovanePolia.forEach(element => {
  Object.entries(element).forEach(([arr,val])=>{
    console.log(arr,val);
    return (arr,val)
});
})

