
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert} from "react-native";
import { Participant } from "../../components/Participant";
import { styles } from './styles'
import React, { useState } from "react";


export function Home(){
   
   const [participants, setParticipants] = useState<string[]>([]);
   
   const [participantName, setParticipantName] = useState('');
   function handleParticipantAdd(){
      
      setParticipants(prevState => [...prevState, participantName]);
      setParticipantName('');
   }
   function handleParticipantRemove(name:String){
     
     Alert.alert("Remover", `Deseja Remove o participante ${name}?`, [
      {
         text : 'Sim',
         onPress : () =>
         setParticipants(prevState => prevState.filter(participant => participant !== name))
      },
      {
         text : 'Nao',
         style : 'cancel'
      }
     ]);
   }
   return(

     <View style={styles.container}>
        <Text style={styles.eventName}>
          Nome do Evento
        </Text>
        <Text style={styles.eventDate}>
         Quarta, 07 de Dezembro de 2022.
        </Text>  

        <View style={styles.form}>
         <TextInput 
            style={styles.input}
            placeholder="Nome do participante"
            placeholderTextColor="#6B6B6B"
            onChangeText={setParticipantName}
         />
         <TouchableOpacity 
            style={styles.button} 
            onPress={handleParticipantAdd}
         >
            <Text style={styles.buttonText}>
                     +
            </Text>
         </TouchableOpacity>
        </View>
        
        <FlatList 
         data={participants}
         keyExtractor={item => item}
         renderItem={({item}) => (
            <Participant 
            key={ item }
            name={ item }
            onRemove={ () => handleParticipantRemove(item)}
           />
         )}
         showsVerticalScrollIndicator={false}
         ListEmptyComponent={() => (
            <Text style={styles.listEmptyText}>
                 Ninguem chegou no evento ainda? Adicione participantes a sua lista de presença
            </Text>
         )}
        />

     </View>
   )
}