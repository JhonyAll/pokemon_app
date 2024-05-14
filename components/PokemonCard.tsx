import { StyleSheet } from "react-native"
import { Image, View } from "react-native"
import { ThemedText } from "./ThemedText"

type Props = {
    name: string,
    image: string,
    types: string[]
}

const PokemonCard = ({ name, image, types }: Props) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: image }}
            />
            <ThemedText style={styles.nameText}>{name}</ThemedText>
            <View style={styles.types}>
                <ThemedText>Tipos:</ThemedText>
                {types.map(e => <ThemedText key={e}>{e.charAt(0).toUpperCase() + e.slice(1)} |</ThemedText>)}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderStyle: 'solid',
        borderWidth: 1.5,
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#bbb',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8
    },
    types: {
        flexDirection: 'row',
        gap: 4,
        width: 140,
        flexWrap: 'wrap'
    },
    nameText: {
        fontSize: 18,
        fontWeight: 700
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

export default PokemonCard