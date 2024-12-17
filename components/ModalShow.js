import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { DownloadLink } from ".";
import { ModalStyles } from "../styles";

const ModalShow = ({
  title,
  icon,
  onClose,
  subtitle = false,
  data,
  onEdit,
  onDelete,
  file = false,
}) => {
  return (
    <View style={ModalStyles.modalContainer}>
      <View style={ModalStyles.modalContent}>
        <TouchableOpacity onPress={onClose} style={ModalStyles.closeButton}>
          <MaterialIcons name="close" size={24} color="#ff7f00" />
        </TouchableOpacity>
        <MaterialIcons name={icon} size={80} color="#ff7f00" />
        <Text style={ModalStyles.modalTitle}>{title}</Text>
        <View>
          {subtitle && <Text style={ModalStyles.modalSubtitle}>{subtitle}</Text>}
          {Object.entries(data).map(([key, value]) => (
            <Text key={key} style={ModalStyles.modalText}>
              {key}: {value}
            </Text>
          ))}
          {file && <DownloadLink file={file} />}
        </View>

        <TouchableOpacity style={[ModalStyles.editButton, ModalStyles.button]} onPress={onEdit}>
          <Text style={ModalStyles.editButtonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[ModalStyles.deleteButton, ModalStyles.button]}
          onPress={() => onDelete()}
        >
          <Text style={ModalStyles.deleteButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



export default ModalShow;
