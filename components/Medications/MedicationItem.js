import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { ItemStyles } from "../../styles";

const Medication = ({ item, handlePress }) => (
    <TouchableOpacity style={ItemStyles.card} onPress={() => handlePress(item)}>
      <View style={ItemStyles.cardContent}>
        <MaterialIcons name="medication" size={32} color="#ff7f00" />
        <View style={ItemStyles.medicationDetails}>
          <Text style={ItemStyles.name}>
            {item.name} {item.dose}
          </Text>
          <Text style={ItemStyles.info}>Tipo: {item.dose_type}</Text>
          <Text style={ItemStyles.info}>
            Frecuencia: {item.frequency.join(", ")}
          </Text>
          <Text style={ItemStyles.info}>Horario: {item.schedule}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  export default Medication;