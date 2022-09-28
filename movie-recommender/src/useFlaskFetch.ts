import axios from "axios";
import * as React from "react";
import { useQuery, UseQueryResult } from "react-query";

const url = "https://amlp2-endpoint-proxy.azurewebsites.net/api/fetchRecs";

export const useFlaskFetch = (ratings: { [K in string]: number }): UseQueryResult<Array<string>, any> => {
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
