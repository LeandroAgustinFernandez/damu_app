import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import { UserContext } from "../../context/UserContext";
import { getAlarms, deleteAlarm } from "../../services";
import {
  Header,
  Alarm,
  ModalDelete,
  ModalShow,
  Filter,
} from "../../components";
import { ScreenStyles } from "../../styles";

const AlarmsScreen = ({ navigation }) => {
  const [alarms, setAlarms] = useState([]);
  const [filteredAlarms, setFilteredAlarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedAlarm, setSelectedAlarm] = useState(null);
  const [searchText, setSearchText] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) fetchAlarms();
  }, [user]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchAlarms();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchAlarms = async () => {
    try {
      setLoading(true);
      const userAlarms = await getAlarms(user.user_id);
      setAlarms(userAlarms);
      setFilteredAlarms(userAlarms);
    } catch (error) {
      console.error("Error fetching alarms:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text === "") {
      setFilteredAlarms(alarms);
    } else {
      const filtered = alarms.filter((alarm) =>
        alarm.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredAlarms(filtered);
    }
  };

  const openModal = (alarm) => {
    setSelectedAlarm(alarm);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedAlarm(null);
  };

  const openDeleteModal = () => setDeleteModal(true);
  const closeDeleteModal = () => setDeleteModal(false);

  const handleEditDoctor = () => {
    closeModal();
    navigation.navigate("AlarmsForm", { alarm: selectedAlarm })
  };

  const handleDeleteAlarm = async () => {
    try {
      await deleteAlarm(selectedAlarm.id);
      const updatedAlarms = alarms.filter((alarm) => alarm.id !== selectedAlarm.id);
      setAlarms(updatedAlarms);
      setFilteredAlarms(updatedAlarms);
      setDeleteModal(false);
      closeModal();
    } catch (error) {
      console.error("Error deleting alarm:", error);
    }
  };

  return (
    <SafeAreaView style={ScreenStyles.container}>
      <Header title="Alarmas" onClose={() => navigation.goBack()} />
      <Filter handleSearch={handleSearch} text={searchText} />
      {loading ? (
        <Text style={ScreenStyles.loading}>Cargando alarmas...</Text>
      ) : filteredAlarms.length === 0 ? (
        <Text style={ScreenStyles.noItems}>
          {searchText ? "No se encontraron alarmas." : "No hay alarmas registradas."}
        </Text>
      ) : (
        <FlatList
          data={filteredAlarms}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Alarm item={item} handlePress={openModal} />
          )}
          style={ScreenStyles.list}
        />
      )}
      <TouchableOpacity
        style={ScreenStyles.addButton}
        onPress={() => navigation.navigate("AlarmsForm")}
      >
        <Text style={ScreenStyles.addButtonText}>+</Text>
      </TouchableOpacity>

      {selectedAlarm && (
        <Modal
          transparent={true}
          animationType="none"
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          {deleteModal ? (
            <ModalDelete
              title={selectedAlarm.title}
              subtitle={selectedAlarm.time}
              icon="alarm"
              onClose={closeDeleteModal}
              label="¿Desea eliminar esta alarma?"
              onDelete={handleDeleteAlarm}
            />
          ) : (
            <ModalShow
              title={"Detalle de la alarma:"}
              icon="alarm"
              onClose={closeModal}
              data={{
                Medicación: `${selectedAlarm.medication} ${selectedAlarm.dose}`,
                Tipo: selectedAlarm.dose_type,
                Frecuencia: selectedAlarm.schedule.join(", "),
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

export default AlarmsScreen;