"use client";

import useSWR from "swr";

export function useChannels() {
	const fetcher = (url: string) => fetch(url).then(res => res.json());
	const {data, error, isLoading} = useSWR("/api/channels", fetcher);
	return {data, error, isLoading};
}