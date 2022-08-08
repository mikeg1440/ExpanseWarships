
const shipsData = [
  ["Rocinante", "Pella", "Donnager"],
  [
    "https://gateway.pinata.cloud/ipfs/QmaFuqQ2zB3Etd4dtw2SH82YAsReTo1WMJKZoT94r4oPxJ",
    "https://gateway.pinata.cloud/ipfs/QmYnqcdTSrXqVrrUJEddvzA7qVEk9xW2h6Q3ojvmVQ9aBN",
    "https://gateway.pinata.cloud/ipfs/QmPeEwiUrmqxCudrbeaHJ3WSCpnAwvqSXRtttd3hBZspSU",

  ],
  [ 400, 600, 360 ],
  [ 100, 90, 105 ],
  'ProtoZoid',
  'https://i.pinimg.com/originals/b8/46/26/b846268133d5199992531d5a0885d398.jpg',
  900,
  120
]

// should reorganize this data into a more readable/usable format similar to the one below
// const shipsData = [
//   { name: "Rocinante", shipType: "userShip",imgURI: "https://gateway.pinata.cloud/ipfs/QmaFuqQ2zB3Etd4dtw2SH82YAsReTo1WMJKZoT94r4oPxJ", maxHp: 400, attack: 100 },
//   { name: "Pella", shipType: "userShip",imgURI: "https://gateway.pinata.cloud/ipfs/QmYnqcdTSrXqVrrUJEddvzA7qVEk9xW2h6Q3ojvmVQ9aBN", maxHp: 600, attack: 90 },
//   { name: "Donnager", shipType: "userShip",imgURI: "https://gateway.pinata.cloud/ipfs/QmPeEwiUrmqxCudrbeaHJ3WSCpnAwvqSXRtttd3hBZspSU", maxHp: 360, attack: 105 },
//   { name: "ProtoZoid", shipType: "bossShip", imgURI: "https://i.pinimg.com/originals/b8/46/26/b846268133d5199992531d5a0885d398.jpg", maxHp: 900, attack: 120 }
// ]

exports.shipsData = shipsData;


// shipsData = [
  // [ Ship Names ],
  // [ Ship Images ],
  // [ Ship HP ],,
  // [ Ship Attack ],
  // Boss Name,
  // Boss Image,
  // Boss HP,
  // Boss Attack Damage
// ]


// "https://steamuserimages-a.akamaihd.net/ugc/787478494829796380/B669F75A7CF0DF8788D6A6D352849C6E55C8F86A/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
// "https://preview.redd.it/vnof5a2zcgi61.jpg?auto=webp&s=5cd38ee1bdccc948f851d22d2bdeb0d608d8079d",

// Original files
// "https://static.wikia.nocookie.net/expanse/images/5/54/RociArtS4.png/revision/latest?cb=20220113235011",
// "https://static.wikia.nocookie.net/expanse/images/4/47/PellaConceptship.png/revision/latest?cb=20201223193751",
// "https://i.redd.it/w7l7271pbvy61.jpg"