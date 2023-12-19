'use strict'
/*
Object.entries(polozka).forEach(([key, value]) => {
    console.log(key, value)
})
*/
let odpoved = {
    "reaction": {
        "sts": "<integer>",
        "msg": "<string>"
    },
    "User": [{
        "Email": "<string>",
        "Username": "<string>",
        "Gender_id": "<integer>"
    }, ],
    "service": [{
        "name": "restservice",
        "device": "xr-1",
        "interface-port": "0/0/2/3",
        "interface-description": "uBot testing for NSO REST",
        "addr": "10.10.1.3/24",
        "mtu": 1024
    }],
    "person": {
        "male": {
            "name": "infinitbility"
        },
        "female": {
            "name": "aguidehub"
        }
    },
    "reactionID": "5484484898448948"
}
const ZiskavanieDatZoSluzieb = {
    __ziskajObjektoveHodnoty(objekt) {
        return Object.values(objekt)
    },
    __ziskajObjektoveKluce(objekt) {
        return Object.keys(objekt)
    },
    __jePrimitivna(obj) {
        return typeof obj !== 'object'
    },
    __primitivne(obj) {
        let objekt = {};
        this.__ziskajObjektoveKluce(obj)
            .forEach(polozka => {
                const key = obj[polozka];
                this.__jePrimitivna(key) ? objekt[polozka] = key : false
            })
        return objekt
    },
    __ziskajNestedObjekty(res) {
        return this.__ziskajObjektoveHodnoty(res).map(v => v instanceof Object ? this.__ziskajObjektoveHodnoty(v) : [v])
            .reduce((acc, next) => acc.concat(...next), [])
            .filter(obj => typeof obj === 'object')
    },
    __ziskajVonkajsieObjekty (odpoved){
        return this.__ziskajObjektoveHodnoty(odpoved).filter(polozka => typeof polozka === 'object' || !Array.isArray(polozka))
        .map(filtrovane=>this.contains(!Array.isArray(filtrovane)))
    },
    __ziskajObjekty(odpoved) {
        const primitivne = [this.__primitivne(odpoved)];
        const vsetkyObjekty = this.__ziskajNestedObjekty(odpoved)
        let arr
        primitivne.length > 0 ? arr = [...primitivne, ...vsetkyObjekty] : arr = vsetkyObjekty
        if (this.__ziskajObjektoveKluce(arr[0]).length === 0) return arr.slice(1)
        return arr
    }
};
const vsetkyNestedObjekty = ZiskavanieDatZoSluzieb.__ziskajNestedObjekty(odpoved)
const result = ZiskavanieDatZoSluzieb.__ziskajObjekty(odpoved);

/*
priklad
const ziskajJednoducheObjekty = (odpoved) => {
    const array = []
  Object.values(odpoved)
    .filter((polozka) => typeof polozka === 'object' && !Array.isArray(polozka))
    .forEach((obj) => {
      Object.entries(obj).forEach(([key, value]) => {
        typeof value === 'string'? array[array.length] = { [key]: value }:[]
      });
    });
    return array
};

const results = ziskajJednoducheObjekty(odpoved);
console.log(results);
//console.log([...results]);
*/