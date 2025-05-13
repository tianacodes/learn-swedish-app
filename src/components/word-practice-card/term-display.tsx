import { Tooltip } from "./tooltip";

export function TermDisplay({ term }: { term: string }) {
    return (
        <div className="flex flex-row gap-4 items-center">
            <p className="text-xl font-bold">{term}</p>
            <Tooltip />
        </div>
    );
}