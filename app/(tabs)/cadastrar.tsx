import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Text, TextInput, Button, Pressable } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { View } from 'react-native';
import { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons as Icon } from '@expo/vector-icons';
import { useEffect } from 'react';
import axios from 'axios';

type typeType =
  {
    name: string,
    id: number
  }

const types: typeType[] = [
  { name: 'Elétrico', id: 1 },
  { name: 'Voador', id: 2 },
  { name: 'Fogo', id: 3 },
  { name: 'Água', id: 4 },
  { name: 'Grama', id: 5 },
  { name: 'Psíquico', id: 6 },
  { name: 'Lutador', id: 7 },
  { name: 'Venenoso', id: 8 },
  { name: 'Terra', id: 9 },
  { name: 'Gelo', id: 10 },
  { name: 'Inseto', id: 11 },
  { name: 'Fantasma', id: 12 },
  { name: 'Pedra', id: 13 },
  { name: 'Aço', id: 14 },
  { name: 'Noturno', id: 15 },
  { name: 'Fada', id: 16 },
  { name: 'Dragão', id: 17 },
];

export default function TabTwoScreen() {
  const [name, setName] = useState('')
  const [image, setImage] = useState('https://th.bing.com/th/id/OIP.irYdn9CAcFUWw7vCSP0CGwHaEK?w=321&h=180&c=7&r=0&o=5&pid=1.7')

  const [selectedItems, setSelectedItems] = useState([]);
  const [itemsAll, setItemsAll] = useState<string[]>([])

  const uploadFileOnPressHandler = async () => {
    try {
      const pickedFile = await DocumentPicker.getDocumentAsync({ type: 'image/*' });
      if (!pickedFile.canceled) {
        setImage(pickedFile.assets[0].uri)
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  const adicionarPokemon = () => {
    selectedItems.forEach(element => {
      types.forEach(e => {
        if (e.id == element) {
          let i = itemsAll
          i.push(e.name)
          setItemsAll(i)
        }
      }
      )
    })

    const options = {
      method: 'POST',
      url: 'http://localhost:3002/pokemon',
      headers: { 'Content-Type': 'application/json' },
      data: {
        name: name,
        image: image,
        type: itemsAll
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
      setSelectedItems([])
      setImage('https://th.bing.com/th/id/OIP.irYdn9CAcFUWw7vCSP0CGwHaEK?w=321&h=180&c=7&r=0&o=5&pid=1.7')
      setName('')

    }).catch(function (error) {
      console.error(error);
    });
  }

  return (
    <View style={styles.viewContainer}>
      <Text style={styles.viewText}>Adicionar novo pokemon</Text>
      <View style={styles.container}>
        <Pressable onPress={uploadFileOnPressHandler}>
          <Image
            style={styles.image}
            source={{ uri: image }}
            id='imageCadastrar'
          />
        </Pressable>
        <TextInput style={styles.nameText} value={name} onChangeText={setName} placeholder='Nome do pokemon' />
        <View style={styles.types}>
          <ThemedText>Tipos:</ThemedText>
          <View>
            <SectionedMultiSelect
              items={types}
              IconRenderer={Icon}
              uniqueKey="id"
              onSelectedItemsChange={setSelectedItems}
              selectedItems={selectedItems}
            />
          </View>
        </View>
      </View>
      <Pressable onPress={adicionarPokemon} style={styles.button}>
        <Text>Adicionar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    gap: 20
  },
  button: {
    width: '50%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    fontSize: 18,
    fontWeight: 600,
    backgroundColor: '#bbb'
  },
  viewText: {
    fontSize: 25,
    fontWeight: 700
  },
  container: {
    borderStyle: 'solid',
    borderWidth: 1.5,
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#bbb',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
    gap: 8
  },
  types: {
    flexDirection: 'row',
    gap: 4,
    width: 140,
    flexWrap: 'wrap'
  },
  nameText: {
    fontSize: 18,
    fontWeight: 600
  },
  image: {
    width: 140,
    height: 140,
    borderRadius: 4,
    objectFit: 'cover',
    borderStyle: 'solid',
    borderWidth: .5,

  }
})