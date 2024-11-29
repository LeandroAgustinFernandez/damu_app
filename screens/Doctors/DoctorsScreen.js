import React, { useEffect, useState, useContext } from "react";
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Modal,
} from "react-native";
import { UserContext } from "../../context/UserContext";
import { getDoctorsByUserId, deleteDoctor } from "../../services/api";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../../components/Header";

const DoctorsScreen = ({ navigation }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      fetchDoctors();
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchDoctors();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchDoctors = async () => {
    try {
      setLoading(true); // Opcional: mostrar carga al refrescar
      const userDoctors = await getDoctorsByUserId(user.user_id);
      setDoctors(userDoctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (doctor) => {
    setSelectedDoctor(doctor);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedDoctor(null);
  };

  const openDeleteModal = (doctor) => {
    setSelectedDoctor(doctor);
    setdeleteModal(true);
  };

  const closeDeleteModal = () => {
    setdeleteModal(false);
  };

  const handleDeleteDoctor = async () => {
    try {
      await deleteDoctor(selectedDoctor.id);
      setDoctors(doctors.filter((doctor) => doctor.id !== selectedDoctor.id));
      setdeleteModal(false);
      closeModal();
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const handleEditDoctor = () => {
    closeModal();
    navigation.navigate("DoctorsForm", { doctor: selectedDoctor });
  };

  const renderDoctor = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => openModal(item)}>
      <View style={styles.cardContent}>
        <MaterialIcons name="person" size={24} color="#ff7f00" />
        <Text style={styles.name}>
          {item.speciality}: {item.name} {item.surname}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Médicos" onClose={() => navigation.goBack()} />
      {loading ? (
        <Text style={styles.loading}>Cargando médicos...</Text>
      ) : doctors.length === 0 ? (
        <Text style={styles.noDoctors}>No hay médicos registrados.</Text>
      ) : (
        <FlatList
          data={doctors}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderDoctor}
          style={styles.list}
        />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("DoctorsForm")}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {selectedDoctor && (
        <Modal
          transparent={true}
          animationType="none"
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          {deleteModal ? (
            <View style={styles.modalContainer}>
              <View style={styles.deleteModalContent}>
                <TouchableOpacity
                  onPress={closeDeleteModal}
                  style={styles.closeButton}
                >
                  <MaterialIcons name="close" size={24} color="#ff7f00" />
                </TouchableOpacity>
                <MaterialIcons name="person" size={48} color="#ff7f00" />
                <Text style={styles.modalName}>
                  {selectedDoctor.name} {selectedDoctor.surname}
                </Text>
                <Text style={styles.modalSpeciality}>
                  {selectedDoctor.speciality}
                </Text>
                <Text style={styles.deleteWarningText}>
                  ¿Desea eliminar este médico?
                </Text>
                <TouchableOpacity
                  style={styles.deleteConfirmButton}
                  onPress={handleDeleteDoctor}
                >
                  <Text style={styles.deleteConfirmButtonText}>Eliminar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={closeDeleteModal}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  onPress={closeModal}
                  style={styles.closeButton}
                >
                  <MaterialIcons name="close" size={24} color="#ff7f00" />
                </TouchableOpacity>
                <MaterialIcons name="person" size={48} color="#ff7f00" />
                <Text style={styles.modalName}>
                  {selectedDoctor.name} {selectedDoctor.surname}
                </Text>
                <Text style={styles.modalSpeciality}>
                  {selectedDoctor.speciality}
                </Text>
                <Text style={styles.modalText}>
                  Dirección: {selectedDoctor.address}
                </Text>
                <Text style={styles.modalText}>
                  Días de atención: {selectedDoctor.attention_day.join(", ")}
                </Text>
                <Text style={styles.modalText}>
                  Horario: {selectedDoctor.schedule}
                </Text>
                <Text style={styles.modalText}>
                  Teléfono: {selectedDoctor.phone}
                </Text>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={handleEditDoctor}
                >
                  <Text style={styles.editButtonText}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => openDeleteModal(selectedDoctor)} // Llama al modal de eliminación
                >
                  <Text style={styles.deleteButtonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: "#f0f0f0",
  },
  list: {
    padding: 16,
  },
  loading: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  noDoctors: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 8, // Más sombra
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
  name: {
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "normal", // Sin negrita
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
    borderRadius: 10,
    alignItems: "center",
    elevation: 10,
  },
  closeButton: {
    alignSelf: "flex-end",
  },
  modalName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff7f00",
    marginVertical: 5,
  },
  modalSpeciality: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  modalText: {
    fontSize: 16,
    marginVertical: 2,
  },
  editButton: {
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    marginTop: 10,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  deleteButton: {
    borderColor: "#ff7f00",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: "80%",
    marginTop: 10,
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#ff7f00",
    fontSize: 18,
  },
  deleteModalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 10,
  },
  deleteIconOverlay: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#ff0000",
    borderRadius: 50,
    padding: 5,
  },
  deleteWarningText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginVertical: 20,
  },
  deleteConfirmButton: {
    backgroundColor: "#ff0000",
    padding: 12,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginVertical: 10,
  },
  deleteConfirmButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 12,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#333",
    fontSize: 18,
  },
});

export default DoctorsScreen;
