import { Chat } from "./components/Chat";

export default function Home() {
	return (
		<main className="flex w-full max-h-full h-full bg-slate-900 flex-col text-slate-300">
			<Chat />
		</main>
	);
}
