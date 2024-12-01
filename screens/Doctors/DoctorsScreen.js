import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView, Text, FlatList, TouchableOpacity, StyleSheet, Modal} from "react-native";
import { UserContext } from "../../context/UserContext";
import { getDoctors, deleteDoctor } from "../../services/api";
import { Header, Doctor, ModalDelete, ModalShow } from "../../components";

const DoctorsScreen = ({ navigation }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) fetchDoctors();
  }, [user]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchDoctors();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const userDoctors = await getDoctors(user.user_id);
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

  const openDeleteModal = () => setdeleteModal(true);
  const closeDeleteModal = () => setdeleteModal(false);

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
          renderItem={({ item }) => (
            <Doctor item={item} handlePress={openModal} />
          )}
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
            <ModalDelete
              title={`${selectedDoctor.name} ${selectedDoctor.surname}`}
              subtitle={selectedDoctor.speciality}
              icon="person"
              onClose={closeDeleteModal}
              label="¿Desea eliminar este médico?"
              onDelete={handleDeleteDoctor}
            />
          ) : (
            <ModalShow
              title={`${selectedDoctor.name} ${selectedDoctor.surname}`}
              icon="person"
              onClose={closeModal}
              subtitle={selectedDoctor.speciality}
              data={{
                Dirección: selectedDoctor.address,
                "Días de atención": selectedDoctor.attention_day.join(", "),
                Horario: selectedDoctor.schedule,
                Teléfono: selectedDoctor.phone,
              }}
              onEdit={handleEditDoctor}
              onDelete={openDeleteModal}
            />
          )}
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default DoctorsScreen;
