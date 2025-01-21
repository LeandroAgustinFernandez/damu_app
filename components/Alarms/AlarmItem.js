import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { ItemStyles } from "../../styles";

const Alarm = ({ item, handlePress }) => (
  <TouchableOpacity style={ItemStyles.card} onPress={() => handlePress(item)}>
    <View style={ItemStyles.cardContent}>
      <MaterialIcons name="alarm" size={32} color="#ff7f00" />
      <View style={{ marginLeft: 10 }}>
        <Text style={ItemStyles.name}>{item.medication} {item.dose}</Text>
        <Text style={ItemStyles.details}>Tipo: {item.dose_type}</Text>
        {item.schedule.map((time, index) => (
          <Text key={index} style={ItemStyles.details}>Frecuencia: {time}</Text>
        ))}
      </View>
    </View>
  </TouchableOpacity>
);

export default Alarm;