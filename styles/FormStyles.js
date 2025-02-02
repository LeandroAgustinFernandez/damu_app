import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  form: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4B3F72",
    marginBottom: 10,
  },
  inputText: {
    fontSize: 16,
  },
  inputSelect: {
    fontSize: 16,
    padding: 0,
    paddingRight: 24,
  },
  inputTextWeb: {
    fontSize: 16,
    width: "100%",
    padding: 10,
    borderRadius: 10,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 15,
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    marginBottom: 15,
    borderWidth: 0,
  },
  picker: {
    paddingHorizontal: 15,
    height: 50,
  },
  multiSelect: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  selectedStyle: {
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
  },
  selectedItemStyle: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#FF8C00",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  scheduleContainer: {
    marginBottom: 20,
  },
  pickerIOS: {
    height: 50,
    width: "100%",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  picker: {
    paddingHorizontal: 15,
    height: 50,
  },
  fileButton: {
    backgroundColor: "#FF8C00",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  fileButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: "column",
    paddingHorizontal: 16,
    paddingTop: 16,
    alignItems: "flex-end",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 15,
    width: "100%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  error: {
    color: "red",
    paddingBottom: 15,
    paddingHorizontal: 10,
    fontWeight: "bold",
    fontSize: 15
  },
  dayRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dayLabel: {
    flex: 1,
    fontSize: 16,
  },
  timeInput: {
    flex: 2,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  }  
});

export default styles;
