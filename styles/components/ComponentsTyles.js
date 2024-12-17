import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    // list: {
    //   paddingHorizontal: 10,
    //   paddingVertical: 20,
    // },
    card: {
      backgroundColor: "white",
      flex: 1,
      margin: 10,
      height: 120,  // Tamaño cuadrado
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
    },
    cardTitle: {
      marginTop: 10,
      fontSize: 14,
      fontWeight: "bold",
      color: "#4B358D",
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 50,
      paddingHorizontal: 16,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    title: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
    },
    link: {
      color: "#007BFF",
      textDecorationLine: "underline",
      fontSize: 16,
      marginVertical: 8,
    },
  });

  export default styles