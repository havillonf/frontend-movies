import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios"
import { MovieData } from '../interface/MovieData';

const API_URL = 'http://localhost:8080';

const fetchData = async (): AxiosPromise<MovieData[]> => {
    const response = axios.get(API_URL + '/movie');
    return response;
}

export function useMovieData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['movie-data'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data
    }
}