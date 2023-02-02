import React, { useState } from 'react';
import { View, Animated } from 'react-native';

import { DieProps } from '../types/index.d'

export const FACES = [1, 2, 3, 4, 5, 6];

const INTERVAL_SPEED_MUL = 1; // increase to slow the animation or vice versa
export const REVEAL_ROLL_DURATION = 2000 * INTERVAL_SPEED_MUL;
export const INTERVAL_BTW_EACH_FACE = Math.floor(2000 / (FACES.length * INTERVAL_SPEED_MUL)); // in mseconds. this is, also, the duration for the rolling animation

import Style from '../styles/DotContainerStyle';

const MultipleDots = () => {
    const { dotsContainer, multipleDot } = Style;

    return (
        <View style={dotsContainer}>
            <View style={multipleDot} />
            <View style={multipleDot} />
        </View>
    )
}

const DieDots = ({ roll }: DieProps) => {
    const { singleDotContainer, singleDot, mulDotContainer } = Style;

    return (
        <React.Fragment>
            {roll <= 3 ? (
                <View style={singleDotContainer}>
                    <View style={{ ...singleDot, alignSelf: roll === 2 || roll === 3 ? 'flex-end' : 'center', marginRight: roll === 2 ? 20 : roll === 3 ? 5 : 0 }} />
                    {roll > 1 && <View style={{ ...singleDot, marginRight: roll === 2 ? 40 : 0 }} />}
                    {roll > 2 && <View style={{ ...singleDot, alignSelf: 'flex-start', marginLeft: 5 }} />}
                </View>
            ) : (
                <React.Fragment>
                    <View style={mulDotContainer}>
                        <MultipleDots />
                        {roll === 5 ? <View style={{ ...singleDot, alignSelf: 'center' }} /> : <MultipleDots />}
                        <MultipleDots />
                    </View>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

const Die = ({ roll }: DieProps) => {
    // rotate this component 30 or 45 degrees every X mseconds to give the rolling effect
    // after X mseconds has passed, reveal the outcome of the roll
    // add the outcome to the parent array where history is kept
    const { diceContainer } = Style;

    return (
        <Animated.View style={diceContainer}>
            <DieDots roll={roll} />
        </Animated.View>
    );
};

export default Die;
