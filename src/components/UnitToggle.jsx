export function UnitToggle({ units, onToggle}) {
    return (
        <div className="flex item-center bg-slate-900/80 border border-slate-800 p-1
        rounded-2xl backdrop-blur-md shadow-inner">
            <button
                onClick={() => onToggle('metric')}
            >
                °C
            </button>
        </div>
    )
}