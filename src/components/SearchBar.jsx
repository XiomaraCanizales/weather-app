import { useState } from "react";

export function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            onSearch(searchTerm)
            setSearchTerm("") // clear input after search
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto">
            <div className="relative flex items-center">
                {/* search icon */}
                <span className="absolute left-4 text-slate-400 text-lg">🔍</span>

                {/* input field */}
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for a place..."
                    className="w-full pl-12 pr-28 py-3.5 bg-slate-900/80 backdrop-blur-md 
                    border border-slate-800 rounded-2xl text-slate-100 placeholder-slate-400 
                    focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 
                    transition-all shadow-lg"
                />

                {/* submit button */}
                <button 
                    type="submit"
                    className="absolute right-2 px-4 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950
                    font-semibold rounded-xl text-sm transition-all cursor-pointer shadow-md 
                    hover:shadow-sky-500/25"
                >
                    Search
                </button>
            </div>
        </form>
    )
}