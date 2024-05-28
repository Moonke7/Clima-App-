import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import HeaderWeather from "../../Components/HeaderWeather";
import DayInfo from "../../Components/DayInfo";
import Forecast from "../../Components/Forecast";

const Gif = ({ src }) => {
  return <Image style={styles.gif} source={{ uri: src }} />;
};

const LasCondes = ({ daylist, city }) => {
  const ActualDay = daylist[0].dt_txt.substring(0, 10); // Obtén la fecha
  const [gif, setGif] = useState("https://i.gifer.com/Pak.gif");

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

  //actualizar gif
  useEffect(() => {
    const gifSet = () => {
      if (daylist[0].weather[0].main == "Rain") {
        setGif(
          "https://media.tenor.com/p1cc9aaAj7oAAAAi/cinnamoroll-i%27m-cold.gif"
        );
      } else if (daylist[0].weather[0].main == "Clouds") {
        setGif(
          "https://i.pinimg.com/originals/f7/04/d0/f704d03d7b6b798099c4163d4239feec.gif"
        );
      }
    };

    gifSet();
  }, []);
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
        <DayInfo data={daylist} ActualDay={ActualDay} msg={true} />
        <Forecast data={daylist} ActualDay={Day2} />
        <Forecast data={daylist} ActualDay={Day3} />
        <Forecast data={daylist} ActualDay={Day4} />
        <Forecast data={daylist} ActualDay={Day5} />
        <Gif src={gif} />
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
  gif: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
});

export default LasCondes;
