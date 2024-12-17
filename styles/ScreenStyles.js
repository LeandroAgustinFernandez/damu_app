import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#4B358D",
    paddingVertical: 50,
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerText: {
    fontSize: 28,
    color: "#F7931E",
    fontWeight: "bold",
  },
  subHeader: {
    fontSize: 16,
    color: "white",
  },
  logoutButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  filterButtonText: {
    marginLeft: 8,
    color: "#ff7f00",
    fontSize: 16,
  },
  list: {
    padding: 16,
  },
  loading: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  noItems: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  addButton: {
    alignSelf: "center",
    backgroundColor: "#fff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ff7f00",
    elevation: 8,
  },
  addButtonText: {
    color: "#ff7f00",
    fontSize: 36,
    fontWeight: "bold",
  },
});

export default styles;
