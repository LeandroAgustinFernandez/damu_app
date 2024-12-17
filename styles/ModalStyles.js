import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    minHeight: 500,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
    elevation: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff7f00",
    marginVertical: 5,
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  modalText: {
    fontSize: 16,
    color: "rgb(74, 63, 144)",
    fontWeight: "medium",
    wordBreak: "break-word"
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: "60%",
    marginTop: 10,
    alignItems: "center",
  },
  editButton: {
    backgroundColor: "#4caf50",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  deleteButton: {
    borderColor: "#ff7f00",
    borderWidth: 1,
  },
  deleteButtonText: {
    color: "#ff7f00",
    fontSize: 18,
  },
  deleteConfirmButton: {
    backgroundColor: "#ff0000",
  },
  deleteConfirmButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 18,
  },
  deleteWarningText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginVertical: 20,
  },
  icon: {
    marginBottom: 12,
  },
  iconStatus:{
    marginTop: -40,
    marginRight: -50
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  messageText: {
    fontSize: 16,
    color: "rgb(74, 63, 144)",
    textAlign: "center",
    marginVertical: 8,
    fontWeight: "bold"
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeAlertButton: {
    marginTop: 16,
    backgroundColor: "#FF8C00",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
});

export default styles;

