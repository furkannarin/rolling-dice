import React, { useState } from 'react';
import { SafeAreaView, TextInput, FlatList, Button, Text, View } from 'react-native';
import Die, { FACES, INTERVAL_BTW_EACH_FACE, REVEAL_ROLL_DURATION } from './src/components/Die';

import Style from './src/styles/DotContainerStyle';
import { RollSetter } from './src/types';

const { inputStyle, rollTitle, historyContainer, rollDataContainer } = Style;

let CURRENT_MOCK_ITERATION = 1;
let CURRENT_ROLL_COUNT = 0;

// these function could be exported into their own file they have too much implementation details for a component but i leave them in this case
const createRoll = (isBeforeReveal: boolean, diceCount: number) => {
  if (isBeforeReveal) {
    let mockRoll: number[] = new Array(diceCount);

    for (let i = 0; i < diceCount; i++) {
      mockRoll.push(CURRENT_MOCK_ITERATION);
    }

    CURRENT_MOCK_ITERATION++
    return mockRoll;
  }

  const rolls: number[] = []

  for (let i = 0; i < diceCount; i++) {
    const roll = Math.floor(Math.random() * (FACES[5] - FACES[0] + 1));
    rolls.push(roll)
  }

  CURRENT_MOCK_ITERATION = 1; // reset the iteration count for the next roll
  return rolls;
}

const revealAndSetHistory = (rollResult: number[], setRoll: RollSetter, setHistory: RollSetter) => {
  setRoll(rollResult)
  setHistory(prev => {
    if (CURRENT_ROLL_COUNT < 10) {
      if (prev.length < 1) {
        CURRENT_ROLL_COUNT++;
        return rollResult;
      }
      const newHistory = new Array(...prev, ...rollResult); // if we use [...x, ...y] syntax, indexes will be duplicated so we create a new array to prevent duplicate indexes
      CURRENT_ROLL_COUNT++;
      return newHistory;
    }

    CURRENT_ROLL_COUNT = 0
    return rollResult;
  })
}

const App = () => {
  const [diceCount, setCount] = useState(0);
  const [rollData, setRoll] = useState<number[]>([]);
  const [rollHistory, setHistory] = useState<number[]>([]);

  const onRoll = () => {
    const beforeRevealCall = setInterval(() => {
      const mock = createRoll(true, diceCount);
      setRoll(mock);
    }, INTERVAL_BTW_EACH_FACE) // create the animation effect

    setTimeout(() => {
      clearInterval(beforeRevealCall);
      const rolls = createRoll(false, diceCount);
      revealAndSetHistory(rolls, setRoll, setHistory)
    }, REVEAL_ROLL_DURATION) // reveal the roll after this much time has passed
  }

  const handleChangeText = (text: string) => {
    const count = Number(text); // an empty string is casted to int 0 ^^ 
    if (!count) setRoll([])
    setCount(count)
  }

  return (
    <SafeAreaView>
      <TextInput
        value={String(diceCount) || ''}
        onChangeText={handleChangeText}
        style={inputStyle}
      />
      <Button title="Roll" onPress={onRoll} />
      <View style={rollDataContainer}>
        {rollData.length > 0 && <FlatList numColumns={3} data={rollData} keyExtractor={(_, idx) => `${idx}`} renderItem={({ item }) => <Die roll={item} />} />}
      </View>
      <Text style={rollTitle}>Previous Rolls</Text>
      <View style={historyContainer}>
        {rollHistory.length > 0 && <FlatList numColumns={3} data={rollHistory} keyExtractor={(_, idx) => `${idx}`} renderItem={({ item }) => <Die roll={item} />} />}
      </View>
    </SafeAreaView>
  );
};

export default App;
