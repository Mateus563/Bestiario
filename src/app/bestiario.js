import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Pressable, FlatList, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, Stack } from "expo-router";



const API_URL = "https://6b04e25adb01cf463607b158.mockapi.io/Bestiario";

export default function Bestiario() {
    const [bestiario, setBestiario] = useState([]);
    const [nome, setNome] = useState("");
    const [habitat, setHabitat] = useState("");
    const [perigo, setPerigo] = useState(0);
    const [poder, setPoder] = useState("");
    const [idEditando, setIdEditando] = useState(0);


    async function buscarBestiario() {
        const resposta = await fetch(API_URL);
        const dados = await resposta.json();
        setBestiario(dados);
    }

    async function salvarBestiario() {

        if (nome.trim() === "") {
            Alert.alert("Adicione o nome da criatura");
            return;
        }

        if (habitat.trim() === "") {
            Alert.alert("Adicione o habitat da criatura");
            return;
        }


        if (Number(perigo) < 1 || Number(perigo) > 5 || perigo === "") {
            Alert.alert("O perigo deve ser entre 1 e 5!");
            return;
        }

        if (idEditando === 0) {
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome: nome,
                    habitat: habitat,
                    perigo: perigo,
                    poder: poder,
                }),
            });
        } else {
            await fetch(API_URL + "/" + idEditando, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome: nome,
                    habitat: habitat,
                    perigo: perigo,
                    poder: poder,
                }),
            });

            setIdEditando(0);
        }
        setNome("");
        setHabitat("");
        setPerigo("");
        setPoder("");

        buscarBestiario();
    }

    async function excluir(id) {
        await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });
        buscarBestiario();
    }

    async function editar(item) {
        setIdEditando(item.id);
        setNome(item.nome);
        setHabitat(item.habitat);
        setPerigo(item.perigo);
        setPoder(item.poder);
    }

    useEffect(() => {
        buscarBestiario();
    }, []);


    return (
        <SafeAreaView style={styles.tela} edges={["bottom"]}>
            <Stack.Screen options={{ title: "Minhas bestas" }} />

            <TextInput
                style={styles.campo}
                value={nome}
                onChangeText={setNome}
                placeholder="Nome da Besta"
            />
            <TextInput
                style={styles.campo}
                value={habitat}
                onChangeText={setHabitat}
                placeholder="Habitat"
            />
            <TextInput
                style={styles.campo}
                value={perigo}
                onChangeText={setPerigo}
                placeholder="Nível de Perigo"
            />
            <TextInput
                style={styles.campo}
                value={poder}
                onChangeText={setPoder}
                placeholder="Poder da Besta"
            />

            <Button title="💾" onPress={salvarBestiario} />

            <FlatList
                style={styles.lista}
                data={bestiario}
                renderItem={({ item }) => (
                    <View>
                        <Text style={styles.item}>
                            Nome: {item.nome}
                            {"\n"}
                            Habitat: {item.habitat}
                            {"\n"}
                            Perigo: {item.perigo}
                            {"\n"}
                            Poder: {item.poder}

                        </Text>
                        <View style={styles.botao}>
                            <Button title="🗑️" onPress={() => excluir(item.id)} />
                            <Button title="✏️" onPress={() => editar(item)} />
                        </View>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: "#FFD3E1",
        paddingHorizontal: 16,
        paddingTop: 16,

    },

    botao: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 8,
        marginBottom: 20,

    },

    campo: {
        borderWidth: 1,
        borderColor: "#D9DDE3",
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        color: "#090b0e",
        marginBottom: 12,
    },

    lista: {
        flex: 1,
        marginTop: 16,
    },

    item: {
        backgroundColor: "#FFF1A6",
        borderRadius: 12,
        padding: 16,
        marginBottom: 8,
        fontSize: 15,
        lineHeight: 28,
        color: "#000000",
    },
});