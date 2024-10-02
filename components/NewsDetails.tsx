import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';

type Props = {}

const NewsDetails = (props: Props) => {
    const {id} = useLocalSearchParams<{id: string}>();
    const [news, setNews] = React.useState<Array<any>>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(()=>{
        getNews(id)
    },[])

    const getNews = async (id: string) => {
        try{
          const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&id=${id}`;
          const response = await axios.get(URL);
    
          if(response && response.data){
            setNews(response.data.results);
            setIsLoading(false);
          }
        }catch(e:any){
          console.log("Error Message: ", e.message);
        }
      }
  return (
    <View>
      <Text>NewsDetails</Text>
    </View>
  )
}

export default NewsDetails

const styles = StyleSheet.create({})