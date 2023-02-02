import React from 'react';

export type DieProps = {
    roll: number
};

type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;
export type RollSetter = SetStateType<number[]>;