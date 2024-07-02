"use client";

import { useState } from "react";
import { formatDate } from "../utils";

interface InputChatProps {
	onChange: (value: string, id: number) => void;
}

export const InputChat = (props: InputChatProps) => {
	const [value, setValue] = useState("");
	const [date, setDate] = useState<number>(new Date().getTime());

	const onChange = () => {
		props.onChange(value, new Date().getTime());
		setValue("");
		setDate(new Date().getTime());
	};

	return (
		<div className="h-12 flex items-center bg-slate-800">
			<div className="w-48 p-2 text-center">{formatDate(date)}</div>
			<input
				value={value}
				onChange={(target) => setValue(target.currentTarget.value)}
				className="resize-none p-2  w-full h-full overflow-x-auto bg-slate-700"
				onKeyDown={(e) => e.key === "Enter" && onChange()}
				onClick={() => setDate(new Date().getTime())}
			/>
		</div>
	);
};
