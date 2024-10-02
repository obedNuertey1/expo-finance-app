import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons'
import Loading from '@/components/Loading'
import { NewsItem } from '@/components/NewsList'

type Props = {}

const search = (props: Props) => {
    const router = useRouter();
    const {query, category, country} = useLocalSearchParams<{
        query: string;
        category: string;
        country: string;
    }>();

    const [news, setNews] = useState("");
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    useEffect(()=>{
        getNews();
    },[])

    const getNews = async (category: string = "") => {
        try{
          let categoryString = '';
          let countryString = '';
          let queryString = '';
          if(category){
            categoryString = `&category=${category}`
          }
          if(country){
            countryString = `&country=${country}`
          }
          if(query){
            queryString = `&q=${query}`
          }
          const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&image=1&removeduplicate=1&size=10${categoryString}${countryString}${queryString}`;
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
    <>
    <Stack.Screen 
        options={{
            headerLeft: ()=>(
                <TouchableOpacity onPress={()=>router.back()}>
                    <Ionicons name="arrow-back" size={22} />
                </TouchableOpacity>
            ),
            title: "Search"
        }}
    />
        <View style={styles.container}>
            {isLoading ? (
                <Loading size={'large'}  />
            ): (
                <FlatList 
                    data={news}
                    keyExtractor={(_, index)=> `list_items${index}`}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item, index}:any)=>(
                        <Link href={`/news/${item.article_id}`} asChild key={index} >
                            <TouchableOpacity>
                                <NewsItem item={item} />
                            </TouchableOpacity>
                        </Link>
                    )}
                />
            )}
        </View>
    </>
  )
}

export default search

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 20
    }
})