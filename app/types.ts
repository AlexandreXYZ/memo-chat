export interface Database {
    data: Data[]
}

export type Data = {
    id: number;
    value: string;
}