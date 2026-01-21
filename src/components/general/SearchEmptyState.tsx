const SearchEmptyState = () => {
    return (
        <section className="flex flex-col items-center justify-center gap-4">
            <img
                src="/images/home/search.gif"
                alt="search"
                className="w-48 h-48"
            />
            <p className="text-[#3B3B3B] text-lg font-medium leading-[100%] text-center">
                Type a keyword above to find what you’re looking for.
            </p>
        </section>
    )
}

export default SearchEmptyState
