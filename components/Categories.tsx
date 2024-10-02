import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Colors } from '@/constants/Colors'
import newsCategoryList from '@/constants/Categories'

type Props = {
    onCatChanged: (category: string)=>void;
}

const Categories = ({onCatChanged}: Props) => {
    const scrollRef = useRef<ScrollView>(null);
    const itemRef = useRef<TouchableOpacity[] | null>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelectCategory = (index: number)=> {
          // Ensure the selected item exists
        //   @ts-ignore
        const selected = itemRef?.current[index];

        if (selected) {
            setActiveIndex(index);

            // Measure the item's dimensions and position
            // @ts-ignore
            selected.measureLayout(scrollRef.current,
                (x, y, width, height) => {
                scrollRef.current?.scrollTo({
                    x: x - 20, // Scroll to center the item
                    y: 0,
                    animated: true,
                });
                },
                (error:any) => {
                console.log('Error measuring layout:', error);
                });
            onCatChanged(newsCategoryList[index].slug)
        }
    }

    
  return (
    <View>
      <Text style={styles.title}>Trending Right Now</Text>
      <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.itemsWrapper}>
        {newsCategoryList.map((item, index)=>(
            <TouchableOpacity
                onPress={()=>handleSelectCategory(index)}
            ref={(el)=>{
                // @ts-ignore
                itemRef.current[index] = el
            }}
            key={index} style={[styles.item, activeIndex === index && styles.itemActive]} >
                <Text style={[styles.itemText, activeIndex === index && styles.itemTextActive]}>{item.title}</Text>
            </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
    )
}

export default Categories

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.black,
        marginBottom: 10,
        marginLeft: 20
    },
    itemsWrapper: {
        gap: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10
    },
    item: {
        borderWidth: 1,
        borderColor: Colors.lightGrey,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10
    },
    itemText: {
        fontSize: 14,
        color: Colors.darkGrey,
        letterSpacing: 0.5
    },
    itemActive: {
        backgroundColor: Colors.tint,
        borderColor: Colors.tint
    },
    itemTextActive: {
        color: Colors.white,
        fontWeight: '600'
    }
})