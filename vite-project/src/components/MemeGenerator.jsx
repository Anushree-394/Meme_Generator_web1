import { useEffect, useMemo, useState } from 'react'

export default function MemeGenerator() {
	const [memes, setMemes] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState('')
	const [query, setQuery] = useState('')

	useEffect(() => {
		let isCancelled = false
		async function fetchMemes() {
			try {
				setIsLoading(true)
				const response = await fetch('https://api.imgflip.com/get_memes')
				if (!response.ok) {
					throw new Error('Failed to load memes')
				}
				const data = await response.json()
				if (!isCancelled) {
					setMemes(Array.isArray(data?.data?.memes) ? data.data.memes : [])
				}
			} catch (err) {
				if (!isCancelled) setError(err?.message || 'Something went wrong')
			} finally {
				if (!isCancelled) setIsLoading(false)
			}
		}
		fetchMemes()
		return () => {
			isCancelled = true
		}
	}, [])

	const filteredMemes = useMemo(() => {
		const trimmed = query.trim().toLowerCase()
		if (!trimmed) return memes
		return memes.filter((m) => m.name.toLowerCase().includes(trimmed))
	}, [memes, query])

	return (
		<div className="min-h-screen bg-gray-50 text-gray-900">
			<div className="mx-auto w-full max-w-6xl px-4 py-8">
				<h1 className="mb-6 text-center text-3xl font-bold">Meme Template Viewer</h1>
				<input
					type="text"
					placeholder="Search memes..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					className="mb-8 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none ring-blue-500 transition focus:ring-2"
				/>

				{isLoading && (
					<div className="grid grid-cols-1 gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3">
						{Array.from({ length: 9 }).map((_, i) => (
							<div key={i} className="animate-pulse rounded-xl border border-gray-200 bg-white p-4">
								<div className="mb-3 h-48 w-full rounded-md bg-gray-200" />
								<div className="h-4 w-1/2 rounded bg-gray-200" />
							</div>
						))}
					</div>
				)}

				{!isLoading && error && (
					<div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
						{error}
					</div>
				)}

				{!isLoading && !error && (
					<>
						{filteredMemes.length === 0 ? (
							<p className="text-center text-gray-500">No memes found.</p>
						) : (
							<div className="grid grid-cols-1 gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3">
								{filteredMemes.map((meme) => (
									<div
										key={meme.id}
										className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
									>
										<div className="aspect-[4/3] w-full overflow-hidden bg-gray-100">
											<img
												src={meme.url}
												alt={meme.name}
												className="h-full w-full object-cover"
												loading="lazy"
											/>
										</div>
										<div className="p-3">
											<p className="truncate text-sm font-medium">{meme.name}</p>
										</div>
									</div>
								))}
							</div>
						)}
					</>
				)}
			</div>
		</div>
	)
}

