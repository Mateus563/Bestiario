import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Inicio() {
  return (

    <SafeAreaView style={styles.tela} edges={["bottom"]}>

      <Stack.Screen options={{ title: "MENU" }} />

      <View style={styles.cabecalho}>


      </View>


      <View style={styles.cartao}>
        <Text style={styles.cartaoTitulo}>Bestiario</Text>
        <Text style={styles.detalhe}>Venha ver suas bestas!</Text>
        <Link href="/bestiario" style={styles.link}>
          Entrar no bestiario →
        </Link>
      </View>

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

  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
  },

  saudacao: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },

  subtitulo: {
    fontSize: 14,
    color: "#2e3a55",
    marginTop: 2,
  },

  cartao: {
    backgroundColor: "#FFF1A6",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    gap: 6,
  },

  cartaoTitulo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4e6597",
  },

  detalhe: {
    fontSize: 14,
    color: "#576c8d",
  },

  link: {
    fontSize: 15,
    fontWeight: "600",
    color: "#3e60be",
    marginTop: 4,
  },
});
