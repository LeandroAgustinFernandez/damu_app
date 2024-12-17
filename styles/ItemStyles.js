import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
      backgroundColor: "#fff",
      padding: 16,
      marginVertical: 8,
      borderRadius: 8,
      elevation: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      flexDirection: "row",
      alignItems: "center",
    },
    cardContent: {
      flexDirection: "row",
      alignItems: "center",
    },
    studyDetails: {
      marginLeft: 12,
    },
    name: {
      fontSize: 16,
    },
    studyName: {
      fontWeight: "bold",
      color: "#F7931E",
    },
    info: {
      fontSize: 14,
      color: "#333",
    },
  });
  
  export default styles