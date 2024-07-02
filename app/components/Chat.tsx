"use client";

import { useEffect, useState } from "react";
import { formatDate } from "../utils";
import { addRecord, getRecords, removeRecord } from "../services/data";
import { InputChat } from "./InputChat";
import { Data } from "../types";

export const Chat = () => {
	const [data, setData] = useState<Data[]>([]);

	useEffect(() => {
		loadRecords();
	}, []);

	const loadRecords = async () => {
		const currentData = await getRecords();

		setData(currentData);
	};

	const addNewRecord = (value: string, id: number) => {
		try {
			const newRecord = { value, id };

			addRecord(newRecord);

			setData([...data, newRecord]);
		} catch (err) {
			console.error("Cannot add new record");
		}
	};

	const removeRecordById = (id: number) => {
		removeRecord(id);

		setData(data.filter((data) => data.id !== id));
	};

	return (
		<div className="flex flex-col h-full ">
			<div className="p-4 overflow-y-auto h-full">
				{data.length > 0
					? data.map(({ value, id }) => (
							<div key={id}>
								<button
									className="text-red-500 mr-2 cursor-pointer h-8"
									onClick={() => removeRecordById(id)}
									title="Deletar"
								>
									Del
								</button>
								<span>
									<span className="mr-2 text-slate-400">{formatDate(id)}</span>
									{value}
								</span>
							</div>
					  ))
					: null}
			</div>
			<InputChat onChange={addNewRecord} />
		</div>
	);
};
