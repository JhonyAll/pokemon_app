import { Image, StyleSheet, TextInput } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatList, View } from 'react-native';
import PokemonCard from '@/components/PokemonCard';
import axios from 'axios'

type pokemonType = {
  id: number,
  name: string,
  image: string,
  type: string[]
}

export default function HomeScreen() {
  const [search, setSearch] = useState('')
  const [pokemons, setPokemons] = useState<Array<pokemonType>>([])

  useEffect(() => {
    axios.get(`http://localhost:3002/pokemon?name=${search}`)
      .then(response => setPokemons(response.data))
  }, [search])

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}

        />
      }>
      <ThemedView style={styles.titleContainer}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder='Pokemon...'
          style={styles.input}
        />
        <View>
          <FlatList
            data={pokemons}
            renderItem={({ item }) => <PokemonCard name={item.name} image={item.image} types={item.type} />}
          />
        </View>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    // resizeMode: 'cover'
  },
  input: {
    height: 40,
    width: '100%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
