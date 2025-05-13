import { LightBulbIcon } from '@heroicons/react/24/outline';

export function Tooltip() {
    return (
        <div className="relative group">
            <LightBulbIcon className="w-6 h-6 text-yellow-500 hover:text-yellow-600 cursor-pointer" />
            {/* Tooltip or modal logic can be added here */}
        </div>
    );
}