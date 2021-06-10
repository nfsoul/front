import nfsoulContract from '../contracts/nfs/contracts/NFSoul.json'

export const safeMapArrToOptions = (arr) => {
    if (!arr) return [];
    if (!Array.isArray(arr)) throw ("Map array to options function expected array");
    return arr.map(item => {
        return { key: item, value: item };
    });
}