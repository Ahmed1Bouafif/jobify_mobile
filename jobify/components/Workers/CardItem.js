import React, { useEffect } from "react";
import server from "../ipConfig/serverIp";
import {
  Text,
  ScrollView,
  View,
  Image,
  StyleSheet,
  Button,
  AsyncStorage,
  TouchableOpacity,
  Touchable
} from "react-native";
import moment from "moment";
import axios from "axios";
import colors from "../../assets/colors/colors";

const CardItem = (props) => {
  useEffect(() => {
    console.log(props);
  });

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card_template}>
        <View style={styles.imgandtitleComp}>
          <Image
            style={styles.campany_image}
            source={{ uri: props.event.imageUrl }}
          />

          <Text style={styles.card_title}>
            {props.event.label} {"\n"}
          </Text>
        </View>
        <Text style={styles.card_title}>
          {props.event.eventName} {"\n"}
        </Text>
        <Text style={styles.location}>
            location {props.event.location}
            {"\n"}{" "}
          </Text>
        <Image
          style={styles.card_image}
          source={{ uri: props.event.imageUri }}
        />
        <View>
          <Text style={styles.price}>
            payment {props.event.dailyPay} Dt /day {"\n"}
          </Text>
        
          <Text style={styles.time}>
            Posted at : {moment(props.event.createdAt).fromNow()}
            {"\n"}
          </Text>
        <TouchableOpacity 
        style={styles.submitButton}
        activeOpacity={0.5}
        onPress={() => props.sub(props.event.eventID)}
        >

          <Text style={{textAlign:'center',lineHeight: 45,color:colors.white}}>Subscribe</Text>
        </TouchableOpacity>
          {/* <Button
            title="Subscribe"
            style={styles.submitButton}
            // disabled={isLoading}
            onPress={() => props.sub(props.event.eventID)}
          /> */}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  card_template: {
    flex: 1,
    marginBottom: 44,
    marginTop: "10%",
  },
  imgandtitleComp: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    width: 142,
    left: 24,
    bottom: 15,
  },
  card_image: {
    // position: 'absolute',
    width: 327,
    height: 203,
    left: 24,
    borderRadius: 20,
  },
  card_title: {
    fontWeight: "bold",
    width: 112,
    height: 24,
    left: 24,
  },
  price: {
    fontWeight: "bold",
    width: 200,
    height: 24,
    left: 24,
  },
  time: {
    fontWeight: "bold",
    width: 200,
    height: 24,
    left: 24,
  },

  button: {
    height: "20%",
    width: "100%",
  },
  submitButton: {
    
    width: 100,
    height: 50,
    left: 260,
    bottom:5,
    backgroundColor:colors.gold,
    borderRadius:50,
    
  },
  campany_image: {
    width: 40,
    height: 40,
    left: 0,
    top: 2,
    borderRadius: 15,
  },
  campany: {
    fontSize: 10,
    fontWeight: "bold",
  },
  cardContainer: {
    backgroundColor: '#E5E5E5',
    marginBottom: "5%",
    borderRadius: 20,

    width: 370,
    height: 430,
    left: 24,
    top: 18,
  },
  location: {
    fontWeight: "bold",
    width: 112,
    height: 24,
    left: 24,
  },
});
export default CardItem;
