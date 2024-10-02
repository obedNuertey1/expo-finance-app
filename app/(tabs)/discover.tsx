import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useCallback, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import CheckBox from '@/components/CheckBox';
import { useNewsCategories } from '@/hooks/useNewsCategoriesHook';
import { useNewsCountries } from '@/hooks/useNewsCountries';
import { Link } from 'expo-router';
import {useFocusEffect} from '@react-navigation/native'

type Props = {};

const Page = (props: Props) => {
  const {top: safeTop} = useSafeAreaInsets();

  const {newsCategories, toggleNewsCategory} = useNewsCategories();
  const {countries, toggleCountry} = useNewsCountries()
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");

  useFocusEffect(useCallback(()=>{
    // setCategory("");
    // setSearchQuery("");
    // setCountry("");
    // toggleCountry("");
    // toggleNewsCategory(0);
  }, []))


  return (
    <View style={[styles.container, {paddingTop: safeTop + 20}]}>
      <SearchBar withHorizontalPadding={false} setSearchQuery={setSearchQuery} />
      <Text style={styles.title}>Categories</Text>
      <View style={styles.listContainer}>
        {newsCategories.map((item)=>{
          return <CheckBox onPress={()=>{
            toggleNewsCategory(item.id);
            setCategory(item.slug);
          }} key={item.id} label={item.title} checked={item.selected} />
        })
        }
      </View>

      <Text style={styles.title}>Country</Text>
      <View style={styles.listContainer}>
        {countries.map((item)=>{
          return <CheckBox onPress={()=>{
            toggleCountry(item.name);
            setCountry(item.code)
          }} key={item.name} label={item.name} checked={item.selected} />
        })
        }
      </View>
      <Link href={{
        // @ts-ignore
        pathname: "/news/search",
        params: {query: searchQuery, category, country}
      }} asChild>
        <TouchableOpacity style={styles.searchBtn}>
          <Text style={styles.searchBtnTxt}>Search</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 12,
    marginBottom: 20
  },
  searchBtn: {
    backgroundColor: Colors.tint,
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginVertical: 10
  },
  searchBtnTxt: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600'
  }
});