import axios from "axios";
import * as React from "react";
import { useQuery, UseQueryResult } from "react-query";

const url = `/api/recs`;

export const useAzFuncFetch = (ratings: { [K in string]: number }): UseQueryResult<Array<string>, any> => {
    const getRecommendations = React.useCallback(async () => {
        const response = await axios.post(url, {
            method: 'POST',
            data: ratings,
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    }, [ratings]);

    return useQuery("movies", getRecommendations, {refetchInterval: false});
}
