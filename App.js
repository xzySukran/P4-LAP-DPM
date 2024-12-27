import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default function App() {
  const [scoreTeamA, setScoreTeamA] = useState(0);
  const [scoreTeamB, setScoreTeamB] = useState(0);
  const ballPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const moveBall = (direction) => {
    let targetX = 0;

    if (direction === 'A') {
      targetX = -150; 
      setScoreTeamA((prev) => prev + 1);
    } else if (direction === 'B') {
      targetX = 150; 
      setScoreTeamB((prev) => prev + 1);
    }

    if (scoreTeamA === 9 && direction === 'A') {
      Alert.alert('Tim A Menang!');
    } else if (scoreTeamB === 9 && direction === 'B') {
      Alert.alert('Tim B Menang!');
    }

    Animated.timing(ballPosition, {
      toValue: { x: targetX, y: 0 },
      duration: 500,
      useNativeDriver: false,
    }).start(() => {

      Animated.timing(ballPosition, {
        toValue: { x: 0, y: 0 },
        duration: 500,
        useNativeDriver: false,
      }).start();
    });
  };

  const subtractScore = (team) => {
    let targetX = team === 'A' ? 150 : -150;

    if (team === 'A' && scoreTeamA > 0) {
      setScoreTeamA((prev) => prev - 1);
    } else if (team === 'B' && scoreTeamB > 0) {
      setScoreTeamB((prev) => prev - 1);
    }

    Animated.timing(ballPosition, {
      toValue: { x: targetX, y: 0 },
      duration: 500,
      useNativeDriver: false,
    }).start(() => {

      Animated.timing(ballPosition, {
        toValue: { x: 0, y: 0 },
        duration: 500,
        useNativeDriver: false,
      }).start();
    });
  };

  const resetScores = () => {
    setScoreTeamA(0);
    setScoreTeamB(0);

    Animated.sequence([
      Animated.timing(ballPosition, {
        toValue: { x: 0, y: -100 },
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(ballPosition, {
        toValue: { x: 0, y: 100 },
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(ballPosition, {
        toValue: { x: 0, y: 0 },
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pertandingan Futsal</Text>
      <View style={styles.teamContainer}>
        <View style={styles.team}>
          <Text style={styles.teamName}>Tim A</Text>
          <Text style={styles.score}>{scoreTeamA}</Text>
          <TouchableOpacity
            style={[styles.button, styles.plusButton]}
            onPress={() => moveBall('A')}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.minusButton]}
            onPress={() => subtractScore('A')}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.team}>
          <Text style={styles.teamName}>Tim B</Text>
          <Text style={styles.score}>{scoreTeamB}</Text>
          <TouchableOpacity
            style={[styles.button, styles.plusButton]}
            onPress={() => moveBall('B')}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.minusButton]}
            onPress={() => subtractScore('B')}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Animated.View
        style={[
          styles.ball,
          {
            transform: [
              { translateX: ballPosition.x },
              { translateY: ballPosition.y },
            ],
          },
        ]}
      />
      <TouchableOpacity style={styles.resetButton} onPress={resetScores}>
        <Text style={styles.resetText}>Reset Skor</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87CEEB',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  teamContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  team: {
    marginHorizontal: 20,
    alignItems: 'center',
  },
  teamName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  score: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  plusButton: {
    backgroundColor: '#32CD32',
  },
  minusButton: {
    backgroundColor: '#FF4500',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  ball: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 200,
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff6347',
    borderRadius: 10,
  },
  resetText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
