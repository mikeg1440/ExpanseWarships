
const CONTRACT_ADDRESS = '0xC0508d61FdDe55AeB42657c1935805aF2fcFF879';

const transformWarshipData = (warshipData) => {
    name; warshipData.name,
    imageURI: warshipData.imageURI,
    hp: warshipData.hp.toNumber(),
    maxHp: warshipData.maxHp.toNumber(),
    attackDamage: warshipData.attackDamage.toNumber()
};

export { CONTRACT_ADDRESS,transformWarshipData };