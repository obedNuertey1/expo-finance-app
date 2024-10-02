import { FlatList, StyleSheet, Text, useWindowDimensions, View, ViewToken } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { NewsDataType } from '@/types'
import SliderItem from '@/components/SliderItem'
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useDerivedValue, useSharedValue, scrollTo } from 'react-native-reanimated'
import Pagination from '@/components/Pagination'
import Categories from '@/components/Categories'

type Props = {
    newsList: Array<NewsDataType>
}

const BreakingNews = ({newsList}:Props) => {
  const [data, setData] = useState<Array<NewsDataType>>(newsList);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef<Animated.FlatList<any>>();
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const interval = useRef<NodeJS.Timeout>();
  const offset = useSharedValue(0);
  const {width} = useWindowDimensions();

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
    onMomentumEnd: (e)=>{
      offset.value = e.contentOffset.x;
    }
  });

  useEffect(()=>{
    if(isAutoPlay === true){
      interval.current = setInterval(()=>{
        offset.value = offset.value + width;
      }, 5000);
    }else{
      // @ts-ignore
      clearInterval(interval.current);
    }
    return ()=>{
      // @ts-ignore
      clearInterval(interval.current);
    }
  }, [isAutoPlay, offset, width]);

  useDerivedValue(()=>{
    scrollTo(ref, offset.value, 0, true);
  })

  const onViewableItemsChanged = ({
    viewableItems,
  }: {viewableItems: ViewToken[]})=>{
    if(
      viewableItems[0].index !== undefined &&
      viewableItems[0].index !== null
    ){
      setPaginationIndex(viewableItems[0].index % newsList.length);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  }

  const viewabilityConfigCallbackPairs = useRef([
    {viewabilityConfig, onViewableItemsChanged}
  ])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BreakingNews</Text>
      <View style={styles.slideWrapper}>
        <Animated.FlatList 
          ref={ref}
          data={data}
          keyExtractor={(_, index) => `list_items${index.toString()}`}
          renderItem={({item, index})=>(
            <SliderItem slideItem={item} index={index} scrollX={scrollX}/>
          )}
          horizontal
          onScroll={onScrollHandler}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={16}
          onEndReachedThreshold={0.5}
          onEndReached={()=>setData([...data, ...newsList])}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          onScrollBeginDrag={()=>{
            setIsAutoPlay(false);
          }}
          onScrollEndDrag={()=>{
            setIsAutoPlay(true);
          }}
        />
        <Pagination slideItems={newsList} scrollX={scrollX} paginationIndex={paginationIndex} />
      </View>
    </View>
  )
}

export default BreakingNews

const styles = StyleSheet.create({
    container: {
        marginBottom: 10
    },
    title:{
        fontSize: 16,
        fontWeight: "600",
        color: Colors.black,
        marginBottom: 8,
        marginLeft: 20
    },
    slideWrapper: {
        // width: '100%',
        // flex: 1,
        justifyContent: 'center'
    }
})