import { Data } from "../types";

export const removeRecord = (id: number) => {
    fetch("/api/data", {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(id),
    });
};

export const getRecords = async (): Promise<Data[]> => {
    const response = await fetch("/api/data");
    const data = await response.json();

    return data;
};

export const addRecord = (newRecord: Data) => {
    fetch("/api/data", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecord),
    })
};