export type Database = {
    name: string,
    xuid: string,
    mode: "Break" | "Place",
    block: string,
    x: number,
    y: number,
    z: number,
    d: "OverWorld" | "The End" | "Nether",
    time: time,
    unix: number
}


type time = `${number}/${number}/${number} ${number}:${number}:${number}`
export type AddDataReq = {
    name: string, 
    mode: "Break" | "Place",
    block: string,
    x: number,
    y: number,
    z: number,
    d: "OverWorld" | "The End" | "Nether",
    time: time,
    unix: number
}
export type SearchAtReq = {
    x: number,
    y: number,
    z: number,
    d: "OverWorld" | "The End" | "Nether"
    count?: number  //最新から, 何個まで取り出すか
}
export type SearchAtRes = {
    name: string, 
    mode: "Break" | "Place",
    block: string,
    time: time,
    unix: number  //配列はunixでソートされていることを期待する. data[0]が最も古い(=unixが小さい)
}[]
export type SearchPlayerReq = {
    name: string,  //Xbox名 ex) kaito02020424
    d: "OverWorld" | "The End" | "Nether",
    count?: number  //最新から, 何個まで取り出すか
}
export type SearchPlayerRes = {
    name: string, 
    mode: "Break" | "Place",
    block: string,
    x: number,
    y: number,
    z: number,
    time: time,
    unix: number  //配列はunixでソートされていることを期待する. data[0]が最も古い(=unixが小さい)
}[]
export type SearchTimeReq = {
    time: number,  //何秒前まで調べるか
    d: "OverWorld" | "The End" | "Nether",
    count?: number  //最新から, 何個まで取り出すか
}
export type SearchTimeRes = {
    name: string, 
    mode: "Break" | "Place",
    block: string,
    x: number,
    y: number,
    z: number,
    time: time,
    unix: number  //配列はunixでソートされていることを期待する. data[0]が最も古い(=unixが小さい)
}[]
