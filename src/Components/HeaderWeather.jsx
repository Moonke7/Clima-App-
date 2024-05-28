import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { icons } from "../Icons/IconsJson";

const HeaderWeather = ({ city, data, ActualDay}) => {
  const [icon, setIcon] = useState(0);

  const ActualDate = data[0].dt_txt;
  const date = new Date(ActualDate);

  date.setHours(date.getHours() - 4);
  const ActualTime = date.toTimeString().substring(0, 8); // Obtén la hora

  const getDayOfWeek = (dateStr) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day); // Crear objeto Date

    const daysOfWeek = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miercoles",
      "Jueves",
      "Viernes",
      "Sabado",
    ];
    return daysOfWeek[date.getDay()]; // Obtener el día de la semana
  };

  const Today = getDayOfWeek(ActualDay);
  //renderizara el icon que corresponda segun el clima que haya
  useEffect(() => {
    const toggleIcon = () => {
      data[0].weather[0].main == "Rain" ? setIcon(1) : "";
      data[0].weather[0].main == "Clear" ? setIcon(2) : "";
      data[0].weather[0].main == "Clouds" ? setIcon(3) : "";
    };
    toggleIcon();
  }, []);

  return (
    <View style={styles.box}>
      <View style={styles.container}>
        <Text style={styles.cityName}>{city}</Text>
        <Image style={styles.image} source={{ uri: icons[icon].src }} />
        <Text style={styles.temp}>{data[0].main.temp}°</Text>
      </View>
      <View style={styles.day__container}>
        <Text style={styles.day}>{Today}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    borderColor: "#000", // Color del borde
    borderRadius: 10,
    padding: 10,
    alignSelf: "center",
    width: "98%",
  },
  container: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    gap: 5,
  },
  cityName: {
    color: "#194db4",
    fontSize: 40,
    paddingLeft: 20,
    alignSelf: "center",
    fontWeight: 'bold'
  },
  image: {
    width: 40,
    height: 40,
    alignSelf: "center",
    marginLeft: 35,
  },
  day__container: {
    flexDirection: "row",
    gap: 10,
    paddingLeft: 3,
  },
  day: {
    fontSize: 35,
    alignSelf: "center",
    fontWeight: 'bold',
    marginLeft: 30  ,
    color: '#194db4'

  },
  normalLetter: {
    alignSelf: "center",
    fontSize: 15,
  },
  temp_container: {
    justifyContent: "space-around",
  },
  temp: {
    paddingLeft: 0,
    fontSize: 30,
    alignSelf: "center",
    color: '#555'
  },
});

export default HeaderWeather;
