import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { UserContext } from "../../context/UserContext";
import { getDoctors, deleteDoctor } from "../../services";
import {
  Header,
  Doctor,
  ModalDelete,
  ModalShow,
  Filter,
} from "../../components";
import { ScreenStyles } from "../../styles";

const DoctorsScreen = ({ navigation }) => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchText, setSearchText] = useState("");
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
      setFilteredDoctors(userDoctors); // Inicialmente todos los médicos
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text === "") {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter((doctor) =>
        `${doctor.name.toLowerCase()} ${doctor.surname.toLowerCase()}`.includes(
          text.toLowerCase()
        )
      );
      setFilteredDoctors(filtered);
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
      const updatedDoctors = doctors.filter(
        (doctor) => doctor.id !== selectedDoctor.id
      );
      setDoctors(updatedDoctors);
      setFilteredDoctors(updatedDoctors);
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
    <SafeAreaView style={ScreenStyles.container}>
      <Header title="Médicos" onClose={() => navigation.goBack()} />
      <Filter handleSearch={handleSearch} text={searchText} />
      {loading ? (
        <Text style={ScreenStyles.loading}>Cargando médicos...</Text>
      ) : filteredDoctors.length === 0 ? (
        <Text style={ScreenStyles.noItems}>
          {searchText ? "No se encontraron médicos." : "No hay médicos registrados."}
        </Text>
      ) : (
        <FlatList
          data={filteredDoctors}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Doctor item={item} handlePress={openModal} />
          )}
          style={ScreenStyles.list}
        />
      )}
      <TouchableOpacity
        style={ScreenStyles.addButton}
        onPress={() => navigation.navigate("DoctorsForm")}
      >
        <Text style={ScreenStyles.addButtonText}>+</Text>
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

export default DoctorsScreen;
