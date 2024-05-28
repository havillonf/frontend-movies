import { useEffect, useState } from 'react';
import { useMovieDataMutate } from '../../hooks/useMovieDataMutate';
import { MovieData } from '../../interface/MovieData';

import "./modal.css";

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}   

interface ModalProps {
    closeModal(): void
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

export function CreateModal({ closeModal }: ModalProps){
    const [title, setTitle] = useState("");
    const [release_year, setReleaseYear] = useState(0);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const { mutate, isSuccess, isLoading } = useMovieDataMutate();

    const submit = () => {
        const foodData: MovieData = {
            title, 
            release_year,
            description,
            image
        }
        mutate(foodData)
    }

    useEffect(() => {
        if(!isSuccess) return 
        closeModal();
    }, [isSuccess])

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Register a new Movie</h2>
                <form className="input-container">
                    <Input label="title" value={title} updateValue={setTitle}/>
                    <Input label="release_year" value={release_year} updateValue={setReleaseYear}/>
                    <Input label="description" value={description} updateValue={setDescription}/>
                    <Input label="image" value={image} updateValue={setImage}/>
                </form>
                <button onClick={submit} className="btn-secondary">
                    {isLoading ? 'postando...' : 'postar'}
                </button>
            </div>
        </div>
    )
}