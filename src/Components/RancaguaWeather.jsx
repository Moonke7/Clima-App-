import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import HeaderWeather from "./HeaderWeather";
import Svg, { Path } from "react-native-svg";
import DayInfo from "./DayInfo";
import Forecast from "./Forecast";

const RancaguaWeather = ({ daylist, city , msg}) => {
  const ActualDay = daylist[0].dt_txt.substring(0, 10); // Obtén la fecha
  const FirstDay = new Date(ActualDay);

  //funcion para obtener el dia siguiente
  const getNextDay = (dateStr) => {
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day); // Crear objeto Date

    date.setDate(date.getDate() + 1); // Avanzar un día

    const newYear = date.getFullYear();
    const newMonth = String(date.getMonth() + 1).padStart(2, "0");
    const newDay = String(date.getDate()).padStart(2, "0");
    return `${newYear}-${newMonth}-${newDay}`; // Retornar en formato "YYYY-MM-DD"
  };

  // Obtener los días siguientes
  const Day2 = getNextDay(ActualDay);
  const Day3 = getNextDay(Day2);
  const Day4 = getNextDay(Day3);
  const Day5 = getNextDay(Day4);
  //que tendra: velocidad viento, humidity, max y min, probabilidad de lluvia (.pop)
  return (
    <View style={styles.container}>
      <ScrollView>
        <HeaderWeather city={city} data={daylist} ActualDay={ActualDay} />
        <DayInfo data={daylist} ActualDay={ActualDay} msg=""/>
        <Forecast data={daylist} ActualDay={Day2} />
        <Forecast data={daylist} ActualDay={Day3} />
        <Forecast data={daylist} ActualDay={Day4} />
        <Forecast data={daylist} ActualDay={Day5} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
  },
  cityName: {
    color: "#999",
    fontSize: 10,
    flex: 1,
  },
});

export default RancaguaWeather;
