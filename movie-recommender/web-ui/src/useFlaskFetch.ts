import axios from "axios";
import * as React from "react";
import { useQuery, UseQueryResult } from "react-query";

const url = "http://localhost:5000/fetchRecs";

export const useFlaskFetch = (ratings: { [K in string]: number }): UseQueryResult<Array<string>, any> => {
    const getRecommendations = React.useCallback(async () => {
        const response = await axios.post(url, {
            method: "GET",
            data: ratings,
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    }, [ratings]);

    // const q = useQuery("movies", getRecommendations);
    // console.log(q);
    return useQuery("movies", getRecommendations, {refetchInterval: false});
}
